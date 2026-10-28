import { useEffect, useState } from "react";
import { api } from "../api";
import { formatRaceDate } from "../format";
import { useI18n, type Lang } from "../i18n";
import type { Discipline, Gender } from "../types";

type ActivityItem = {
  id: number;
  at: string;
  nickname: string;
  kind: "bet" | "settings" | "group";
  place: string;
  discipline: Discipline | "";
  gender: Gender | "";
  raceDate: string;
  action: string;
  group: string;
  member: string;
};

export function ActivityPanel() {
  const { t, lang } = useI18n();
  const [items, setItems] = useState<ActivityItem[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<{ activity: ActivityItem[] }>("/api/admin/activity")
      .then((result) => setItems(result.activity))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "couldNotLoad"));
  }, []);

  return (
    <section className="card stack">
      <h2>{t("sectionActivity")}</h2>
      {error ? <p className="alert">{t(error)}</p> : null}
      {items && items.length === 0 ? <p className="empty">{t("activityEmpty")}</p> : null}
      {items?.map((item) => (
        <p className="activity-line" key={item.id}>
          <span className="meta">{formatActivityTime(item.at, lang)}</span>
          <span>{line(item, t, lang)}</span>
        </p>
      ))}
    </section>
  );
}

function line(item: ActivityItem, t: (key: string, vars?: Record<string, string | number>) => string, lang: Lang) {
  if (item.kind === "bet") {
    return t("activityBet", {
      name: item.nickname,
      place: item.place,
      discipline: item.discipline ? t(`discipline_${item.discipline}`) : "",
      gender: item.gender ? t(`gender_${item.gender}`) : "",
      date: item.raceDate ? formatRaceDate(item.raceDate, lang) : "",
    });
  }
  if (item.kind === "settings") return t("activitySettings", { name: item.nickname });
  const vars = { name: item.nickname, group: item.group, member: item.member };
  if (item.action === "added") return t("activityGroupAdded", vars);
  if (item.action === "removed") return t("activityGroupRemoved", vars);
  if (item.action === "deleted") return t("activityGroupDeleted", vars);
  return t("activityGroupCreated", vars);
}

function formatActivityTime(value: string, lang: Lang): string {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/);
  if (!match) return value;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]), Number(match[4]), Number(match[5])));
  return new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(date);
}
