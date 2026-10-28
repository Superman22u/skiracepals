import { nameKey } from "./names";

/** Alpine World Cup points for places 1–10. */
const cupPoints = [0, 100, 80, 60, 50, 45, 40, 36, 32, 29, 26];

export type RankNote = "this season" | "last season";

export type FieldSkier = { id: number; name: string; nation: string; gender: "W" | "M" };

export type RankedSkier = FieldSkier & {
  rank: number | null;
  rankNote: RankNote | null;
};

type Scored = FieldSkier & { seasonPoints: number; lastYearPoints: number };

export function rankField(input: {
  skiers: FieldSkier[];
  lastYear: { name: string; nation: string; position: number }[];
  season: { skierId: number; position: number }[];
}): RankedSkier[] {
  const byKey = new Map<string, FieldSkier[]>();
  const byId = new Map<number, Scored>();
  for (const skier of input.skiers) {
    const list = byKey.get(nameKey(skier.name)) ?? [];
    list.push(skier);
    byKey.set(nameKey(skier.name), list);
    byId.set(skier.id, { ...skier, seasonPoints: 0, lastYearPoints: 0 });
  }

  const resolve = (name: string, nation: string) => {
    const list = byKey.get(nameKey(name)) ?? [];
    return list.find((skier) => skier.nation === nation) ?? list[0];
  };

  for (const finish of input.lastYear) {
    const skier = resolve(finish.name, finish.nation);
    const points = cupPoints[finish.position] ?? 0;
    const score = skier ? byId.get(skier.id) : undefined;
    if (score && points > 0) score.lastYearPoints += points;
  }

  for (const result of input.season) {
    const score = byId.get(result.skierId);
    const points = cupPoints[result.position] ?? 0;
    if (score && points > 0) score.seasonPoints += points;
  }

  const ordered = [...byId.values()].sort(
    (a, b) => b.seasonPoints - a.seasonPoints || b.lastYearPoints - a.lastYearPoints || a.name.localeCompare(b.name),
  );

  const seasonRank = competitionRank(ordered.filter((skier) => skier.seasonPoints > 0), (skier) => skier.seasonPoints);
  const lastYearRank = competitionRank(
    ordered.filter((skier) => skier.seasonPoints === 0 && skier.lastYearPoints > 0),
    (skier) => skier.lastYearPoints,
  );

  return ordered.map((skier) => {
    if (skier.seasonPoints > 0) {
      return { ...publicSkier(skier), rank: seasonRank.get(skier.id) ?? null, rankNote: "this season" };
    }
    if (skier.lastYearPoints > 0) {
      return { ...publicSkier(skier), rank: lastYearRank.get(skier.id) ?? null, rankNote: "last season" };
    }
    return { ...publicSkier(skier), rank: null, rankNote: null };
  });
}

/** One ranking only: this season's top names when any exist, otherwise last season's. */
export function standingsList(
  ranked: RankedSkier[],
  limit = 10,
): { source: RankNote; rows: { rank: number; name: string; nation: string }[] } | null {
  const bySource = (note: RankNote) =>
    ranked
      .filter((skier): skier is RankedSkier & { rank: number } => skier.rankNote === note && skier.rank != null)
      .sort((a, b) => a.rank - b.rank || a.name.localeCompare(b.name));
  const season = bySource("this season");
  const chosen = season.length > 0 ? season : bySource("last season");
  if (chosen.length === 0) return null;
  return {
    source: season.length > 0 ? "this season" : "last season",
    rows: chosen.slice(0, limit).map((skier) => ({ rank: skier.rank, name: skier.name, nation: skier.nation })),
  };
}

function publicSkier(skier: Scored): FieldSkier {
  return { id: skier.id, name: skier.name, nation: skier.nation, gender: skier.gender };
}

function competitionRank<T extends { id: number }>(rows: T[], pointsOf: (row: T) => number): Map<number, number> {
  const ranks = new Map<number, number>();
  let rank = 0;
  rows.forEach((row, index) => {
    const previous = rows[index - 1];
    if (!previous || pointsOf(previous) !== pointsOf(row)) rank = index + 1;
    ranks.set(row.id, rank);
  });
  return ranks;
}
