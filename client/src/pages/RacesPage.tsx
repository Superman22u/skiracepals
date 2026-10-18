import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth";
import { formatRaceDate, lastSeasonFis, monthLabel, thisSeasonFis } from "../format";
import { useI18n } from "../i18n";
import { MailPanel } from "./MailPanel";
import { NewsPanel } from "./NewsPanel";
import type { Discipline, Gender, RaceSummary } from "../types";

const disciplines: Discipline[] = ["DH", "SG", "GS", "SL", "AC"];

export function RacesPage() {
  const { user, refresh } = useAuth();
  const { t, lang } = useI18n();
  const [races, setRaces] = useState<RaceSummary[] | null>(null);
  const [error, setError] = useState("");
  const [gender, setGender] = useState<Gender | "all">("all");
  const [openOnly, setOpenOnly] = useState(true);
  const [place, setPlace] = useState("");
  const [discipline, setDiscipline] = useState<Discipline>("SL");
  const [raceGender, setRaceGender] = useState<Gender>("W");
  const [raceDate, setRaceDate] = useState("");
  const [formError, setFormError] = useState("");

  async function load() {
    setRaces(await api<RaceSummary[]>("/api/races"));
    await refresh();
  }

  useEffect(() => {
    load().catch((err: unknown) => setError(err instanceof Error ? err.message : "couldNotLoadRaces"));
  }, []);

  const visible = useMemo(() => {
    return (races ?? []).filter((race) => {
      if (gender !== "all" && race.gender !== gender) return false;
      if (openOnly && !race.bettingOpen) return false;
      return true;
    });
  }, [races, gender, openOnly]);

  const groups = useMemo(() => {
    const map = new Map<string, RaceSummary[]>();
    for (const race of visible) {
      const key = race.raceDate.slice(0, 7);
      map.set(key, [...(map.get(key) ?? []), race]);
    }
    return [...map.entries()];
  }, [visible]);

  async function addRace(event: FormEvent) {
    event.preventDefault();
    setFormError("");
    try {
      await api("/api/admin/races", {
        method: "POST",
        body: JSON.stringify({ place, discipline, gender: raceGender, raceDate }),
      });
      setPlace("");
      setRaceDate("");
      await load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "couldNotAddRace");
    }
  }

  if (error) return <p className="alert">{t(error)}</p>;
  if (!races) return <p className="muted">{t("loadingRaces")}</p>;

  const openCount = races.filter((race) => race.bettingOpen).length;

  return (
    <div className="stack">
      <NewsPanel />
      <p className="rule">{t("ruleRaces")}</p>
      <p className="rule">{t("startListNote")}</p>
      {user.isAdmin ? <MailPanel variant="races" /> : null}
      <div className="filters">
        {(["all", "W", "M"] as const).map((value) => (
          <button key={value} className={gender === value ? "chip on" : "chip"} onClick={() => setGender(value)} type="button">
            {value === "all" ? t("all") : t(`gender_${value}`)}
          </button>
        ))}
        <button className={openOnly ? "chip on" : "chip"} onClick={() => setOpenOnly((value) => !value)} type="button">
          {openOnly ? t("openOnly") : t("fullSeason")}
        </button>
      </div>
      <p className="muted">{t("racesOpen", { count: openCount })}</p>
      <p className="fine">
        <a href={thisSeasonFis} target="_blank" rel="noreferrer">
          {t("thisSeasonFis")}
        </a>
      </p>
      <p className="fine">
        <a href={lastSeasonFis} target="_blank" rel="noreferrer">
          {t("lastSeasonFis")}
        </a>
      </p>
      {groups.length === 0 ? <p className="card empty">{t("noRaces")}</p> : null}
      {groups.map(([month, items]) => (
        <section key={month} className="stack">
          <h2>{monthLabel(`${month}-01`, lang)}</h2>
          {items.map((race) => (
            <div key={race.id} className="card race">
              <Link className="race-main" to={`/races/${race.id}`}>
                <div>
                  <p className="place">{race.place}</p>
                  <p className="meta">
                    {t(`discipline_${race.discipline}`)} · {t(`gender_${race.gender}`)}
                  </p>
                  <p className="meta">{formatRaceDate(race.raceDate, lang)}</p>
                </div>
                <div className="race-side">
                  <span className={race.hasResults ? "pill scored" : race.bettingOpen ? "pill open" : "pill closed"}>
                    {race.hasResults ? t("result") : race.bettingOpen ? t("open") : t("closed")}
                  </span>
                  <strong>
                    {race.points != null ? t("pointsShort", { points: race.points }) : race.hasBet ? t("betIn") : t("noBet")}
                  </strong>
                </div>
              </Link>
              {race.lastYearUrl ? (
                <a className="year-link" href={race.lastYearUrl} target="_blank" rel="noreferrer">
                  {t("lastYearResult")}
                  {race.lastYearWinner ? ` · ${t("wonBy", { winner: race.lastYearWinner })}` : ""}
                </a>
              ) : null}
            </div>
          ))}
        </section>
      ))}
      {user.isAdmin ? (
        <form className="card form" onSubmit={addRace}>
          <h2>{t("addARace")}</h2>
          <label>
            {t("place")}
            <input value={place} onChange={(event) => setPlace(event.target.value)} required />
          </label>
          <label>
            {t("discipline")}
            <select value={discipline} onChange={(event) => setDiscipline(event.target.value as Discipline)}>
              {disciplines.map((code) => (
                <option key={code} value={code}>
                  {t(`discipline_${code}`)}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t("field")}
            <select value={raceGender} onChange={(event) => setRaceGender(event.target.value as Gender)}>
              <option value="W">{t("gender_W")}</option>
              <option value="M">{t("gender_M")}</option>
            </select>
          </label>
          <label>
            {t("date")}
            <input type="date" value={raceDate} onChange={(event) => setRaceDate(event.target.value)} required />
          </label>
          {formError ? <p className="alert">{t(formError)}</p> : null}
          <button className="primary" type="submit">
            {t("addRace")}
          </button>
        </form>
      ) : null}
      <p className="fine">
        {t("calendarNote")}{" "}
        <a href={thisSeasonFis} target="_blank" rel="noreferrer">
          {t("fisWorldCup")}
        </a>
        {t("calendarClose")}
      </p>
    </div>
  );
}
