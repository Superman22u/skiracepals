import type { RowDataPacket } from "mysql2";
import { pool, query } from "./db";

export type ActivityKind = "bet" | "settings" | "group";

export async function recordActivity(
  userId: number,
  kind: ActivityKind,
  detail: Record<string, string>,
): Promise<void> {
  await pool.query("INSERT INTO activity (user_id, kind, detail) VALUES (?, ?, ?)", [
    userId,
    kind,
    JSON.stringify(detail).slice(0, 400),
  ]);
}

export type ActivityItem = {
  id: number;
  at: string;
  nickname: string;
  kind: ActivityKind;
  place: string;
  discipline: string;
  gender: string;
  raceDate: string;
  action: string;
  group: string;
  member: string;
};

export async function listActivity(): Promise<ActivityItem[]> {
  const rows = await query<RowDataPacket & { id: number; nickname: string; kind: ActivityKind; detail: string; createdAt: string }>(
    `SELECT a.id, u.nickname, a.kind, a.detail, a.created_at AS createdAt
     FROM activity a
     JOIN users u ON u.id = a.user_id
    ORDER BY a.created_at DESC, a.id DESC
    LIMIT 80`,
  );
  return rows.map((row) => {
    const detail = readDetail(row.detail);
    return {
      id: Number(row.id),
      at: String(row.createdAt),
      nickname: row.nickname,
      kind: row.kind,
      place: detail.place ?? "",
      discipline: detail.discipline ?? "",
      gender: detail.gender ?? "",
      raceDate: detail.raceDate ?? "",
      action: detail.action ?? "",
      group: detail.group || detail.name || "",
      member: detail.member ?? "",
    };
  });
}

/** One line for each bet and created group already stored. Settings have no saved time. */
export async function backfillStoredActivity(): Promise<void> {
  const existing = await query<RowDataPacket & { userId: number; kind: ActivityKind; detail: string }>(
    "SELECT user_id AS userId, kind, detail FROM activity WHERE kind IN ('bet', 'group')",
  );
  const seen = new Set(
    existing.map((row) => {
      const detail = readDetail(row.detail);
      if (row.kind === "bet") {
        return `bet:${row.userId}:${detail.place}:${detail.discipline}:${detail.gender}:${detail.raceDate}`;
      }
      return `group:${row.userId}:${detail.action || "created"}:${detail.group || detail.name || ""}`;
    }),
  );
  const bets = await query<
    RowDataPacket & {
      userId: number;
      updatedAt: string;
      place: string;
      discipline: string;
      gender: string;
      raceDate: string;
    }
  >(
    `SELECT b.user_id AS userId, b.updated_at AS updatedAt, r.place, r.discipline, r.gender, r.race_date AS raceDate
     FROM bets b
     JOIN races r ON r.id = b.race_id`,
  );
  for (const bet of bets) {
    const raceDate = String(bet.raceDate).slice(0, 10);
    const key = `bet:${bet.userId}:${bet.place}:${bet.discipline}:${bet.gender}:${raceDate}`;
    if (seen.has(key)) continue;
    seen.add(key);
    await pool.query("INSERT INTO activity (user_id, kind, detail, created_at) VALUES (?, 'bet', ?, ?)", [
      bet.userId,
      JSON.stringify({ place: bet.place, discipline: bet.discipline, gender: bet.gender, raceDate }),
      bet.updatedAt,
    ]);
  }
  const groups = await query<RowDataPacket & { userId: number; name: string; createdAt: string }>(
    "SELECT created_by AS userId, name, created_at AS createdAt FROM tip_groups",
  );
  for (const group of groups) {
    const key = `group:${group.userId}:created:${group.name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    await pool.query("INSERT INTO activity (user_id, kind, detail, created_at) VALUES (?, 'group', ?, ?)", [
      group.userId,
      JSON.stringify({ action: "created", name: group.name }),
      group.createdAt,
    ]);
  }
}

function readDetail(raw: string): Record<string, string> {
  try {
    const value = JSON.parse(raw) as Record<string, unknown>;
    const detail: Record<string, string> = {};
    for (const [key, item] of Object.entries(value)) {
      if (typeof item === "string") detail[key] = item;
    }
    return detail;
  } catch {
    return {};
  }
}
