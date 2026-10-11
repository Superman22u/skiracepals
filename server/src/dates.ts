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
