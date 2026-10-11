import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth";
import { disciplineLabel, formatRaceDate, genderLabel } from "../format";
import type { RankingResponse } from "../types";

export function RankingPage() {
  const { user } = useAuth();
  const [board, setBoard] = useState<RankingResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<RankingResponse>("/api/ranking")
      .then(setBoard)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Could not load the ranking"));
  }, []);

  if (error) return <p className="alert">{error}</p>;
  if (!board) return <p className="muted">Loading ranking…</p>;

  return (
    <div className="stack">
      <p className="rule">
        Only pals who placed a bet are listed. A top-5 skier is 1 point. The correct rank is 3. A perfect race is 15.
      </p>
      {board.rows.length === 0 ? (
        <p className="card empty">Nobody has placed a bet yet.</p>
      ) : (
        <table className="ranking">
          <caption>Season ranking</caption>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Nickname</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {board.rows.map((row) => (
              <tr key={row.userId} className={row.userId === user.id ? "me" : ""}>
                <td>{row.rank}</td>
                <td>
                  {row.nickname}
                  <span>
                    {row.exact} exact · {row.topFive} in the top 5
                  </span>
                </td>
                <td>{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {board.myRaces.length > 0 ? (
        <section className="stack">
          <h2>Your races</h2>
          {board.myRaces.map((race) => (
            <Link key={race.raceId} className="card race" to={`/races/${race.raceId}`}>
              <div>
                <p className="place">{race.place}</p>
                <p className="meta">
                  {disciplineLabel[race.discipline]} · {genderLabel[race.gender]} · {formatRaceDate(race.raceDate)}
                </p>
              </div>
              <strong>{race.pending ? "Pending" : `${race.points} pts`}</strong>
            </Link>
          ))}
        </section>
      ) : null}
    </div>
  );
}
