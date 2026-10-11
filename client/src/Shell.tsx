import { useNavigate, Link, NavLink, Outlet } from "react-router-dom";
import { WinterMark } from "./WinterMark";
import { api } from "./api";
import { useAuth } from "./auth";

export function Shell() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  async function logout() {
    await api("/api/auth/logout", { method: "POST" });
    setUser(null);
    navigate("/login");
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="flakes" aria-hidden="true">
          <span>❄</span>
          <span>❄</span>
          <span>❄</span>
          <span>❄</span>
        </div>
        <p className="eyebrow">Alpine World Cup 2026/27</p>
        <div className="topbar-row">
          <h1>
            <Link to="/">
              <WinterMark />
              Ski Race Pals
            </Link>
          </h1>
          <p className="score-pill">
            <strong>{user.totalPoints}</strong>
            <span>pts</span>
          </p>
        </div>
        <div className="topbar-row who-row">
          <p className="who">{user.nickname}</p>
          <button className="logout" type="button" onClick={logout}>
            Log out
          </button>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <nav className="nav">
        <NavLink to="/" end>
          Races
        </NavLink>
        <NavLink to="/ranking">Ranking</NavLink>
        <NavLink to="/account">Account</NavLink>
      </nav>
    </div>
  );
}
