import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth";
import { formatRaceDate } from "../format";
import { useI18n } from "../i18n";
import type { RankingResponse } from "../types";

export function RankingPage() {
  const { user } = useAuth();
  const { t, lang } = useI18n();
  const [board, setBoard] = useState<RankingResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<RankingResponse>("/api/ranking")
      .then(setBoard)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "couldNotLoadRanking"));
  }, []);

  if (error) return <p className="alert">{t(error)}</p>;
  if (!board) return <p className="muted">{t("loadingRanking")}</p>;

  return (
    <div className="stack">
      <p className="rule">{t("ruleRanking")}</p>
      {board.rows.length === 0 ? (
        <p className="card empty">{t("nobodyBet")}</p>
      ) : (
        <table className="ranking">
          <caption>{t("seasonRanking")}</caption>
          <thead>
            <tr>
              <th>{t("rank")}</th>
              <th>{t("nickname")}</th>
              <th>{t("points")}</th>
            </tr>
          </thead>
          <tbody>
            {board.rows.map((row) => (
              <tr key={row.userId} className={row.userId === user.id ? "me" : ""}>
                <td>{row.rank}</td>
                <td>
                  {row.nickname}
                  <span>{t("exactLine", { exact: row.exact, top: row.topFive })}</span>
                </td>
                <td>{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {board.myRaces.length > 0 ? (
        <section className="stack">
          <h2>{t("yourRaces")}</h2>
          {board.myRaces.map((race) => (
            <Link key={race.raceId} className="card race" to={`/races/${race.raceId}`}>
              <div>
                <p className="place">{race.place}</p>
                <p className="meta">
                  {t(`discipline_${race.discipline}`)} · {t(`gender_${race.gender}`)} · {formatRaceDate(race.raceDate, lang)}
                </p>
              </div>
              <strong>{race.pending ? t("pending") : t("pointsShort", { points: race.points })}</strong>
            </Link>
          ))}
        </section>
      ) : null}
    </div>
  );
}
