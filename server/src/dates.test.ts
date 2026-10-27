import assert from "node:assert/strict";
import test from "node:test";
import { addCalendarDays, isAfterCloseFill, isBetDue, isBettingOpen, isDayBeforeFill, isRemindHours, isReminderWindow, zurichInstant } from "./dates";

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

test("24 hours before 09:30 fills a missing bet, and 09:30 is after the close", () => {
  assert.equal(zurichInstant("2026-07-15", 9, 30).toISOString(), "2026-07-15T07:30:00.000Z");
  assert.equal(zurichInstant("2026-10-27", 9, 30).toISOString(), "2026-10-27T08:30:00.000Z");
  const before = new Date("2026-10-26T08:29:00Z");
  const open = new Date("2026-10-26T08:30:00Z");
  const stillOpen = new Date("2026-10-27T08:29:00Z");
  const closed = new Date("2026-10-27T08:30:00Z");
  assert.equal(isDayBeforeFill("2026-10-27", before), false);
  assert.equal(isDayBeforeFill("2026-10-27", open), true);
  assert.equal(isDayBeforeFill("2026-10-27", stillOpen), true);
  assert.equal(isDayBeforeFill("2026-10-27", closed), false);
  assert.equal(isAfterCloseFill("2026-10-27", stillOpen), false);
  assert.equal(isAfterCloseFill("2026-10-27", closed), true);
  assert.equal(isAfterCloseFill("2026-10-28", closed), false);
});

test("the 48-hour reminder ends when the 24-hour reminder starts", () => {
  const early = new Date("2026-10-26T08:29:00Z");
  const at48 = new Date("2026-10-26T08:30:00Z");
  const at24 = new Date("2026-10-27T08:30:00Z");
  assert.equal(isRemindHours("2026-10-28", 48, early), false);
  assert.equal(isRemindHours("2026-10-28", 48, at48), true);
  assert.equal(isRemindHours("2026-10-28", 24, at48), false);
  assert.equal(isRemindHours("2026-10-28", 48, at24), false);
  assert.equal(isRemindHours("2026-10-28", 24, at24), true);
});

test("a reminder covers the next two days, and not race day", () => {
  assert.equal(addCalendarDays("2026-10-17", 2), "2026-10-19");
  assert.equal(addCalendarDays("2026-10-31", 2), "2026-11-02");
  assert.equal(isReminderWindow("2026-10-17", "2026-10-17"), false);
  assert.equal(isReminderWindow("2026-10-18", "2026-10-17"), true);
  assert.equal(isReminderWindow("2026-10-19", "2026-10-17"), true);
  assert.equal(isReminderWindow("2026-10-20", "2026-10-17"), false);
});
