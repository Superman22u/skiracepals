import { nameKey } from "./names";

const venuePoints = [0, 40, 32, 26, 21, 17, 12, 8, 5, 3, 2];
const disciplinePoints = [0, 25, 18, 14, 10, 7];

const disciplineName: Record<string, string> = {
  DH: "downhill",
  SG: "super-G",
  GS: "giant slalom",
  SL: "slalom",
  AC: "alpine combined",
};

export type SkierRef = { id: number; name: string; nation: string };

export type SuggestionPick = {
  skierId: number;
  name: string;
  nation: string;
  reason: string;
};

type Score = {
  skier: SkierRef;
  total: number;
  venuePosition: number | null;
  disciplinePoints: number;
  otherPoints: number;
};

export function suggestTopFive(input: {
  discipline: string;
  skiers: SkierRef[];
  venue: { name: string; nation: string; position: number }[];
  season: { skierId: number; discipline: string; position: number }[];
}): SuggestionPick[] {
  const byKey = new Map<string, SkierRef[]>();
  const byId = new Map<number, SkierRef>();
  for (const skier of input.skiers) {
    byId.set(skier.id, skier);
    const key = nameKey(skier.name);
    const list = byKey.get(key) ?? [];
    list.push(skier);
    byKey.set(key, list);
  }

  const resolve = (name: string, nation: string) => {
    const list = byKey.get(nameKey(name)) ?? [];
    return list.find((skier) => skier.nation === nation) ?? list[0];
  };

  const scores = new Map<number, Score>();
  const ensure = (skier: SkierRef) => {
    let score = scores.get(skier.id);
    if (!score) {
      score = { skier, total: 0, venuePosition: null, disciplinePoints: 0, otherPoints: 0 };
      scores.set(skier.id, score);
    }
    return score;
  };

  for (const finish of input.venue) {
    const skier = resolve(finish.name, finish.nation);
    const points = venuePoints[finish.position] ?? 0;
    if (!skier || points === 0) continue;
    const score = ensure(skier);
    score.total += points;
    if (score.venuePosition == null || finish.position < score.venuePosition) score.venuePosition = finish.position;
  }

  for (const result of input.season) {
    const skier = byId.get(result.skierId);
    const base = disciplinePoints[result.position] ?? 0;
    if (!skier || base === 0) continue;
    const score = ensure(skier);
    if (result.discipline === input.discipline) {
      score.disciplinePoints += base;
      score.total += base;
    } else {
      const bonus = Math.round(base / 2);
      score.otherPoints += bonus;
      score.total += bonus;
    }
  }

  const disciplineRank = new Map<number, number>();
  const ranked = [...scores.values()]
    .filter((score) => score.disciplinePoints > 0)
    .sort((a, b) => b.disciplinePoints - a.disciplinePoints || a.skier.name.localeCompare(b.skier.name));
  let rank = 0;
  ranked.forEach((score, index) => {
    const previous = ranked[index - 1];
    if (!previous || previous.disciplinePoints !== score.disciplinePoints) rank = index + 1;
    disciplineRank.set(score.skier.id, rank);
  });

  return [...scores.values()]
    .filter((score) => score.total > 0)
    .sort((a, b) => b.total - a.total || (a.venuePosition ?? 99) - (b.venuePosition ?? 99) || a.skier.name.localeCompare(b.skier.name))
    .slice(0, 5)
    .map((score) => ({
      skierId: score.skier.id,
      name: score.skier.name,
      nation: score.skier.nation,
      reason: reasonFor(score, input.discipline, disciplineRank.get(score.skier.id) ?? null),
    }));
}

function reasonFor(score: Score, discipline: string, disciplinePlace: number | null): string {
  const parts: string[] = [];
  if (score.venuePosition != null) parts.push(`${ordinal(score.venuePosition)} here last year`);
  const event = disciplineName[discipline] ?? "this discipline";
  if (disciplinePlace === 1) parts.push(`leading ${event} this season`);
  else if (disciplinePlace != null) parts.push(`${ordinal(disciplinePlace)} in ${event} this season`);
  else if (score.otherPoints > 0) parts.push("scoring in other disciplines this season");
  return parts.join(" · ");
}

function ordinal(position: number): string {
  if (position === 1) return "1st";
  if (position === 2) return "2nd";
  if (position === 3) return "3rd";
  return `${position}th`;
}
