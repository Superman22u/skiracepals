/** Betting on race day closes at this time, Europe/Zurich. */
export const BETTING_CLOSES_AT = { hour: 9, minute: 30 };

export function zurichClock(now = new Date()): { date: string; hour: number; minute: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Zurich",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  const hour = Number(get("hour"));
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    hour: hour === 24 ? 0 : hour,
    minute: Number(get("minute")),
  };
}

export function zurichToday(now = new Date()): string {
  return zurichClock(now).date;
}

/** Open through the day before, and on race day until 09:30 Europe/Zurich. */
export function isBettingOpen(raceDate: string, now = new Date()): boolean {
  const clock = zurichClock(now);
  if (raceDate > clock.date) return true;
  if (raceDate < clock.date) return false;
  if (clock.hour !== BETTING_CLOSES_AT.hour) return clock.hour < BETTING_CLOSES_AT.hour;
  return clock.minute < BETTING_CLOSES_AT.minute;
}

/** No bet yet, and the race is today or one of the next two days, while betting is still open. */
export function isBetDue(raceDate: string, hasBet: boolean, now = new Date()): boolean {
  if (hasBet || !isBettingOpen(raceDate, now)) return false;
  return raceDate <= addCalendarDays(zurichToday(now), 2);
}

export function addCalendarDays(iso: string, days: number): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/** The day before a race, and the day before that. Race morning is not included. */
export function isReminderWindow(raceDate: string, today = zurichToday()): boolean {
  return raceDate > today && raceDate <= addCalendarDays(today, 2);
}

/** UTC instant of a clock time in Europe/Zurich. */
export function zurichInstant(date: string, hour: number, minute: number): Date {
  const [year, month, day] = date.split("-").map(Number);
  let utc = Date.UTC(year, month - 1, day, hour - 1, minute);
  for (let step = 0; step < 4; step += 1) {
    const clock = zurichClock(new Date(utc));
    const [seenYear, seenMonth, seenDay] = clock.date.split("-").map(Number);
    const seen = Date.UTC(seenYear, seenMonth - 1, seenDay, clock.hour, clock.minute);
    const wanted = Date.UTC(year, month - 1, day, hour, minute);
    if (seen === wanted) return new Date(utc);
    utc += wanted - seen;
  }
  return new Date(utc);
}

export function bettingClosesAt(raceDate: string): Date {
  return zurichInstant(raceDate, BETTING_CLOSES_AT.hour, BETTING_CLOSES_AT.minute);
}

/** From 24 hours before 09:30 on race day, until betting closes. */
export function isDayBeforeFill(raceDate: string, now = new Date()): boolean {
  const close = bettingClosesAt(raceDate).getTime();
  const time = now.getTime();
  return time >= close - 24 * 60 * 60 * 1000 && time < close;
}

/** Race day in Zurich, from 09:30 on, when betting has closed. */
export function isAfterCloseFill(raceDate: string, now = new Date()): boolean {
  const clock = zurichClock(now);
  if (clock.date !== raceDate) return false;
  if (clock.hour !== BETTING_CLOSES_AT.hour) return clock.hour > BETTING_CLOSES_AT.hour;
  return clock.minute >= BETTING_CLOSES_AT.minute;
}

/** The 48-hour reminder is the day before the 24-hour reminder. Each ends when the next begins. */
export function isRemindHours(raceDate: string, hours: 24 | 48, now = new Date()): boolean {
  const close = bettingClosesAt(raceDate).getTime();
  const time = now.getTime();
  const start = close - hours * 60 * 60 * 1000;
  const end = close - (hours === 48 ? 24 : 0) * 60 * 60 * 1000;
  return time >= start && time < end;
}
