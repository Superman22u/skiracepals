import { useEffect, useState } from "react";
import { api } from "../api";
import { formatRaceDate } from "../format";
import { useI18n } from "../i18n";
import { outlookMail } from "../mail";
import type { Discipline, Gender } from "../types";

type Person = { nickname: string; email: string };

type UpcomingRace = {
  id: number;
  place: string;
  discipline: Discipline;
  gender: Gender;
  raceDate: string;
  missing: Person[];
};

type MailList = {
  participants: Person[];
  upcoming: UpcomingRace[];
};

export function MailPanel({ variant = "account" }: { variant?: "account" | "races" }) {
  const { t, lang } = useI18n();
  const [list, setList] = useState<MailList | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<MailList>("/api/admin/mail")
      .then(setList)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "couldNotLoadMail"));
  }, []);

  if (error) return <p className="alert">{t(error)}</p>;
  if (!list) return null;

  const missing = list.upcoming.flatMap((race) => race.missing);
  const raceLines = list.upcoming
    .map(
      (race) =>
        `${race.place}, ${t(`discipline_${race.discipline}`)}, ${t(`gender_${race.gender}`)}, ${formatRaceDate(race.raceDate, lang)}`,
    )
    .join("\n");
  const remindHref = outlookMail(
    missing.map((person) => person.email),
    t("mailSubjectRemind"),
    t("mailBodyRemind", { races: raceLines }),
  );
  const allHref = outlookMail(
    list.participants.map((person) => person.email),
    t("mailSubjectAll"),
    t("mailBodyAll"),
  );

  if (variant === "races") {
    if (missing.length === 0) return null;
    return (
      <section className="card stack">
        <h2>{t("mailSoon")}</h2>
        <p className="muted">{t("mailRemindHelp")}</p>
        <Upcoming list={list.upcoming} />
        <a className="primary" href={remindHref}>
          {t("mailRemind")}
        </a>
      </section>
    );
  }

  return (
    <section className="stack">
      <h2>{t("mailTitle")}</h2>
      <div className="card stack">
        <p className="muted">{t("mailAllHelp")}</p>
        {list.participants.length > 0 ? (
          <a className="primary" href={allHref}>
            {t("mailAll")}
          </a>
        ) : (
          <p className="muted">{t("noOtherAccounts")}</p>
        )}
      </div>
      <div className="card stack">
        <p className="eyebrow">{t("mailSoon")}</p>
        <p className="muted">{t("mailRemindHelp")}</p>
        {list.upcoming.length === 0 ? <p className="muted">{t("mailNoneSoon")}</p> : <Upcoming list={list.upcoming} />}
        {missing.length > 0 ? (
          <a className="primary" href={remindHref}>
            {t("mailRemind")}
          </a>
        ) : list.upcoming.length > 0 ? (
          <p className="muted">{t("mailEveryoneBet")}</p>
        ) : null}
      </div>
    </section>
  );
}

function Upcoming({ list }: { list: UpcomingRace[] }) {
  const { t, lang } = useI18n();
  return (
    <>
      {list.map((race) => (
        <div key={race.id}>
          <p className="place">{race.place}</p>
          <p className="meta">
            {t(`discipline_${race.discipline}`)} · {t(`gender_${race.gender}`)} · {formatRaceDate(race.raceDate, lang)}
          </p>
          <p className="meta">
            {race.missing.length === 0
              ? t("mailEveryoneBet")
              : `${t("mailMissing")}: ${race.missing.map((person) => person.nickname).join(", ")}`}
          </p>
        </div>
      ))}
    </>
  );
}
