import assert from "node:assert/strict";
import test from "node:test";
import { addCalendarDays, isBetDue, isBettingOpen, isReminderWindow } from "./dates";

test("betting closes at 09:30 Zurich on race day, including in summer time", () => {
  assert.equal(isBettingOpen("2026-07-15", new Date("2026-07-15T07:29:00Z")), true);
  assert.equal(isBettingOpen("2026-07-15", new Date("2026-07-15T07:30:00Z")), false);
});

test("a missing bet is marked due through the next two days", () => {
  const morning = new Date("2026-10-23T07:29:00Z");
  const noon = new Date("2026-10-23T10:00:00Z");
  assert.equal(isBetDue("2026-10-23", false, morning), true);
  assert.equal(isBetDue("2026-10-23", false, noon), false);
  assert.equal(isBetDue("2026-10-24", false, noon), true);
  assert.equal(isBetDue("2026-10-25", false, noon), true);
  assert.equal(isBetDue("2026-10-26", false, noon), false);
  assert.equal(isBetDue("2026-10-24", true, noon), false);
});

test("a reminder covers the next two days, and not race day", () => {
  assert.equal(addCalendarDays("2026-10-17", 2), "2026-10-19");
  assert.equal(addCalendarDays("2026-10-31", 2), "2026-11-02");
  assert.equal(isReminderWindow("2026-10-17", "2026-10-17"), false);
  assert.equal(isReminderWindow("2026-10-18", "2026-10-17"), true);
  assert.equal(isReminderWindow("2026-10-19", "2026-10-17"), true);
  assert.equal(isReminderWindow("2026-10-20", "2026-10-17"), false);
});
