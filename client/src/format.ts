import { translate, type Lang } from "./i18n";

export const lastSeasonFis =
  "https://www.fis-ski.com/DB/alpine-skiing/calendar-results.html?sectorcode=AL&seasoncode=2026&categorycode=WC";

export const thisSeasonFis =
  "https://www.fis-ski.com/DB/alpine-skiing/calendar-results.html?eventselection=&place=&sectorcode=AL&seasoncode=2027&categorycode=WC&disciplinecode=&gendercode=&racedate=&racecodex=&nationcode=&seasonmonth=X-2027&saveselection=-1&seasonselection=";

export function fisRaceUrl(fisRaceId: number): string {
  return `https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=${fisRaceId}#results`;
}

/** Official FIS World Cup standings. 2026 is last season, 2027 is this season. */
export function cupStandingsUrl(seasonCode: 2026 | 2027, discipline: string, gender: "W" | "M"): string {
  return `https://www.fis-ski.com/DB/alpine-skiing/cup-standings.html?sectorcode=AL&seasoncode=${seasonCode}&cupcode=WC&disciplinecode=${discipline}&gendercode=${gender}&nationcode=`;
}

export function rankLabel(position: number, lang: Lang): string {
  if (lang === "de") return `${position}.`;
  const ranks = ["1st", "2nd", "3rd", "4th", "5th"];
  return ranks[position - 1] ?? String(position);
}

export function formatRaceDate(iso: string, lang: Lang): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function monthLabel(iso: string, lang: Lang): string {
  const [year, month] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

const reasonDiscipline: Record<string, string> = {
  downhill: "discipline_DH",
  "super-G": "discipline_SG",
  "giant slalom": "discipline_GS",
  slalom: "discipline_SL",
  "alpine combined": "discipline_AC",
};

export function translateReason(reason: string, lang: Lang): string {
  return reason
    .split(" · ")
    .map((part) => {
      let match = part.match(/^(\d+)(?:st|nd|rd|th) here last year$/);
      if (match) return translate(lang, "reasonVenue", { rank: rankLabel(Number(match[1]), lang) });
      match = part.match(/^leading (.+) this season$/);
      if (match && reasonDiscipline[match[1]]) {
        return translate(lang, "reasonLeading", { discipline: translate(lang, reasonDiscipline[match[1]]) });
      }
      match = part.match(/^(\d+)(?:st|nd|rd|th) in (.+) this season$/);
      if (match && reasonDiscipline[match[2]]) {
        return translate(lang, "reasonPlace", {
          rank: rankLabel(Number(match[1]), lang),
          discipline: translate(lang, reasonDiscipline[match[2]]),
        });
      }
      if (part === "scoring in other disciplines this season") return translate(lang, "reasonOther");
      return part;
    })
    .join(" · ");
}
