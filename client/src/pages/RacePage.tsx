import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth";
import { formatRaceDate, lastSeasonFis, rankLabel, translateReason } from "../format";
import { useI18n } from "../i18n";
import type { Discipline, Gender, RaceDetail, Skier } from "../types";

const disciplines: Discipline[] = ["DH", "SG", "GS", "SL", "AC"];

const emptySlots: (Skier | null)[] = [null, null, null, null, null];

export function RacePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, refresh } = useAuth();
  const { t, lang } = useI18n();
  const [race, setRace] = useState<RaceDetail | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [noticeName, setNoticeName] = useState("");
  const [slots, setSlots] = useState<(Skier | null)[]>(emptySlots);
  const [sheet, setSheet] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [skiers, setSkiers] = useState<Skier[]>([]);
  const [busy, setBusy] = useState(false);
  const [resultSlots, setResultSlots] = useState<(Skier | null)[]>(emptySlots);
  const [resultSheet, setResultSheet] = useState<number | null>(null);
  const [place, setPlace] = useState("");
  const [discipline, setDiscipline] = useState<Discipline>("SL");
  const [gender, setGender] = useState<Gender>("W");
  const [raceDate, setRaceDate] = useState("");
  const [skierName, setSkierName] = useState("");
  const [nation, setNation] = useState("");
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  async function load() {
    const next = await api<RaceDetail>(`/api/races/${id}`);
    setRace(next);
    setPlace(next.place);
    setDiscipline(next.discipline);
    setGender(next.gender);
    setRaceDate(next.raceDate);
    const picks: (Skier | null)[] = [null, null, null, null, null];
    for (const pick of next.picks) {
      picks[pick.position - 1] = { id: pick.skierId, name: pick.name, nation: pick.nation, gender: next.gender };
    }
    setSlots(picks);
    const results: (Skier | null)[] = [null, null, null, null, null];
    for (const result of next.results) {
      if (result.position >= 1 && result.position <= 5) {
        results[result.position - 1] = {
          id: result.skierId,
          name: result.name,
          nation: result.nation,
          gender: next.gender,
        };
      }
    }
    setResultSlots(results);
    const field = await api<Skier[]>(`/api/skiers?gender=${next.gender}&discipline=${next.discipline}`);
    setSkiers(field);
    await refresh();
  }

  useEffect(() => {
    load().catch((err: unknown) => setError(err instanceof Error ? err.message : "couldNotLoadRace"));
  }, [id]);

  const activeSheet = sheet ?? resultSheet;
  const activeSlots = sheet != null ? slots : resultSlots;
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const taken = new Set(activeSlots.filter(Boolean).map((skier) => skier!.id));
    const current = activeSheet != null ? activeSlots[activeSheet] : null;
    return skiers.filter((skier) => {
      if (taken.has(skier.id) && skier.id !== current?.id) return false;
      if (!term) return true;
      return `${skier.name} ${skier.nation}`.toLowerCase().includes(term);
    });
  }, [query, skiers, activeSlots, activeSheet]);

  function choose(skier: Skier) {
    if (sheet != null) {
      setSlots((current) => current.map((slot, index) => (index === sheet ? skier : slot)));
      setSheet(null);
    } else if (resultSheet != null) {
      setResultSlots((current) => current.map((slot, index) => (index === resultSheet ? skier : slot)));
      setResultSheet(null);
    }
    setQuery("");
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target > 4) return;
    setSlots((current) => {
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function applySuggestion() {
    if (!race?.suggestion?.length) return;
    const next: (Skier | null)[] = [null, null, null, null, null];
    race.suggestion.forEach((pick, index) => {
      next[index] = { id: pick.skierId, name: pick.name, nation: pick.nation, gender: race.gender };
    });
    setSlots(next);
    setNotice("suggestionFilled");
  }

  async function saveBet() {
    if (slots.some((slot) => !slot)) return;
    setBusy(true);
    setNotice("");
    setError("");
    try {
      await api(`/api/races/${id}/bet`, {
        method: "PUT",
        body: JSON.stringify({
          picks: slots.map((skier, index) => ({ skierId: skier!.id, position: index + 1 })),
        }),
      });
      setNotice("betSaved");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "couldNotSaveBet");
    } finally {
      setBusy(false);
    }
  }

  async function saveResults(finishes: { skierId: number; position: number }[]) {
    setBusy(true);
    setNotice("");
    setError("");
    try {
      await api(`/api/admin/races/${id}/results`, {
        method: "PUT",
        body: JSON.stringify({ finishes }),
      });
      setNotice(finishes.length ? "resultSaved" : "resultCleared");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "couldNotSaveResult");
    } finally {
      setBusy(false);
    }
  }

  async function saveRace(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api(`/api/admin/races/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ place, discipline, gender, raceDate }),
      });
      setNotice("raceUpdated");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "couldNotUpdateRace");
    } finally {
      setBusy(false);
    }
  }

  async function removeRace() {
    setBusy(true);
    setError("");
    try {
      await api(`/api/admin/races/${id}`, { method: "DELETE" });
      await refresh();
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "couldNotDeleteRace");
      setBusy(false);
    }
  }

  async function addSkier(event: FormEvent) {
    event.preventDefault();
    setError("");
    try {
      const created = await api<Skier>("/api/admin/skiers", {
        method: "POST",
        body: JSON.stringify({ name: skierName, nation, gender: race?.gender }),
      });
      setSkiers((current) => [...current, { ...created, rank: null, rankNote: null }]);
      setSkierName("");
      setNation("");
      setNoticeName(created.name);
      setNotice("skierAdded");
    } catch (err) {
      setError(err instanceof Error ? err.message : "couldNotAddSkier");
    }
  }

  if (error && !race) return <p className="alert">{t(error)}</p>;
  if (!race) return <p className="muted">{t("loadingRace")}</p>;

  const resultPrefix = resultSlots.findIndex((slot) => !slot);
  const filledResults =
    resultPrefix === -1 ? resultSlots : resultPrefix === 0 ? [] : resultSlots.slice(0, resultPrefix);
  const resultGap = resultPrefix !== -1 && resultSlots.slice(resultPrefix + 1).some(Boolean);
  const leaders = skiers.filter((skier) => skier.rank != null).slice(0, 10);

  return (
    <div className="stack">
      <Link className="back" to="/">
        {t("allRaces")}
      </Link>
      <div className="card race-head">
        <p className="eyebrow">{formatRaceDate(race.raceDate, lang)}</p>
        <h2>{race.place}</h2>
        <p className="meta">
          {t(`discipline_${race.discipline}`)} · {t(`gender_${race.gender}`)}
        </p>
        <p className={race.bettingOpen ? "pill open" : "pill closed"}>
          {race.bettingOpen ? t("bettingOpen") : t("bettingClosed")}
        </p>
        {race.points != null ? <p className="big-points">{t("pointsShort", { points: race.points })}</p> : null}
      </div>
      <div className="links">
        {race.lastYear.map((item) => (
          <a key={item.url} href={item.url} target="_blank" rel="noreferrer">
            {t("lastYearResult")} · {formatRaceDate(item.raceDate, lang)}
            {item.winner ? ` · ${t("wonBy", { winner: item.winner })}` : ""}
          </a>
        ))}
        <a href={lastSeasonFis} target="_blank" rel="noreferrer">
          {t("allLastSeason")}
        </a>
      </div>
      {leaders.length > 0 ? (
        <section className="card disc-rank">
          <h2>{t("disciplineRanking", { discipline: t(`discipline_${race.discipline}`) })}</h2>
          <p className="muted">{t("disciplineRankHelp")}</p>
          <ol>
            {leaders.map((skier) => (
              <li key={skier.id}>
                <b>{skier.rank}</b>
                <span>
                  <strong>{skier.name}</strong>
                  <em>
                    {skier.nation} · {skier.rankNote === "last season" ? t("lastSeason") : t("thisSeason")}
                  </em>
                </span>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
      {notice ? <p className="note">{t(notice, { name: noticeName })}</p> : null}
      {error ? <p className="alert">{t(error)}</p> : null}

      <section className="stack">
        <h2>{t("yourFirstFive")}</h2>
        {race.bettingOpen ? (
          <>
            {slots.map((skier, index) => (
              <div className="slot" key={index}>
                <button className="slot-main" type="button" onClick={() => setSheet(index)}>
                  <span className="bib">{index + 1}</span>
                  {skier ? (
                    <span>
                      <strong>{skier.name}</strong>
                      <em>{skier.nation}</em>
                    </span>
                  ) : (
                    <span className="muted">{t("chooseRank", { rank: rankLabel(index + 1, lang) })}</span>
                  )}
                </button>
                <div className="slot-actions">
                  <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label={t("moveUp")}>
                    ↑
                  </button>
                  <button type="button" onClick={() => move(index, 1)} disabled={index === 4} aria-label={t("moveDown")}>
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => setSlots((current) => current.map((slot, slotIndex) => (slotIndex === index ? null : slot)))}
                    disabled={!skier}
                    aria-label={t("clear")}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
            <button className="primary" type="button" disabled={busy || slots.some((slot) => !slot)} onClick={saveBet}>
              {busy ? t("saving") : t("saveBet")}
            </button>
          </>
        ) : race.picks.length === 0 ? (
          <p className="card empty">{t("noBetOnRace")}</p>
        ) : (
          race.picks.map((pick) => (
            <div className="slot readonly" key={pick.position}>
              <span className="bib">{pick.position}</span>
              <span>
                <strong>{pick.name}</strong>
                <em>{pick.nation}</em>
                {race.hasResults ? (
                  <small>{pick.actual ? t("finished", { rank: rankLabel(pick.actual, lang) }) : t("outsideTop")}</small>
                ) : (
                  <small>{t("waitingResult")}</small>
                )}
              </span>
              {pick.points != null ? <b>{pick.points}</b> : null}
            </div>
          ))
        )}
      </section>

      {race.hasResults ? (
        <section className="stack">
          <h2>{t("officialTop")}</h2>
          {race.results.slice(0, 5).map((result) => (
            <div className="slot readonly" key={result.position}>
              <span className="bib">{result.position}</span>
              <span>
                <strong>{result.name}</strong>
                <em>{result.nation}</em>
              </span>
            </div>
          ))}
        </section>
      ) : null}

      {user.isAdmin ? (
        <section className="stack admin">
          <h2>{t("administrator")}</h2>
          {race.suggestion && race.suggestion.length > 0 ? (
            <div className="card suggest">
              <h3>{t("suggestedTop")}</h3>
              <p className="muted">{t("suggestionHelp")}</p>
              {race.suggestion.map((pick, index) => (
                <div className="slot readonly" key={pick.skierId}>
                  <span className="bib">{index + 1}</span>
                  <span>
                    <strong>{pick.name}</strong>
                    <em>{pick.nation}</em>
                    <small>{translateReason(pick.reason, lang)}</small>
                  </span>
                </div>
              ))}
              {race.bettingOpen ? (
                <button className="primary" type="button" onClick={applySuggestion}>
                  {t("useSuggestion")}
                </button>
              ) : null}
            </div>
          ) : (
            <p className="muted">{t("noSuggestion")}</p>
          )}
          <div className="stack">
            <h3>{t("officialResult")}</h3>
            <p className="muted">{t("officialResultHelp")}</p>
            {resultSlots.map((skier, index) => (
              <button className="slot-main card" key={index} type="button" onClick={() => setResultSheet(index)}>
                <span className="bib">{index + 1}</span>
                {skier ? (
                  <span>
                    <strong>{skier.name}</strong>
                    <em>{skier.nation}</em>
                  </span>
                ) : (
                  <span className="muted">{t("setRank", { rank: rankLabel(index + 1, lang) })}</span>
                )}
              </button>
            ))}
            {resultGap ? <p className="alert">{t("resultGap")}</p> : null}
            <button
              className="primary"
              type="button"
              disabled={busy || resultGap || filledResults.length === 0}
              onClick={() =>
                saveResults(
                  filledResults.map((skier, index) => ({ skierId: skier!.id, position: index + 1 })),
                )
              }
            >
              {t("saveResult")}
            </button>
            <button className="ghost" type="button" disabled={busy} onClick={() => saveResults([])}>
              {t("clearResult")}
            </button>
          </div>
          <form className="card form" onSubmit={saveRace}>
            <h3>{t("editRace")}</h3>
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
              <select value={gender} onChange={(event) => setGender(event.target.value as Gender)}>
                <option value="W">{t("gender_W")}</option>
                <option value="M">{t("gender_M")}</option>
              </select>
            </label>
            <label>
              {t("date")}
              <input type="date" value={raceDate} onChange={(event) => setRaceDate(event.target.value)} required />
            </label>
            <button className="primary" type="submit" disabled={busy}>
              {t("saveRace")}
            </button>
          </form>
          <div className="card form">
            <h3>{t("deleteRaceTitle")}</h3>
            {confirmingDelete ? (
              <>
                <p className="alert">{t("deleteRaceConfirm", { place: race.place })}</p>
                <button className="danger" type="button" disabled={busy} onClick={() => void removeRace()}>
                  {busy ? t("deleting") : t("deleteRace")}
                </button>
                <button className="ghost" type="button" disabled={busy} onClick={() => setConfirmingDelete(false)}>
                  {t("cancel")}
                </button>
              </>
            ) : (
              <button className="danger" type="button" onClick={() => setConfirmingDelete(true)}>
                {t("deleteRace")}
              </button>
            )}
          </div>
          <form className="card form" onSubmit={addSkier}>
            <h3>{t("addSkier")}</h3>
            <label>
              {t("name")}
              <input value={skierName} onChange={(event) => setSkierName(event.target.value)} required />
            </label>
            <label>
              {t("nation")}
              <input
                value={nation}
                onChange={(event) => setNation(event.target.value.toUpperCase())}
                maxLength={3}
                minLength={3}
                required
              />
            </label>
            <button className="primary" type="submit">
              {t("addTo", { gender: t(`gender_${race.gender}`) })}
            </button>
          </form>
        </section>
      ) : null}

      {activeSheet != null ? (
        <div className="sheet-backdrop" onClick={() => { setSheet(null); setResultSheet(null); setQuery(""); }}>
          <div
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-label={t("chooseRank", { rank: rankLabel(activeSheet + 1, lang) })}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sheet-head">
              <h2>{t("chooseRank", { rank: rankLabel(activeSheet + 1, lang) })}</h2>
              <button
                type="button"
                onClick={() => {
                  setSheet(null);
                  setResultSheet(null);
                  setQuery("");
                }}
              >
                {t("close")}
              </button>
            </div>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("searchSkier")}
              autoFocus
            />
            <p className="muted">{t("sheetHelp")}</p>
            <ul className="skier-list">
              {filtered.slice(0, 40).map((skier) => (
                <li key={skier.id}>
                  <button type="button" onClick={() => choose(skier)}>
                    {skier.rank != null ? <b className="rank-no">{skier.rank}</b> : <b className="rank-no quiet">–</b>}
                    <span>
                      <strong>{skier.name}</strong>
                      <em>
                        {skier.nation}
                        {skier.rankNote ? ` · ${skier.rankNote === "last season" ? t("lastSeason") : t("thisSeason")}` : ""}
                      </em>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
