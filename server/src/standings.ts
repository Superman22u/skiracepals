import type { RowDataPacket } from "mysql2";
import { isBettingOpen } from "./dates";
import { query } from "./db";
import { rankField, standingsList } from "./discipline-rank";

/** Top 10 of this discipline. The FIS link is ready once a race in it has closed. The names use a saved result. */
export async function loadDisciplineStandings(gender: "W" | "M", discipline: string, now = new Date()) {
  const held = await query<RowDataPacket & { raceDate: string }>(
    "SELECT race_date AS raceDate FROM races WHERE gender = ? AND discipline = ?",
    [gender, discipline],
  );
  const thisSeasonStarted = held.some((race) => !isBettingOpen(String(race.raceDate).slice(0, 10), now));
  const skiers = await query<RowDataPacket & { id: number; name: string; nation: string; gender: "W" | "M" }>(
    "SELECT id, name, nation, gender FROM skiers WHERE active = 1 AND gender = ?",
    [gender],
  );
  const lastYear = await query<RowDataPacket & { name: string; nation: string; position: number }>(
    `SELECT f.skier_name AS name, f.nation, f.position
     FROM prior_finishes f
     JOIN prior_races p ON p.id = f.prior_race_id
     WHERE p.gender = ? AND p.discipline = ? AND f.position BETWEEN 1 AND 10`,
    [gender, discipline],
  );
  const season = await query<RowDataPacket & { skierId: number; position: number; raceDate: string }>(
    `SELECT rr.skier_id AS skierId, rr.position, r.race_date AS raceDate
     FROM race_results rr
     JOIN races r ON r.id = rr.race_id
     WHERE r.gender = ? AND r.discipline = ? AND rr.position BETWEEN 1 AND 5`,
    [gender, discipline],
  );
  return {
    thisSeasonStarted,
    standings: standingsList(
      rankField({
        skiers: skiers.map((skier) => ({
          id: Number(skier.id),
          name: skier.name,
          nation: skier.nation,
          gender: skier.gender,
        })),
        lastYear: lastYear.map((finish) => ({
          name: finish.name,
          nation: finish.nation,
          position: Number(finish.position),
        })),
        season: season
          .filter((result) => !isBettingOpen(String(result.raceDate).slice(0, 10), now))
          .map((result) => ({ skierId: Number(result.skierId), position: Number(result.position) })),
      }),
    ),
  };
}
