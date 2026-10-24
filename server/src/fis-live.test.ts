import assert from "node:assert/strict";
import test from "node:test";
import { fisLiveCodex, parseFisDraw, StartListError } from "./fis-live";

const sample = `<lt>s:6:"racers";a:3:{i:0;a:7:{i:0;i:56416;i:1;s:6:"SCHEIB";i:2;s:5:"Julia";i:3;s:3:"AUT";i:4;s:0:"";i:5;s:0:"";i:6;s:0:"";}i:1;a:7:{i:0;i:298323;i:1;s:6:"GOGGIA";i:2;s:5:"Sofia";i:3;s:3:"ITA";i:4;s:0:"";i:5;s:0:"";i:6;s:0:"";}i:2;a:7:{i:0;i:6537917;i:1;s:7:"O'BRIEN";i:2;s:4:"Nina";i:3;s:3:"USA";i:4;s:0:"";i:5;s:0:"";i:6;s:0:"";}}s:10:"discipline";s:2:"GS";s:6:"gender";s:1:"W";s:9:"startlist";a:1:{s:1:"D";a:1:{i:0;a:1:{i:0;a:2:{i:0;a:4:{i:0;i:56416;i:1;i:56416;i:2;s:0:"";i:3;s:0:"";}i:1;a:4:{i:0;i:6537917;i:1;i:6537917;i:2;s:0:"";i:3;s:0:"";}}}}}s:7:"message";s:4:"draw";</lt>`;

test("a FIS live link selects the race codex", () => {
  assert.equal(fisLiveCodex("https://live.fis-ski.com/lv-al5001.htm#/follow"), "al5001");
  assert.equal(fisLiveCodex("https://live.fis-ski.com/lv-al5001.htm#/draw/participants"), "al5001");
  assert.throws(() => fisLiveCodex("https://example.com/lv-al5001.htm"), StartListError);
});

test("the draw is the start list, in order, with nation codes", () => {
  const draw = parseFisDraw(sample);
  assert.equal(draw.gender, "W");
  assert.equal(draw.discipline, "GS");
  assert.deepEqual(draw.starters, [
    { name: "Julia Scheib", nation: "AUT" },
    { name: "Nina O'Brien", nation: "USA" },
  ]);
});
