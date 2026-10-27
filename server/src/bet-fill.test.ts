import assert from "node:assert/strict";
import test from "node:test";
import { topFiveOnStartList, topFiveResults } from "./bet-fill";

const finishes = [
  { skierId: 1, position: 1 },
  { skierId: 2, position: 2 },
  { skierId: 3, position: 3 },
  { skierId: 4, position: 4 },
  { skierId: 5, position: 5 },
  { skierId: 6, position: 6 },
  { skierId: 7, position: 7 },
];

test("the day-before fill uses places 1 to 5", () => {
  assert.deepEqual(topFiveResults(finishes), [1, 2, 3, 4, 5]);
  assert.equal(topFiveResults(finishes.filter((finish) => finish.position !== 3)), null);
});

test("the late fill keeps the best finishers who are on the start list", () => {
  assert.deepEqual(topFiveOnStartList(finishes, [1, 3, 6, 7, 4]), [1, 3, 4, 6, 7]);
  assert.equal(topFiveOnStartList(finishes, [1, 2, 3]), null);
});
