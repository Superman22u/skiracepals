import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { addCalendarDays, isAfterCloseFill, isDayBeforeFill, zurichToday } from "./dates";
import { query, withTx } from "./db";

export type Finish = { skierId: number; position: number };

/** Places 1 to 5 from one race, in that order. */
export function topFiveResults(finishes: Finish[]): number[] | null {
  const byPlace = new Map<number, number>();
  for (const finish of finishes) {
    if (finish.position >= 1 && finish.position <= 5 && !byPlace.has(finish.position)) {
      byPlace.set(finish.position, finish.skierId);
    }
  }
  const ids = [1, 2, 3, 4, 5].map((position) => byPlace.get(position));
  if (ids.some((id) => id == null)) return null;
  if (new Set(ids).size !== 5) return null;
  return ids as number[];
}

/** Walk the previous race from 1st and keep skiers who start this race, until there are five. */
export function topFiveOnStartList(finishes: Finish[], starterIds: number[]): number[] | null {
  const starters = new Set(starterIds);
  const ordered = [...finishes].sort((a, b) => a.position - b.position);
  const ids: number[] = [];
  for (const finish of ordered) {
    if (!starters.has(finish.skierId) || ids.includes(finish.skierId)) continue;
    ids.push(finish.skierId);
    if (ids.length === 5) return ids;
  }
  return null;
}

type RaceRow = RowDataPacket & {
  id: number;
  discipline: string;
  gender: "W" | "M";
  raceDate: string;
};

/** Fill missing bets that are due. A bet the player saved is left as it is. */
export async function fillDueBets(now = new Date()): Promise<void> {
  const today = zurichToday(now);
  const races = await query<RaceRow>(
    `SELECT id, discipline, gender, race_date AS raceDate
     FROM races
     WHERE race_date >= ? AND race_date <= ?`,
    [today, addCalendarDays(today, 1)],
  );
  for (const race of races) {
    const raceDate = String(race.raceDate).slice(0, 10);
    const dayBefore = isDayBeforeFill(raceDate, now);
    const afterClose = isAfterCloseFill(raceDate, now);
    if (!dayBefore && !afterClose) continue;
    const finishes = await previousFinishes(race.id, race.discipline, race.gender, raceDate);
    if (finishes.length === 0) continue;
    const starters = await query<RowDataPacket & { skierId: number }>(
      "SELECT skier_id AS skierId FROM race_starters WHERE race_id = ?",
      [race.id],
    );
    const starterIds = starters.map((row) => Number(row.skierId));
    const missing = await query<RowDataPacket & { id: number; prefillAfterClose: number }>(
      `SELECT u.id, u.prefill_after_close AS prefillAfterClose
       FROM users u
       WHERE NOT EXISTS (SELECT 1 FROM bets b WHERE b.user_id = u.id AND b.race_id = ?)`,
      [race.id],
    );
    for (const user of missing) {
      const dayPicks = dayBefore ? topFiveResults(finishes) : null;
      const closePicks =
        afterClose && Number(user.prefillAfterClose) === 1 && starterIds.length > 0
          ? topFiveOnStartList(finishes, starterIds)
          : null;
      const picks = dayPicks ?? closePicks;
      const filled = dayPicks ? "day-before" : closePicks ? "after-close" : null;
      if (!picks || !filled) continue;
      await saveFilledBet(Number(user.id), Number(race.id), picks, filled);
    }
  }
}

async function previousFinishes(
  raceId: number,
  discipline: string,
  gender: string,
  raceDate: string,
): Promise<Finish[]> {
  const previous = await query<RowDataPacket & { id: number }>(
    `SELECT id FROM races
     WHERE gender = ? AND discipline = ? AND race_date < ? AND id <> ?
       AND EXISTS (SELECT 1 FROM race_results rr WHERE rr.race_id = races.id AND rr.position BETWEEN 1 AND 5)
     ORDER BY race_date DESC, id DESC
     LIMIT 1`,
    [gender, discipline, raceDate, raceId],
  );
  const previousId = previous[0]?.id;
  if (previousId == null) return [];
  const rows = await query<RowDataPacket & { skierId: number; position: number }>(
    `SELECT skier_id AS skierId, position FROM race_results
     WHERE race_id = ?
     ORDER BY position`,
    [previousId],
  );
  return rows.map((row) => ({ skierId: Number(row.skierId), position: Number(row.position) }));
}

async function saveFilledBet(
  userId: number,
  raceId: number,
  skierIds: number[],
  filled: "day-before" | "after-close",
): Promise<void> {
  await withTx(async (conn) => {
    const [header] = await conn.query<ResultSetHeader>(
      "INSERT IGNORE INTO bets (user_id, race_id, filled) VALUES (?, ?, ?)",
      [userId, raceId, filled],
    );
    if (header.affectedRows === 0) return;
    const [betRows] = await conn.query<RowDataPacket[]>("SELECT id FROM bets WHERE user_id = ? AND race_id = ?", [
      userId,
      raceId,
    ]);
    const betId = Number(betRows[0]?.id);
    if (!betId) return;
    await conn.query(
      `INSERT INTO bet_picks (bet_id, skier_id, position) VALUES ${skierIds.map(() => "(?, ?, ?)").join(",")}`,
      skierIds.flatMap((skierId, index) => [betId, skierId, index + 1]),
    );
  });
}
