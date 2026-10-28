import assert from "node:assert/strict";
import test from "node:test";
import { rankField, standingsList } from "./discipline-rank";

const field = [
  { id: 1, name: "Mikaela Shiffrin", nation: "USA", gender: "W" as const },
  { id: 2, name: "Lara Gut-Behrami", nation: "SUI", gender: "W" as const },
  { id: 3, name: "Paula Moltzan", nation: "USA", gender: "W" as const },
  { id: 4, name: "Zrinka Ljutic", nation: "CRO", gender: "W" as const },
];

test("last season's finishes in the discipline order the field", () => {
  const ranked = rankField({
    skiers: field,
    lastYear: [
      { name: "GUT-BEHRAMI Lara", nation: "SUI", position: 1 },
      { name: "SHIFFRIN Mikaela", nation: "USA", position: 2 },
      { name: "MOLTZAN Paula", nation: "USA", position: 5 },
    ],
    season: [],
  });
  assert.deepEqual(
    ranked.map((skier) => [skier.name, skier.rank, skier.rankNote]),
    [
      ["Lara Gut-Behrami", 1, "last season"],
      ["Mikaela Shiffrin", 2, "last season"],
      ["Paula Moltzan", 3, "last season"],
      ["Zrinka Ljutic", null, null],
    ],
  );
});

test("this season's results lead, and equal points share a rank", () => {
  const ranked = rankField({
    skiers: field,
    lastYear: [{ name: "Lara Gut-Behrami", nation: "SUI", position: 1 }],
    season: [
      { skierId: 1, position: 1 },
      { skierId: 3, position: 1 },
    ],
  });
  assert.equal(ranked[0].rank, 1);
  assert.equal(ranked[1].rank, 1);
  assert.equal(ranked[0].rankNote, "this season");
  assert.equal(ranked[1].rankNote, "this season");
  assert.equal(ranked[2].name, "Lara Gut-Behrami");
  assert.equal(ranked[2].rankNote, "last season");
  assert.equal(standingsList(ranked)?.source, "this season");
  assert.deepEqual(
    standingsList(ranked)?.rows.map((skier) => skier.name),
    [ranked[0].name, ranked[1].name],
  );
});

test("with no result this season, the list is last season only", () => {
  const ranked = rankField({
    skiers: field,
    lastYear: [
      { name: "Mikaela Shiffrin", nation: "USA", position: 1 },
      { name: "Lara Gut-Behrami", nation: "SUI", position: 2 },
    ],
    season: [],
  });
  const list = standingsList(ranked);
  assert.equal(list?.source, "last season");
  assert.deepEqual(
    list?.rows.map((skier) => skier.name),
    ["Mikaela Shiffrin", "Lara Gut-Behrami"],
  );
});
