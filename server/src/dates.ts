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
