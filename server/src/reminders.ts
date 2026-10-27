import type { RowDataPacket } from "mysql2";
import { addCalendarDays, isRemindHours, zurichToday } from "./dates";
import { query } from "./db";

export type ReminderRace = {
  place: string;
  discipline: string;
  gender: "W" | "M";
  raceDate: string;
};

export type DueReminder = {
  nickname: string;
  email: string;
  phone: string;
  emailRaces48: ReminderRace[];
  emailRaces24: ReminderRace[];
  whatsappRaces48: ReminderRace[];
  whatsappRaces24: ReminderRace[];
};

type UserRow = RowDataPacket & {
  id: number;
  nickname: string;
  email: string;
  phone: string | null;
  email48: number;
  email24: number;
  whatsapp48: number;
  whatsapp24: number;
};

type RaceRow = RowDataPacket & {
  id: number;
  place: string;
  discipline: string;
  gender: "W" | "M";
  raceDate: string;
};

/** People who asked for a reminder and still have no bet in that window. */
export async function listDueReminders(adminId: number, now = new Date()): Promise<DueReminder[]> {
  const today = zurichToday(now);
  const users = await query<UserRow>(
    `SELECT id, nickname, email, whatsapp_phone AS phone,
            remind_email_48 AS email48, remind_email_24 AS email24,
            remind_whatsapp_48 AS whatsapp48, remind_whatsapp_24 AS whatsapp24
     FROM users
     WHERE id <> ?
       AND (remind_email_48 = 1 OR remind_email_24 = 1 OR remind_whatsapp_48 = 1 OR remind_whatsapp_24 = 1)
     ORDER BY nickname`,
    [adminId],
  );
  if (users.length === 0) return [];
  const races = await query<RaceRow>(
    `SELECT id, place, discipline, gender, race_date AS raceDate
     FROM races
     WHERE race_date >= ? AND race_date <= ?
     ORDER BY race_date, gender, id`,
    [today, addCalendarDays(today, 2)],
  );
  if (races.length === 0) return [];
  const bets = await query<RowDataPacket & { userId: number; raceId: number }>(
    `SELECT user_id AS userId, race_id AS raceId FROM bets WHERE race_id IN (${races.map(() => "?").join(",")})`,
    races.map((race) => race.id),
  );
  const betted = new Set(bets.map((bet) => `${Number(bet.userId)}:${Number(bet.raceId)}`));
  const due: DueReminder[] = [];
  for (const user of users) {
    const phone = (user.phone ?? "").replace(/\D/g, "");
    const open = (wanted: boolean, hours: 24 | 48) =>
      races.filter(
        (race) =>
          wanted && isRemindHours(String(race.raceDate).slice(0, 10), hours, now) && !betted.has(`${user.id}:${race.id}`),
      );
    const line = (race: RaceRow): ReminderRace => ({
      place: race.place,
      discipline: race.discipline,
      gender: race.gender,
      raceDate: String(race.raceDate).slice(0, 10),
    });
    const emailRaces48 = user.email.trim() ? open(Number(user.email48) === 1, 48).map(line) : [];
    const emailRaces24 = user.email.trim() ? open(Number(user.email24) === 1, 24).map(line) : [];
    const whatsappRaces48 = phone ? open(Number(user.whatsapp48) === 1, 48).map(line) : [];
    const whatsappRaces24 = phone ? open(Number(user.whatsapp24) === 1, 24).map(line) : [];
    if (emailRaces48.length + emailRaces24.length + whatsappRaces48.length + whatsappRaces24.length === 0) continue;
    due.push({
      nickname: user.nickname,
      email: user.email,
      phone,
      emailRaces48,
      emailRaces24,
      whatsappRaces48,
      whatsappRaces24,
    });
  }
  return due;
}
