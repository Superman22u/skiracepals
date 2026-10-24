export class StartListError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StartListError";
  }
}

export type DrawnStarter = { name: string; nation: string };

export type FisDraw = {
  gender: "W" | "M" | null;
  discipline: "DH" | "SG" | "GS" | "SL" | "AC" | null;
  starters: DrawnStarter[];
};

const liveLinkError = "Paste a FIS live link, like https://live.fis-ski.com/lv-al5001.htm";

/** The public page is a shell. The codex in the address selects the live data file. */
export function fisLiveCodex(input: string): string {
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    throw new StartListError(liveLinkError);
  }
  if (url.protocol !== "https:" || url.hostname !== "live.fis-ski.com") throw new StartListError(liveLinkError);
  const match = url.pathname.match(/\/lv-([a-z]{2}\d{3,6})\.htm$/i);
  if (!match) throw new StartListError(liveLinkError);
  return match[1].toLowerCase();
}

const particles = new Set(["da", "de", "del", "della", "den", "der", "di", "van", "von"]);

function titleWord(word: string): string {
  if (word.includes("'")) return word.split("'").map(titleWord).join("'");
  const lower = word.toLowerCase();
  if (particles.has(lower)) return lower;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function formatFisPerson(first: string, last: string): string {
  const lastName = last
    .split(/(\s+|-)/)
    .map((part) => (/^\s+$|^-$/.test(part) ? part : titleWord(part)))
    .join("");
  return `${first} ${lastName}`.replace(/\s+/g, " ").trim();
}

export function parseFisDraw(xml: string): FisDraw {
  const racers = new Map<number, DrawnStarter>();
  const racerRe =
    /a:7:\{i:0;i:(\d+);i:1;s:\d+:"((?:\\.|[^"\\])*)";i:2;s:\d+:"((?:\\.|[^"\\])*)";i:3;s:3:"([A-Z]{3})"/g;
  for (const match of xml.matchAll(racerRe)) {
    racers.set(Number(match[1]), { name: formatFisPerson(match[3], match[2]), nation: match[4] });
  }

  const startAt = xml.indexOf('s:9:"startlist"');
  const startEnd = startAt < 0 ? -1 : xml.indexOf('s:7:"message"', startAt);
  const startBlob = startAt < 0 ? "" : xml.slice(startAt, startEnd < 0 ? startAt + 20000 : startEnd);
  const starters: DrawnStarter[] = [];
  const seen = new Set<number>();
  for (const match of startBlob.matchAll(/a:4:\{i:0;i:(\d+);/g)) {
    const id = Number(match[1]);
    if (seen.has(id)) continue;
    seen.add(id);
    const starter = racers.get(id);
    if (!starter) throw new StartListError("The FIS start list could not be read");
    starters.push(starter);
  }

  const genderMatch = xml.match(/s:6:"gender";s:1:"([WML])"/);
  const disciplineMatch = xml.match(/s:10:"discipline";s:2:"(DH|SG|GS|SL|AC)"/);
  const genderCode = genderMatch?.[1];
  return {
    gender: genderCode === "M" ? "M" : genderCode === "W" || genderCode === "L" ? "W" : null,
    discipline: (disciplineMatch?.[1] as FisDraw["discipline"]) ?? null,
    starters,
  };
}

export async function fetchFisDraw(pageUrl: string): Promise<FisDraw> {
  const target = `https://live.fis-ski.com/${fisLiveCodex(pageUrl)}/main.xml`;
  let response: Response;
  try {
    response = await fetch(target, {
      redirect: "manual",
      signal: AbortSignal.timeout(15000),
      headers: { accept: "application/xml, text/xml, */*" },
    });
  } catch {
    throw new StartListError("The FIS start list could not be read");
  }
  if (response.status !== 200) throw new StartListError("The FIS start list could not be read");
  const xml = await response.text();
  if (!xml.includes('s:9:"startlist"') || xml.length > 2_000_000) {
    throw new StartListError("The FIS start list could not be read");
  }
  return parseFisDraw(xml);
}
