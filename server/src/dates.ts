export function zurichToday(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Zurich",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/** Betting stays open through the day before the race, in Europe/Zurich. */
export function isBettingOpen(raceDate: string, today = zurichToday()): boolean {
  return raceDate > today;
}

export function addCalendarDays(iso: string, days: number): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/** The day before a race, and the day before that. Race day itself is already closed. */
export function isReminderWindow(raceDate: string, today = zurichToday()): boolean {
  return raceDate > today && raceDate <= addCalendarDays(today, 2);
}
