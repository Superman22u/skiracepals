import { formatFisPerson, StartListError, type FisDraw } from "./fis-live";

const readError = "The FIS start list could not be read";
const missingError = "The official start list is not on the FIS page yet";

/** The public race page prints the start list as LASTNAME Firstname. */
export function parseFisResultsPage(html: string): FisDraw {
  const kind = html.match(/class="event-header__kind">\s*([^<]+?)\s*</)?.[1] ?? "";
  const heading = html.search(/<h3[^>]*>\s*start list\s*<\/h3>/i);
  if (heading < 0) throw new StartListError(missingError);
  const afterHeading = html.slice(heading);
  const headingEnd = afterHeading.indexOf("</h3>");
  const section = headingEnd < 0 ? afterHeading : afterHeading.slice(headingEnd + 5);
  const nextHeading = section.search(/<h3\b/i);
  const table = nextHeading < 0 ? section : section.slice(0, nextHeading);
  const starters = table
    .split(/class="table-row"/)
    .slice(1)
    .map((row) => {
      const name = row.match(/athlete-name">\s*([^<]+?)\s*</);
      const nation = row.match(/country__name-short">\s*([A-Z]{3})\s*</);
      if (!name || !nation) throw new StartListError(readError);
      return { name: officialName(name[1]), nation: nation[1] };
    });
  if (starters.length === 0) throw new StartListError(missingError);
  return { gender: fieldGender(kind), discipline: fieldDiscipline(kind), starters };
}

export async function fetchFisStartList(fisRaceId: number): Promise<FisDraw> {
  if (!Number.isInteger(fisRaceId) || fisRaceId <= 0) throw new StartListError("This race has no FIS race id");
  const target = `https://www.fis-ski.com/DB/general/results.html?sectorcode=AL&raceid=${fisRaceId}`;
  let response: Response;
  try {
    response = await fetch(target, {
      redirect: "manual",
      signal: AbortSignal.timeout(15000),
      headers: { accept: "text/html" },
    });
  } catch {
    throw new StartListError(readError);
  }
  if (response.status !== 200) throw new StartListError(readError);
  const html = await response.text();
  if (html.length > 3_000_000 || !html.includes(`raceid=${fisRaceId}`)) throw new StartListError(readError);
  return parseFisResultsPage(html);
}

function officialName(raw: string): string {
  const last: string[] = [];
  const first: string[] = [];
  for (const token of raw.replace(/\s+/g, " ").trim().split(" ")) {
    const letters = token.replace(/[^\p{L}]/gu, "");
    const allCaps = letters.length > 1 && letters === letters.toLocaleUpperCase("en");
    if (allCaps && first.length === 0) last.push(token);
    else first.push(token);
  }
  if (last.length === 0 || first.length === 0) throw new StartListError(readError);
  return formatFisPerson(first.join(" "), last.join(" "));
}

function fieldGender(kind: string): "W" | "M" | null {
  if (/women|ladies/i.test(kind)) return "W";
  if (/\bmen\b/i.test(kind)) return "M";
  return null;
}

function fieldDiscipline(kind: string): FisDraw["discipline"] {
  if (/giant slalom/i.test(kind)) return "GS";
  if (/super-?\s*g/i.test(kind)) return "SG";
  if (/downhill/i.test(kind)) return "DH";
  if (/combined/i.test(kind)) return "AC";
  if (/slalom/i.test(kind)) return "SL";
  return null;
}
