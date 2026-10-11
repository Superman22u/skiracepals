import assert from "node:assert/strict";
import test from "node:test";
import { nameKey, placeKey } from "./names";
import { suggestTopFive, type SkierRef } from "./suggest";

const skiers: SkierRef[] = [
  { id: 1, name: "Mikaela Shiffrin", nation: "USA" },
  { id: 2, name: "Julia Scheib", nation: "AUT" },
  { id: 3, name: "Paula Moltzan", nation: "USA" },
  { id: 4, name: "Lara Gut-Behrami", nation: "SUI" },
  { id: 5, name: "Lena Dürr", nation: "GER" },
];

test("place and name keys line up with FIS spellings", () => {
  assert.equal(placeKey("Copper Mountain, CO"), "copper mountain");
  assert.equal(placeKey("Val d'Isere"), placeKey("Val d’Isere"));
  assert.equal(placeKey("Garmisch-Partenkirchen"), placeKey("Garmisch Partenkirchen"));
  assert.equal(nameKey("SHIFFRIN Mikaela"), nameKey("Mikaela Shiffrin"));
  assert.equal(nameKey("GUT-BEHRAMI Lara"), nameKey("Lara Gut-Behrami"));
  assert.equal(nameKey("DUERR Lena"), nameKey("Lena Dürr"));
});

test("last year's finish order is the suggestion when this season has no results", () => {
  const picks = suggestTopFive({
    discipline: "GS",
    skiers,
    venue: [
      { name: "Julia Scheib", nation: "AUT", position: 1 },
      { name: "Paula Moltzan", nation: "USA", position: 2 },
      { name: "SHIFFRIN Mikaela", nation: "USA", position: 4 },
    ],
    season: [],
  });
  assert.deepEqual(
    picks.map((pick) => pick.name),
    ["Julia Scheib", "Paula Moltzan", "Mikaela Shiffrin"],
  );
  assert.match(picks[0].reason, /1st here last year/);
});

test("this season's discipline results can outrank a weaker last-year finish", () => {
  const picks = suggestTopFive({
    discipline: "GS",
    skiers,
    venue: [
      { name: "Julia Scheib", nation: "AUT", position: 1 },
      { name: "Mikaela Shiffrin", nation: "USA", position: 5 },
    ],
    season: [
      { skierId: 1, discipline: "GS", position: 1 },
      { skierId: 1, discipline: "GS", position: 1 },
      { skierId: 4, discipline: "SG", position: 1 },
    ],
  });
  assert.equal(picks[0].name, "Mikaela Shiffrin");
  assert.match(picks[0].reason, /leading giant slalom this season/);
  assert.equal(picks.find((pick) => pick.name === "Lara Gut-Behrami")?.reason, "scoring in other disciplines this season");
});

test("a last-year winner who is not on the start list is left out", () => {
  const picks = suggestTopFive({
    discipline: "SL",
    skiers,
    venue: [
      { name: "Somebody New", nation: "NOR", position: 1 },
      { name: "Mikaela Shiffrin", nation: "USA", position: 2 },
    ],
    season: [],
  });
  assert.deepEqual(
    picks.map((pick) => pick.skierId),
    [1],
  );
});
