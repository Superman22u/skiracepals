import type { Discipline, Gender } from "./types";

export const disciplineLabel: Record<Discipline, string> = {
  DH: "Downhill",
  SG: "Super-G",
  GS: "Giant slalom",
  SL: "Slalom",
  AC: "Alpine combined",
};

export const genderLabel: Record<Gender, string> = {
  W: "Women",
  M: "Men",
};

export const lastSeasonFis =
  "https://www.fis-ski.com/DB/alpine-skiing/calendar-results.html?sectorcode=AL&seasoncode=2026&categorycode=WC";

const ranks = ["1st", "2nd", "3rd", "4th", "5th"];

export function rankLabel(position: number): string {
  return ranks[position - 1] ?? String(position);
}

export function formatRaceDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function monthLabel(iso: string): string {
  const [year, month] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}
