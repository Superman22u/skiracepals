import assert from "node:assert/strict";
import test from "node:test";
import { addCalendarDays, isReminderWindow } from "./dates";

test("a reminder covers the next two days, and not race day", () => {
  assert.equal(addCalendarDays("2026-10-17", 2), "2026-10-19");
  assert.equal(addCalendarDays("2026-10-31", 2), "2026-11-02");
  assert.equal(isReminderWindow("2026-10-17", "2026-10-17"), false);
  assert.equal(isReminderWindow("2026-10-18", "2026-10-17"), true);
  assert.equal(isReminderWindow("2026-10-19", "2026-10-17"), true);
  assert.equal(isReminderWindow("2026-10-20", "2026-10-17"), false);
});
