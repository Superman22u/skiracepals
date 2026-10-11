import assert from "node:assert/strict";
import test from "node:test";
import { isBettingOpen, zurichToday } from "./dates";
import { rankUsers, scorePick, type PickScoreRow } from "./scoring";

test("exact rank scores 3 and a top-5 skier in the wrong rank scores 1", () => {
  assert.equal(scorePick(1, 1), 3);
  assert.equal(scorePick(2, 5), 1);
  assert.equal(scorePick(3, 6), 0);
  assert.equal(scorePick(4, null), 0);
});

test("betting closes on the race day in Zurich", () => {
  assert.equal(isBettingOpen("2026-11-14", "2026-11-13"), true);
  assert.equal(isBettingOpen("2026-11-14", "2026-11-14"), false);
  assert.equal(isBettingOpen("2026-11-14", "2026-11-15"), false);
  assert.equal(zurichToday(new Date("2026-11-13T23:30:00Z")), "2026-11-14");
  assert.equal(zurichToday(new Date("2026-11-13T22:30:00Z")), "2026-11-13");
});

test("ranking uses points, then exact hits, and shares a tie", () => {
  const rows: PickScoreRow[] = [
    row(1, "ada", 1, 1, true),
    row(2, "bea", 1, 2, true),
    row(2, "bea", 2, 1, true),
    row(3, "cio", 1, null, false),
  ];
  const ranked = rankUsers(rows);
  assert.deepEqual(
    ranked.map((user) => [user.nickname, user.rank, user.points, user.exact]),
    [
      ["ada", 1, 3, 1],
      ["bea", 2, 2, 0],
      ["cio", 3, 0, 0],
    ],
  );
});

function row(
  userId: number,
  nickname: string,
  predicted: number,
  actual: number | null,
  hasResults: boolean,
): PickScoreRow {
  return {
    userId,
    nickname,
    raceId: 1,
    place: "Levi",
    discipline: "SL",
    gender: "W",
    raceDate: "2026-11-14",
    predicted,
    actual,
    hasResults,
  };
}
