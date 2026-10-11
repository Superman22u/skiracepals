import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { hashPassword } from "./auth";
import { pool, query } from "./db";
import { placeKey } from "./names";
import { priorSeed } from "./prior-data";
import { seedRaces, seedSkiers } from "./seed-data";

type CountRow = RowDataPacket & { c: number };

export async function seedIfEmpty(): Promise<void> {
  const skiers = await query<CountRow>("SELECT COUNT(*) AS c FROM skiers");
  if (Number(skiers[0]?.c ?? 0) === 0) {
    const placeholders = seedSkiers.map(() => "(?, ?, ?)").join(",");
    const params = seedSkiers.flatMap((skier) => [skier.name, skier.nation, skier.gender]);
    await pool.query(`INSERT INTO skiers (name, nation, gender) VALUES ${placeholders}`, params);
  }

  const races = await query<CountRow>("SELECT COUNT(*) AS c FROM races");
  if (Number(races[0]?.c ?? 0) === 0) {
    const placeholders = seedRaces.map(() => "(?, ?, ?, ?, ?, ?)").join(",");
    const params = seedRaces.flatMap((race) => [
      race.fisRaceId,
      race.place,
      race.discipline,
      race.gender,
      race.raceDate,
      race.season,
    ]);
    await pool.query(
      `INSERT INTO races (fis_race_id, place, discipline, gender, race_date, season) VALUES ${placeholders}`,
      params,
    );
  }
}

export async function seedPriorIfEmpty(): Promise<void> {
  const existing = await query<CountRow>("SELECT COUNT(*) AS c FROM prior_races");
  if (Number(existing[0]?.c ?? 0) > 0) return;
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    for (const race of priorSeed) {
      const [result] = await connection.query<ResultSetHeader>(
        `INSERT INTO prior_races (fis_race_id, place, place_key, discipline, gender, race_date, result_url)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [race.fisRaceId, race.place, placeKey(race.place), race.discipline, race.gender, race.raceDate, race.resultUrl],
      );
      if (race.finishes.length === 0) continue;
      const placeholders = race.finishes.map(() => "(?, ?, ?, ?)").join(",");
      const params = race.finishes.flatMap((finish) => [result.insertId, finish.position, finish.name, finish.nation]);
      await connection.query(
        `INSERT INTO prior_finishes (prior_race_id, position, skier_name, nation) VALUES ${placeholders}`,
        params,
      );
    }
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function ensureAdmin(): Promise<void> {
  const existing = await query<RowDataPacket>("SELECT id FROM users WHERE nickname = ?", ["ren"]);
  if (!existing[0]) {
    const password = process.env.ADMIN_PASSWORD;
    if (!password) {
      console.warn("Administrator ren does not exist yet. Set ADMIN_PASSWORD in .env and restart.");
      return;
    }
    const hash = await hashPassword(password);
    await pool.query(
      "INSERT INTO users (name, email, password_hash, nickname, is_admin) VALUES (?, ?, ?, 'ren', 1)",
      [process.env.ADMIN_NAME ?? "Ren", process.env.ADMIN_EMAIL ?? "ren@skiracepals.local", hash],
    );
    console.log("Created administrator ren");
  }
  await pool.query("UPDATE users SET is_admin = CASE WHEN nickname = 'ren' THEN 1 ELSE 0 END");
}
