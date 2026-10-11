import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth";
import { disciplineLabel, formatRaceDate, genderLabel, lastSeasonFis, monthLabel } from "../format";
import type { Discipline, Gender, RaceSummary } from "../types";

export function RacesPage() {
  const { user, refresh } = useAuth();
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
    load().catch((err: unknown) => setError(err instanceof Error ? err.message : "Could not load races"));
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
      setFormError(err instanceof Error ? err.message : "Could not add the race");
    }
  }

  if (error) return <p className="alert">{error}</p>;
  if (!races) return <p className="muted">Loading races…</p>;

  const openCount = races.filter((race) => race.bettingOpen).length;

  return (
    <div className="stack">
      <p className="rule">
        Name the first five before race day. A top-5 skier scores 1. The correct rank scores 3.
      </p>
      <div className="filters">
        {(["all", "W", "M"] as const).map((value) => (
          <button key={value} className={gender === value ? "chip on" : "chip"} onClick={() => setGender(value)} type="button">
            {value === "all" ? "All" : genderLabel[value]}
          </button>
        ))}
        <button className={openOnly ? "chip on" : "chip"} onClick={() => setOpenOnly((value) => !value)} type="button">
          {openOnly ? "Open only" : "Full season"}
        </button>
      </div>
      <p className="muted">{openCount} races still open</p>
      <p className="fine">
        <a href={lastSeasonFis} target="_blank" rel="noreferrer">
          Last season's races and results on FIS
        </a>
      </p>
      {groups.length === 0 ? <p className="card empty">No races in this view.</p> : null}
      {groups.map(([month, items]) => (
        <section key={month} className="stack">
          <h2>{monthLabel(`${month}-01`)}</h2>
          {items.map((race) => (
            <div key={race.id} className="card race">
              <Link className="race-main" to={`/races/${race.id}`}>
                <div>
                  <p className="place">{race.place}</p>
                  <p className="meta">
                    {disciplineLabel[race.discipline]} · {genderLabel[race.gender]}
                  </p>
                  <p className="meta">{formatRaceDate(race.raceDate)}</p>
                </div>
                <div className="race-side">
                  <span className={race.hasResults ? "pill scored" : race.bettingOpen ? "pill open" : "pill closed"}>
                    {race.hasResults ? "Result" : race.bettingOpen ? "Open" : "Closed"}
                  </span>
                  <strong>{race.points != null ? `${race.points} pts` : race.hasBet ? "Bet in" : "No bet"}</strong>
                </div>
              </Link>
              {race.lastYearUrl ? (
                <a className="year-link" href={race.lastYearUrl} target="_blank" rel="noreferrer">
                  Last year's result{race.lastYearWinner ? ` · ${race.lastYearWinner}` : ""}
                </a>
              ) : null}
            </div>
          ))}
        </section>
      ))}
      {user.isAdmin ? (
        <form className="card form" onSubmit={addRace}>
          <h2>Add a race</h2>
          <label>
            Place
            <input value={place} onChange={(event) => setPlace(event.target.value)} required />
          </label>
          <label>
            Discipline
            <select value={discipline} onChange={(event) => setDiscipline(event.target.value as Discipline)}>
              {Object.entries(disciplineLabel).map(([code, label]) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Field
            <select value={raceGender} onChange={(event) => setRaceGender(event.target.value as Gender)}>
              <option value="W">Women</option>
              <option value="M">Men</option>
            </select>
          </label>
          <label>
            Date
            <input type="date" value={raceDate} onChange={(event) => setRaceDate(event.target.value)} required />
          </label>
          {formError ? <p className="alert">{formError}</p> : null}
          <button className="primary" type="submit">
            Add race
          </button>
        </form>
      ) : null}
      <p className="fine">
        Calendar from the{" "}
        <a href="https://www.fis-ski.com/DB/alpine-skiing/calendar-results.html?sectorcode=AL&seasoncode=2027&categorycode=WC">
          FIS alpine World Cup
        </a>
        . Betting closes at the start of race day, Europe/Zurich.
      </p>
    </div>
  );
}
