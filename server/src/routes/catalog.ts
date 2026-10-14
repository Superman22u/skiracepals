import { Router, type Request } from "express";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { z } from "zod";
import type { AuthedRequest } from "../auth";
import { requireAdmin, requireUser } from "../auth";
import { isBettingOpen } from "../dates";
import { rankField } from "../discipline-rank";
import { pool, query, withTx } from "../db";
import { asyncRoute, isDuplicate, readBody } from "../http";
import { placeKey } from "../names";
import { lastYearDetail, lastYearIndex, matchKey, suggestionFor } from "../prior";
import { scorePick } from "../scoring";
import { leaderboard, myRaceScores } from "../scores";

const router = Router();
router.use(requireUser);

const genderSchema = z.enum(["W", "M"]);
const disciplineSchema = z.enum(["DH", "SG", "GS", "SL", "AC"]);

const pickSchema = z.object({
  picks: z
    .array(
      z.object({
        skierId: z.number().int().positive(),
        position: z.number().int().min(1).max(5),
      }),
    )
    .length(5, "Choose five skiers, in order"),
});

const resultSchema = z.object({
  finishes: z
    .array(
      z.object({
        skierId: z.number().int().positive(),
        position: z.number().int().min(1).max(5),
      }),
    )
    .max(5),
});

const raceSchema = z.object({
  place: z.string().trim().min(1, "Enter the place").max(120),
  discipline: disciplineSchema,
  gender: genderSchema,
  raceDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date"),
});

const skierSchema = z.object({
  name: z.string().trim().min(1, "Enter the skier's name").max(120),
  nation: z
    .string()
    .trim()
    .regex(/^[A-Za-z]{3}$/, "Nation is a 3-letter code")
    .transform((value) => value.toUpperCase()),
  gender: genderSchema,
});

type RaceRow = RowDataPacket & {
  id: number;
  place: string;
  discipline: "DH" | "SG" | "GS" | "SL" | "AC";
  gender: "W" | "M";
  raceDate: string;
  hasBet: number;
  resultCount: number;
};

type SkierSlot = {
  position: number;
  skierId: number;
  name: string;
  nation: string;
};

function raceId(req: Request): number {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  return Number(raw);
}

function orderedSlots(slots: { skierId: number; position: number }[]): string | null {
  const positions = slots.map((slot) => slot.position);
  if (new Set(positions).size !== positions.length) return "Each rank can be used once";
  if (new Set(slots.map((slot) => slot.skierId)).size !== slots.length) return "A skier can only be picked once";
  return null;
}

router.get(
  "/races",
  asyncRoute(async (req, res) => {
    const user = (req as AuthedRequest).user;
    const races = await query<RaceRow>(
      `SELECT r.id, r.place, r.discipline, r.gender, r.race_date AS raceDate,
              (SELECT COUNT(*) FROM bets b WHERE b.race_id = r.id AND b.user_id = ?) AS hasBet,
              (SELECT COUNT(*) FROM race_results rr WHERE rr.race_id = r.id) AS resultCount
       FROM races r
       ORDER BY r.race_date, r.gender, FIELD(r.discipline, 'DH', 'SG', 'GS', 'SL', 'AC'), r.id`,
      [user.id],
    );
    const picks = await query<RowDataPacket & { raceId: number; predicted: number; actual: number | null }>(
      `SELECT b.race_id AS raceId, bp.position AS predicted, rr.position AS actual
       FROM bets b
       JOIN bet_picks bp ON bp.bet_id = b.id
       LEFT JOIN race_results rr
         ON rr.race_id = b.race_id AND rr.skier_id = bp.skier_id AND rr.position BETWEEN 1 AND 5
       WHERE b.user_id = ?`,
      [user.id],
    );
    const history = await lastYearIndex();
    const byRace = new Map<number, { predicted: number; actual: number | null }[]>();
    for (const pick of picks) {
      const list = byRace.get(Number(pick.raceId)) ?? [];
      list.push({ predicted: Number(pick.predicted), actual: pick.actual == null ? null : Number(pick.actual) });
      byRace.set(Number(pick.raceId), list);
    }

    res.json(
      races.map((race) => {
        const raceDate = String(race.raceDate).slice(0, 10);
        const bettingOpen = isBettingOpen(raceDate);
        const hasResults = Number(race.resultCount) > 0 && !bettingOpen;
        const mine = byRace.get(Number(race.id)) ?? [];
        const points =
          hasResults && mine.length > 0 ? mine.reduce((sum, pick) => sum + scorePick(pick.predicted, pick.actual), 0) : null;
        const lastYear = history.get(matchKey(placeKey(race.place), race.discipline, race.gender)) ?? null;
        return {
          id: Number(race.id),
          place: race.place,
          discipline: race.discipline,
          gender: race.gender,
          raceDate,
          bettingOpen,
          hasBet: Number(race.hasBet) > 0,
          hasResults,
          points,
          lastYearUrl: lastYear?.url ?? null,
          lastYearWinner: lastYear?.winner ?? null,
        };
      }),
    );
  }),
);

router.get(
  "/races/:id",
  asyncRoute(async (req, res) => {
    const id = raceId(req);
    const user = (req as AuthedRequest).user;
    const races = await query<RowDataPacket & RaceRow>(
      `SELECT id, place, discipline, gender, race_date AS raceDate,
              (SELECT COUNT(*) FROM race_results rr WHERE rr.race_id = races.id) AS resultCount
       FROM races WHERE id = ?`,
      [id],
    );
    const race = races[0];
    if (!race) {
      res.status(404).json({ error: "Race not found" });
      return;
    }
    const raceDate = String(race.raceDate).slice(0, 10);
    const bettingOpen = isBettingOpen(raceDate);
    const picks = await query<RowDataPacket & SkierSlot>(
      `SELECT bp.position, s.id AS skierId, s.name, s.nation
       FROM bets b
       JOIN bet_picks bp ON bp.bet_id = b.id
       JOIN skiers s ON s.id = bp.skier_id
       WHERE b.user_id = ? AND b.race_id = ?
       ORDER BY bp.position`,
      [user.id, id],
    );
    const storedResults = await query<RowDataPacket & SkierSlot>(
      `SELECT rr.position, s.id AS skierId, s.name, s.nation
       FROM race_results rr
       JOIN skiers s ON s.id = rr.skier_id
       WHERE rr.race_id = ?
       ORDER BY rr.position`,
      [id],
    );
    const history = await lastYearDetail(race.place, race.discipline, race.gender);
    const showResults = user.isAdmin || !bettingOpen;
    const scored = !bettingOpen && storedResults.length > 0;
    const actualBySkier = new Map(storedResults.map((result) => [Number(result.skierId), Number(result.position)]));
    res.json({
      id: Number(race.id),
      place: race.place,
      discipline: race.discipline,
      gender: race.gender,
      raceDate,
      bettingOpen,
      hasResults: scored,
      points: scored
        ? picks.reduce((sum, pick) => {
            const actual = actualBySkier.get(Number(pick.skierId)) ?? null;
            return sum + scorePick(Number(pick.position), actual != null && actual <= 5 ? actual : null);
          }, 0)
        : null,
      picks: picks.map((pick) => {
        const actual = actualBySkier.get(Number(pick.skierId)) ?? null;
        const inTop = actual != null && actual <= 5 ? actual : null;
        return {
          position: Number(pick.position),
          skierId: Number(pick.skierId),
          name: pick.name,
          nation: pick.nation,
          actual: scored ? inTop : null,
          points: scored ? scorePick(Number(pick.position), inTop) : null,
        };
      }),
      results: showResults
        ? storedResults.map((result) => ({
            position: Number(result.position),
            skierId: Number(result.skierId),
            name: result.name,
            nation: result.nation,
          }))
        : [],
      lastYear: history.links,
      suggestion: user.isAdmin
        ? await suggestionFor(id, race.discipline, race.gender, history.finishes)
        : null,
    });
  }),
);

router.put(
  "/races/:id/bet",
  asyncRoute(async (req, res) => {
    const body = readBody(pickSchema, req.body, res);
    if (!body) return;
    const id = raceId(req);
    const user = (req as AuthedRequest).user;
    const message = orderedSlots(body.picks);
    if (message || body.picks.some((pick) => ![1, 2, 3, 4, 5].includes(pick.position))) {
      res.status(400).json({ error: message ?? "Use ranks 1 through 5" });
      return;
    }
    const races = await query<RowDataPacket & { gender: "W" | "M"; raceDate: string }>(
      "SELECT gender, race_date AS raceDate FROM races WHERE id = ?",
      [id],
    );
    const race = races[0];
    if (!race) {
      res.status(404).json({ error: "Race not found" });
      return;
    }
    if (!isBettingOpen(String(race.raceDate).slice(0, 10))) {
      res.status(403).json({ error: "Betting is closed on the day of the race" });
      return;
    }
    const ids = body.picks.map((pick) => pick.skierId);
    const skiers = await query<RowDataPacket>(
      `SELECT id FROM skiers WHERE gender = ? AND active = 1 AND id IN (${ids.map(() => "?").join(",")})`,
      [race.gender, ...ids],
    );
    if (skiers.length !== 5) {
      res.status(400).json({ error: "Choose five skiers from this start list" });
      return;
    }
    await withTx(async (conn) => {
      await conn.query(
        `INSERT INTO bets (user_id, race_id) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP`,
        [user.id, id],
      );
      const [betRows] = await conn.query<RowDataPacket[]>("SELECT id FROM bets WHERE user_id = ? AND race_id = ?", [
        user.id,
        id,
      ]);
      const betId = Number(betRows[0].id);
      await conn.query("DELETE FROM bet_picks WHERE bet_id = ?", [betId]);
      await conn.query(
        `INSERT INTO bet_picks (bet_id, skier_id, position) VALUES ${body.picks.map(() => "(?, ?, ?)").join(",")}`,
        body.picks.flatMap((pick) => [betId, pick.skierId, pick.position]),
      );
    });
    res.status(204).end();
  }),
);

router.get(
  "/skiers",
  asyncRoute(async (req, res) => {
    const gender = genderSchema.safeParse(req.query.gender);
    if (!gender.success) {
      res.status(400).json({ error: "Choose women or men" });
      return;
    }
    const discipline = disciplineSchema.safeParse(req.query.discipline);
    const skiers = await query<RowDataPacket & { id: number; name: string; nation: string; gender: "W" | "M" }>(
      "SELECT id, name, nation, gender FROM skiers WHERE active = 1 AND gender = ?",
      [gender.data],
    );
    const field = skiers.map((skier) => ({
      id: Number(skier.id),
      name: skier.name,
      nation: skier.nation,
      gender: skier.gender,
    }));
    if (!discipline.success) {
      field.sort((a, b) => a.name.localeCompare(b.name));
      res.json(field.map((skier) => ({ ...skier, rank: null, rankNote: null })));
      return;
    }
    const lastYear = await query<RowDataPacket & { name: string; nation: string; position: number }>(
      `SELECT f.skier_name AS name, f.nation, f.position
       FROM prior_finishes f
       JOIN prior_races p ON p.id = f.prior_race_id
       WHERE p.gender = ? AND p.discipline = ? AND f.position BETWEEN 1 AND 10`,
      [gender.data, discipline.data],
    );
    const season = await query<RowDataPacket & { skierId: number; position: number }>(
      `SELECT rr.skier_id AS skierId, rr.position
       FROM race_results rr
       JOIN races r ON r.id = rr.race_id
       WHERE r.gender = ? AND r.discipline = ? AND rr.position BETWEEN 1 AND 5`,
      [gender.data, discipline.data],
    );
    res.json(
      rankField({
        skiers: field,
        lastYear: lastYear.map((finish) => ({
          name: finish.name,
          nation: finish.nation,
          position: Number(finish.position),
        })),
        season: season.map((result) => ({ skierId: Number(result.skierId), position: Number(result.position) })),
      }),
    );
  }),
);

router.get(
  "/ranking",
  asyncRoute(async (req, res) => {
    const user = (req as AuthedRequest).user;
    const board = await leaderboard();
    res.json({
      rows: board.rows,
      myRaces: myRaceScores(board.picks, user.id),
    });
  }),
);

router.post(
  "/admin/races",
  requireAdmin,
  asyncRoute(async (req, res) => {
    const body = readBody(raceSchema, req.body, res);
    if (!body) return;
    try {
      const [result] = await pool.query<ResultSetHeader>(
        "INSERT INTO races (place, discipline, gender, race_date, season) VALUES (?, ?, ?, ?, 2027)",
        [body.place, body.discipline, body.gender, body.raceDate],
      );
      res.status(201).json({ id: result.insertId });
    } catch (error) {
      if (isDuplicate(error)) {
        res.status(409).json({ error: "That race is already on the calendar" });
        return;
      }
      throw error;
    }
  }),
);

router.patch(
  "/admin/races/:id",
  requireAdmin,
  asyncRoute(async (req, res) => {
    const body = readBody(raceSchema, req.body, res);
    if (!body) return;
    const id = raceId(req);
    const existing = await query<RowDataPacket & { gender: "W" | "M" }>("SELECT gender FROM races WHERE id = ?", [id]);
    if (!existing[0]) {
      res.status(404).json({ error: "Race not found" });
      return;
    }
    if (existing[0].gender !== body.gender) {
      const bets = await query<RowDataPacket & { c: number }>("SELECT COUNT(*) AS c FROM bets WHERE race_id = ?", [id]);
      if (Number(bets[0]?.c ?? 0) > 0) {
        res.status(400).json({ error: "Gender stays fixed once someone has bet" });
        return;
      }
    }
    try {
      await pool.query("UPDATE races SET place = ?, discipline = ?, gender = ?, race_date = ? WHERE id = ?", [
        body.place,
        body.discipline,
        body.gender,
        body.raceDate,
        id,
      ]);
      res.status(204).end();
    } catch (error) {
      if (isDuplicate(error)) {
        res.status(409).json({ error: "That race is already on the calendar" });
        return;
      }
      throw error;
    }
  }),
);

router.delete(
  "/admin/races/:id",
  requireAdmin,
  asyncRoute(async (req, res) => {
    const id = raceId(req);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "Race not found" });
      return;
    }
    const [result] = await pool.query<ResultSetHeader>("DELETE FROM races WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Race not found" });
      return;
    }
    res.status(204).end();
  }),
);

router.post(
  "/admin/skiers",
  requireAdmin,
  asyncRoute(async (req, res) => {
    const body = readBody(skierSchema, req.body, res);
    if (!body) return;
    try {
      const existing = await query<RowDataPacket & { id: number; active: number }>(
        "SELECT id, active FROM skiers WHERE name = ? AND gender = ?",
        [body.name, body.gender],
      );
      if (existing[0]?.active === 0) {
        await pool.query("UPDATE skiers SET active = 1, nation = ? WHERE id = ?", [body.nation, existing[0].id]);
        res.status(201).json({ id: existing[0].id, name: body.name, nation: body.nation, gender: body.gender });
        return;
      }
      const [result] = await pool.query<ResultSetHeader>(
        "INSERT INTO skiers (name, nation, gender) VALUES (?, ?, ?)",
        [body.name, body.nation, body.gender],
      );
      res.status(201).json({ id: result.insertId, name: body.name, nation: body.nation, gender: body.gender });
    } catch (error) {
      if (isDuplicate(error)) {
        res.status(409).json({ error: "That skier is already listed" });
        return;
      }
      throw error;
    }
  }),
);

router.get(
  "/admin/skiers",
  requireAdmin,
  asyncRoute(async (req, res) => {
    const raw = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q;
    const term = String(raw ?? "").trim();
    if (term.length < 2) {
      res.json([]);
      return;
    }
    const rows = await query<RowDataPacket & { id: number; name: string; nation: string; gender: "W" | "M" }>(
      `SELECT id, name, nation, gender FROM skiers
       WHERE active = 1 AND name LIKE ?
       ORDER BY name
       LIMIT 20`,
      [`%${term.replace(/[\\%_]/g, "")}%`],
    );
    res.json(rows.map((skier) => ({ ...skier, id: Number(skier.id) })));
  }),
);

router.delete(
  "/admin/skiers/:id",
  requireAdmin,
  asyncRoute(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ error: "Unknown skier" });
      return;
    }
    const [result] = await pool.query<ResultSetHeader>("UPDATE skiers SET active = 0 WHERE id = ? AND active = 1", [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "That skier is not on the list" });
      return;
    }
    res.status(204).end();
  }),
);

router.put(
  "/admin/races/:id/results",
  requireAdmin,
  asyncRoute(async (req, res) => {
    const body = readBody(resultSchema, req.body, res);
    if (!body) return;
    const id = raceId(req);
    const races = await query<RowDataPacket & { gender: "W" | "M" }>("SELECT gender FROM races WHERE id = ?", [id]);
    const race = races[0];
    if (!race) {
      res.status(404).json({ error: "Race not found" });
      return;
    }
    const finishes = [...body.finishes].sort((a, b) => a.position - b.position);
    const slotError = orderedSlots(finishes);
    if (slotError) {
      res.status(400).json({ error: slotError });
      return;
    }
    if (finishes.some((finish, index) => finish.position !== index + 1)) {
      res.status(400).json({ error: "Enter the result from 1st without leaving a gap" });
      return;
    }
    if (finishes.length > 0) {
      const ids = finishes.map((finish) => finish.skierId);
      const skiers = await query<RowDataPacket>(
        `SELECT id FROM skiers WHERE gender = ? AND id IN (${ids.map(() => "?").join(",")})`,
        [race.gender, ...ids],
      );
      if (skiers.length !== finishes.length) {
        res.status(400).json({ error: "Results have to use skiers from this race" });
        return;
      }
    }
    await withTx(async (conn) => {
      await conn.query("DELETE FROM race_results WHERE race_id = ?", [id]);
      if (finishes.length === 0) return;
      await conn.query(
        `INSERT INTO race_results (race_id, skier_id, position) VALUES ${finishes.map(() => "(?, ?, ?)").join(",")}`,
        finishes.flatMap((finish) => [id, finish.skierId, finish.position]),
      );
    });
    res.status(204).end();
  }),
);

export const catalogRouter = router;
