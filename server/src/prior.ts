import type { RowDataPacket } from "mysql2";
import { query } from "./db";
import { placeKey } from "./names";
import { suggestTopFive, type SuggestionPick } from "./suggest";

export type LastYearLink = {
  raceDate: string;
  url: string;
  winner: string | null;
};

type PriorIndexRow = RowDataPacket & {
  placeKey: string;
  discipline: string;
  gender: "W" | "M";
  resultUrl: string;
  raceDate: string;
  winner: string | null;
};

export async function lastYearIndex(): Promise<Map<string, LastYearLink>> {
  const rows = await query<PriorIndexRow>(
    `SELECT p.place_key AS placeKey, p.discipline, p.gender, p.result_url AS resultUrl,
            p.race_date AS raceDate, f.skier_name AS winner
     FROM prior_races p
     LEFT JOIN prior_finishes f ON f.prior_race_id = p.id AND f.position = 1
     ORDER BY p.race_date`,
  );
  const map = new Map<string, LastYearLink>();
  for (const row of rows) {
    const key = matchKey(row.placeKey, row.discipline, row.gender);
    const existing = map.get(key);
    if (existing && !row.winner && existing.winner) continue;
    map.set(key, {
      raceDate: String(row.raceDate).slice(0, 10),
      url: row.resultUrl,
      winner: row.winner ?? existing?.winner ?? null,
    });
  }
  return map;
}

export function matchKey(key: string, discipline: string, gender: string): string {
  return `${key}|${discipline}|${gender}`;
}

type DetailRow = RowDataPacket & {
  id: number;
  resultUrl: string;
  raceDate: string;
  position: number | null;
  skierName: string | null;
  nation: string | null;
};

export async function lastYearDetail(place: string, discipline: string, gender: string): Promise<{
  links: LastYearLink[];
  finishes: { name: string; nation: string; position: number }[];
}> {
  const rows = await query<DetailRow>(
    `SELECT p.id, p.result_url AS resultUrl, p.race_date AS raceDate,
            f.position, f.skier_name AS skierName, f.nation
     FROM prior_races p
     LEFT JOIN prior_finishes f ON f.prior_race_id = p.id
     WHERE p.place_key = ? AND p.discipline = ? AND p.gender = ?
     ORDER BY p.race_date, f.position`,
    [placeKey(place), discipline, gender],
  );
  const links: LastYearLink[] = [];
  const finishes: { name: string; nation: string; position: number }[] = [];
  const seen = new Set<number>();
  for (const row of rows) {
    if (!seen.has(row.id)) {
      seen.add(row.id);
      const winner = rows.find((item) => item.id === row.id && item.position === 1)?.skierName ?? null;
      links.push({
        raceDate: String(row.raceDate).slice(0, 10),
        url: row.resultUrl,
        winner,
      });
    }
    if (row.position != null && row.skierName && row.nation && row.position <= 10) {
      finishes.push({ name: row.skierName, nation: row.nation, position: Number(row.position) });
    }
  }
  return { links, finishes };
}

export async function suggestionFor(
  raceId: number,
  discipline: string,
  gender: string,
  finishes: { name: string; nation: string; position: number }[],
): Promise<SuggestionPick[]> {
  const skiers = await query<RowDataPacket & { id: number; name: string; nation: string }>(
    `SELECT id, name, nation FROM skiers WHERE gender = ? AND active = 1
     AND (
       NOT EXISTS (SELECT 1 FROM race_starters WHERE race_id = ?)
       OR id IN (SELECT skier_id FROM race_starters WHERE race_id = ?)
     )`,
    [gender, raceId, raceId],
  );
  const season = await query<RowDataPacket & { skierId: number; discipline: string; position: number }>(
    `SELECT rr.skier_id AS skierId, r.discipline, rr.position
     FROM race_results rr
     JOIN races r ON r.id = rr.race_id
     WHERE r.gender = ? AND r.id <> ? AND rr.position BETWEEN 1 AND 5`,
    [gender, raceId],
  );
  return suggestTopFive({
    discipline,
    skiers: skiers.map((skier) => ({ id: Number(skier.id), name: skier.name, nation: skier.nation })),
    venue: finishes,
    season: season.map((result) => ({
      skierId: Number(result.skierId),
      discipline: result.discipline,
      position: Number(result.position),
    })),
  });
}
