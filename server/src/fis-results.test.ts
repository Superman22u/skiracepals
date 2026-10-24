import assert from "node:assert/strict";
import test from "node:test";
import { StartListError } from "./fis-live";
import { parseFisResultsPage } from "./fis-results";

const page = `
<div class="event-header__kind">Women's Giant Slalom</div>
<h3 class="heading heading_l3">start list</h3>
<a class="table-row" href="/bio">
  <div class="athlete-name">ROBINSON Alice</div>
  <span class="country__name-short">NZL</span>
</a>
<a class="table-row" href="/bio">
  <div class="athlete-name">HURT A J</div>
  <span class="country__name-short">USA</span>
</a>
<a class="table-row" href="/bio">
  <div class="athlete-name">DELLA MEA Lara</div>
  <span class="country__name-short">ITA</span>
</a>
<a class="table-row" href="/bio">
  <div class="athlete-name">O'BRIEN Nina</div>
  <span class="country__name-short">USA</span>
</a>
`;

test("the official race page is the start list, in bib order", () => {
  const list = parseFisResultsPage(page);
  assert.equal(list.gender, "W");
  assert.equal(list.discipline, "GS");
  assert.deepEqual(list.starters, [
    { name: "Alice Robinson", nation: "NZL" },
    { name: "A J Hurt", nation: "USA" },
    { name: "Lara della Mea", nation: "ITA" },
    { name: "Nina O'Brien", nation: "USA" },
  ]);
});

test("a results page without a start list is left alone", () => {
  assert.throws(() => parseFisResultsPage("<h3>Results</h3>"), (error: unknown) => {
    assert.ok(error instanceof StartListError);
    assert.equal((error as StartListError).message, "The official start list is not on the FIS page yet");
    return true;
  });
});
