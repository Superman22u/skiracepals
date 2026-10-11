import type { RowDataPacket } from "mysql2";
import { query } from "./db";
import { raceScoresFor, rankUsers, totalPoints, type PickScoreRow, type RaceScore, type RankedUser } from "./scoring";

type ScoreRow = RowDataPacket & {
  userId: number;
  nickname: string;
  raceId: number;
  place: string;
  discipline: "W" | "M" | "DH" | "SG" | "GS" | "SL" | "AC";
  gender: "W" | "M";
  raceDate: string;
  predicted: number;
  actual: number | null;
  hasResults: number | boolean;
};

export async function loadPickRows(): Promise<PickScoreRow[]> {
  const rows = await query<ScoreRow>(
    `SELECT u.id AS userId, u.nickname, r.id AS raceId, r.place, r.discipline, r.gender,
            r.race_date AS raceDate, bp.position AS predicted, rr.position AS actual,
            EXISTS(SELECT 1 FROM race_results x WHERE x.race_id = r.id) AS hasResults
     FROM bets b
     JOIN users u ON u.id = b.user_id
     JOIN races r ON r.id = b.race_id
     JOIN bet_picks bp ON bp.bet_id = b.id
     LEFT JOIN race_results rr ON rr.race_id = r.id AND rr.skier_id = bp.skier_id AND rr.position BETWEEN 1 AND 5`,
  );
  return rows.map((row) => ({
    userId: Number(row.userId),
    nickname: row.nickname,
    raceId: Number(row.raceId),
    place: row.place,
    discipline: row.discipline,
    gender: row.gender,
    raceDate: String(row.raceDate).slice(0, 10),
    predicted: Number(row.predicted),
    actual: row.actual == null ? null : Number(row.actual),
    hasResults: Number(row.hasResults) === 1,
  }));
}

export async function leaderboard(): Promise<{ rows: RankedUser[]; picks: PickScoreRow[] }> {
  const picks = await loadPickRows();
  return { rows: rankUsers(picks), picks };
}

export async function pointsFor(userId: number): Promise<number> {
  const picks = await loadPickRows();
  return totalPoints(picks, userId);
}

export function myRaceScores(picks: PickScoreRow[], userId: number): RaceScore[] {
  return raceScoresFor(picks, userId);
}
