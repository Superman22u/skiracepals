import { Router, type Request, type Response } from "express";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { z } from "zod";
import type { AuthedRequest } from "../auth";
import { requireAdmin, requireUser } from "../auth";
import { addCalendarDays, isBettingOpen, zurichToday } from "../dates";
import { rankField } from "../discipline-rank";
import { pool, query, withTx } from "../db";
import { loadGroups } from "../groups";
import { asyncRoute, isDuplicate, readBody } from "../http";
import { placeKey } from "../names";
import { lastYearDetail, lastYearIndex, matchKey, suggestionFor } from "../prior";
import { rankUsers, scorePick } from "../scoring";
import { leaderboard, myRaceScores } from "../scores";

const router = Router();

const groupSchema = z.object({
  name: z.string().trim().min(1, "Enter the group name").max(40, "Group name can be at most 40 characters"),
});

const groupMemberSchema = z.object({
  userId: z.number().int().positive(),
});

const newsSchema = z.object({
  body: z.string().trim().min(1, "Enter the news").max(1000),
  lang: z.enum(["en", "de"]),
});

router.get(
  "/news",
  asyncRoute(async (req, res) => {
    const lang = req.query.lang === "en" || req.query.lang === "de" ? req.query.lang : null;
    if (!lang) {
      res.set("Cache-Control", "no-store");
      res.json({ news: [] });
      return;
    }
    const rows = await query<RowDataPacket & { id: number; body: string; createdAt: string }>(
      "SELECT id, body, created_at AS createdAt FROM news WHERE lang = ? ORDER BY id DESC LIMIT 30",
      [lang],
    );
    res.set("Cache-Control", "no-store");
    res.json({
      news: rows.map((row) => ({
        id: Number(row.id),
        body: row.body,
        createdAt: String(row.createdAt).slice(0, 10),
      })),
    });
  }),
);

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
  fisRaceId: number | null;
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
      `SELECT id, place, discipline, gender, race_date AS raceDate, fis_race_id AS fisRaceId,
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
      fisRaceId: race.fisRaceId == null ? null : Number(race.fisRaceId),
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
    const groups = await loadGroups();
    const memberOf = groups.filter((group) => group.members.some((member) => member.id === user.id));
    const visible = user.isAdmin || memberOf.length > 0;
    const shown = user.isAdmin ? groups : memberOf;
    res.json({
      visible,
      rows: visible ? board.rows : [],
      groups: visible
        ? shown.map((group) => {
            const ids = new Set(group.members.map((member) => member.id));
            return {
              id: group.id,
              name: group.name,
              ownerNickname: group.ownerNickname,
              rows: rankUsers(
                board.picks.filter((pick) => ids.has(pick.userId)),
                group.members.map((member) => ({ userId: member.id, nickname: member.nickname })),
              ),
            };
          })
        : [],
      myRaces: myRaceScores(board.picks, user.id),
    });
  }),
);

router.get(
  "/groups",
  asyncRoute(async (req, res) => {
    const user = (req as AuthedRequest).user;
    const groups = await loadGroups();
    const users = await query<RowDataPacket & { id: number; nickname: string }>(
      "SELECT id, nickname FROM users ORDER BY nickname",
    );
    const view = (group: (typeof groups)[number], revealEmail: boolean) => ({
      id: group.id,
      name: group.name,
      ownerId: group.ownerId,
      ownerNickname: group.ownerNickname,
      canManage: group.ownerId === user.id || user.isAdmin,
      canEmail: group.ownerId === user.id,
      members: group.members.map((member) => ({
        id: member.id,
        nickname: member.nickname,
        email: revealEmail ? member.email : "",
      })),
    });
    res.json({
      directory: users.map((person) => ({ id: Number(person.id), nickname: person.nickname })),
      owned: groups.filter((group) => group.ownerId === user.id).map((group) => view(group, true)),
      joined: (user.isAdmin ? [] : groups.filter((group) => group.ownerId !== user.id && group.members.some((member) => member.id === user.id))).map(
        (group) => view(group, false),
      ),
      others: (user.isAdmin ? groups.filter((group) => group.ownerId !== user.id) : []).map((group) => view(group, false)),
    });
  }),
);

router.post(
  "/groups",
  asyncRoute(async (req, res) => {
    const body = readBody(groupSchema, req.body, res);
    if (!body) return;
    const user = (req as AuthedRequest).user;
    const id = await withTx(async (conn) => {
      const [result] = await conn.query<ResultSetHeader>("INSERT INTO tip_groups (name, created_by) VALUES (?, ?)", [
        body.name,
        user.id,
      ]);
      await conn.query("INSERT INTO tip_group_members (group_id, user_id) VALUES (?, ?)", [result.insertId, user.id]);
      return result.insertId;
    });
    res.status(201).json({ id });
  }),
);

router.post(
  "/groups/:id/members",
  asyncRoute(async (req, res) => {
    const body = readBody(groupMemberSchema, req.body, res);
    if (!body) return;
    const group = await groupFor(req, res, true);
    if (!group) return;
    const people = await query<RowDataPacket & { id: number }>("SELECT id FROM users WHERE id = ?", [body.userId]);
    if (people.length === 0) {
      res.status(404).json({ error: "Unknown account" });
      return;
    }
    try {
      await pool.query("INSERT INTO tip_group_members (group_id, user_id) VALUES (?, ?)", [group.id, body.userId]);
    } catch (error) {
      if (isDuplicate(error)) {
        res.status(409).json({ error: "That pal is already in the group" });
        return;
      }
      throw error;
    }
    res.status(204).end();
  }),
);

router.delete(
  "/groups/:id/members/:userId",
  asyncRoute(async (req, res) => {
    const group = await groupFor(req, res, false);
    if (!group) return;
    const memberId = Number(req.params.userId);
    const user = (req as AuthedRequest).user;
    if (!Number.isInteger(memberId) || memberId <= 0) {
      res.status(404).json({ error: "Unknown account" });
      return;
    }
    if (memberId === group.ownerId && (group.ownerId === user.id || !user.isAdmin)) {
      res.status(400).json({ error: "The group creator stays until the group is deleted" });
      return;
    }
    const [result] = await pool.query<ResultSetHeader>("DELETE FROM tip_group_members WHERE group_id = ? AND user_id = ?", [
      group.id,
      memberId,
    ]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Unknown account" });
      return;
    }
    res.status(204).end();
  }),
);

router.delete(
  "/groups/:id",
  asyncRoute(async (req, res) => {
    const group = await groupFor(req, res, false);
    if (!group) return;
    await pool.query("DELETE FROM tip_groups WHERE id = ?", [group.id]);
    res.status(204).end();
  }),
);

async function groupFor(req: Request, res: Response, ownerOnly: boolean) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(404).json({ error: "That group was not found" });
    return null;
  }
  const groups = await loadGroups();
  const group = groups.find((item) => item.id === id);
  if (!group) {
    res.status(404).json({ error: "That group was not found" });
    return null;
  }
  const user = (req as AuthedRequest).user;
  const owner = group.ownerId === user.id;
  if (ownerOnly ? !owner : !owner && !user.isAdmin) {
    res.status(403).json({ error: "Only the person who created the group can do that" });
    return null;
  }
  return group;
}

router.post(
  "/admin/news",
  requireAdmin,
  asyncRoute(async (req, res) => {
    const body = readBody(newsSchema, req.body, res);
    if (!body) return;
    const [result] = await pool.query<ResultSetHeader>("INSERT INTO news (lang, body) VALUES (?, ?)", [
      body.lang,
      body.body,
    ]);
    const rows = await query<RowDataPacket & { id: number; body: string; createdAt: string }>(
      "SELECT id, body, created_at AS createdAt FROM news WHERE id = ?",
      [result.insertId],
    );
    const row = rows[0];
    res.status(201).json({
      id: Number(row.id),
      body: row.body,
      createdAt: String(row.createdAt).slice(0, 10),
    });
  }),
);

router.delete(
  "/admin/news/:id",
  requireAdmin,
  asyncRoute(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      res.status(404).json({ error: "News not found" });
      return;
    }
    const [result] = await pool.query<ResultSetHeader>("DELETE FROM news WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "News not found" });
      return;
    }
    res.status(204).end();
  }),
);

router.get(
  "/admin/mail",
  requireAdmin,
  asyncRoute(async (req, res) => {
    const today = zurichToday();
    const until = addCalendarDays(today, 2);
    const adminId = (req as AuthedRequest).user.id;
    const users = await query<RowDataPacket & { id: number; nickname: string; email: string }>(
      `SELECT id, nickname, email FROM users
       WHERE id <> ? AND TRIM(email) <> ''
       ORDER BY nickname`,
      [adminId],
    );
    const races = await query<RowDataPacket & { id: number; place: string; discipline: string; gender: "W" | "M"; raceDate: string }>(
      `SELECT id, place, discipline, gender, race_date AS raceDate
       FROM races
       WHERE race_date > ? AND race_date <= ?
       ORDER BY race_date, gender, FIELD(discipline, 'DH', 'SG', 'GS', 'SL', 'AC'), id`,
      [today, until],
    );
    const raceIds = races.map((race) => Number(race.id));
    const bets = raceIds.length
      ? await query<RowDataPacket & { userId: number; raceId: number }>(
          `SELECT user_id AS userId, race_id AS raceId FROM bets WHERE race_id IN (${raceIds.map(() => "?").join(",")})`,
          raceIds,
        )
      : [];
    const betted = new Set(bets.map((bet) => `${Number(bet.userId)}:${Number(bet.raceId)}`));
    const people = users.map((user) => ({
      id: Number(user.id),
      nickname: user.nickname,
      email: user.email,
    }));
    res.json({
      participants: people.map(({ nickname, email }) => ({ nickname, email })),
      upcoming: races.map((race) => ({
        id: Number(race.id),
        place: race.place,
        discipline: race.discipline,
        gender: race.gender,
        raceDate: String(race.raceDate).slice(0, 10),
        missing: people
          .filter((person) => !betted.has(`${person.id}:${Number(race.id)}`))
          .map(({ nickname, email }) => ({ nickname, email })),
      })),
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
