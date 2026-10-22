/**
 * A picked skier who finishes in the top 5 scores 1 point.
 * If that skier also finishes in the predicted rank, the pick scores 3 points.
 * The exact rank replaces the 1 point. It is not added on top.
 */
export function scorePick(predicted: number, actual: number | null): number {
  if (actual == null || actual < 1 || actual > 5) return 0;
  if (actual === predicted) return 3;
  return 1;
}

export type PickScoreRow = {
  userId: number;
  nickname: string;
  raceId: number;
  place: string;
  discipline: string;
  gender: "W" | "M";
  raceDate: string;
  predicted: number;
  actual: number | null;
  hasResults: boolean;
};

export type RankedUser = {
  userId: number;
  nickname: string;
  points: number;
  exact: number;
  topFive: number;
  rank: number;
};

export type RaceScore = {
  raceId: number;
  place: string;
  discipline: string;
  gender: "W" | "M";
  raceDate: string;
  points: number;
  pending: boolean;
};

export function rankUsers(rows: PickScoreRow[], include: { userId: number; nickname: string }[] = []): RankedUser[] {
  const map = new Map<number, RankedUser>();
  for (const member of include) {
    map.set(member.userId, {
      userId: member.userId,
      nickname: member.nickname,
      points: 0,
      exact: 0,
      topFive: 0,
      rank: 0,
    });
  }
  for (const row of rows) {
    let user = map.get(row.userId);
    if (!user) {
      user = { userId: row.userId, nickname: row.nickname, points: 0, exact: 0, topFive: 0, rank: 0 };
      map.set(row.userId, user);
    }
    if (!row.hasResults) continue;
    const points = scorePick(row.predicted, row.actual);
    user.points += points;
    if (points === 3) user.exact += 1;
    if (points > 0) user.topFive += 1;
  }

  const list = [...map.values()].sort(
    (a, b) => b.points - a.points || b.exact - a.exact || a.nickname.localeCompare(b.nickname),
  );
  let rank = 0;
  list.forEach((user, index) => {
    const previous = list[index - 1];
    if (!previous || previous.points !== user.points || previous.exact !== user.exact) rank = index + 1;
    user.rank = rank;
  });
  return list;
}

export function raceScoresFor(rows: PickScoreRow[], userId: number): RaceScore[] {
  const map = new Map<number, RaceScore>();
  for (const row of rows) {
    if (row.userId !== userId) continue;
    let race = map.get(row.raceId);
    if (!race) {
      race = {
        raceId: row.raceId,
        place: row.place,
        discipline: row.discipline,
        gender: row.gender,
        raceDate: row.raceDate,
        points: 0,
        pending: !row.hasResults,
      };
      map.set(row.raceId, race);
    }
    if (row.hasResults) race.points += scorePick(row.predicted, row.actual);
  }
  return [...map.values()].sort((a, b) => a.raceDate.localeCompare(b.raceDate) || a.raceId - b.raceId);
}

export function totalPoints(rows: PickScoreRow[], userId: number): number {
  return raceScoresFor(rows, userId).reduce((sum, race) => sum + (race.pending ? 0 : race.points), 0);
}
