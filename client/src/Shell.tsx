import { useNavigate, Link, NavLink, Outlet } from "react-router-dom";
import { WinterMark } from "./WinterMark";
import { api } from "./api";
import { useAuth } from "./auth";
import { LangSwitch } from "./LangSwitch";
import { useI18n } from "./i18n";

export function Shell() {
  const { user, setUser } = useAuth();
  const { t } = useI18n();
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
        <p className="eyebrow">{t("season")}</p>
        <div className="topbar-row">
          <h1>
            <Link to="/">
              <WinterMark />
              {t("appName")}
            </Link>
          </h1>
          <p className="score-pill">
            <strong>{user.totalPoints}</strong>
            <span>{t("pts")}</span>
          </p>
        </div>
        <div className="topbar-row who-row">
          <p className="who">{user.nickname}</p>
          <div className="who-actions">
            <LangSwitch />
            <button className="logout" type="button" onClick={logout}>
              {t("logout")}
            </button>
          </div>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <nav className="nav">
        <NavLink to="/" end>
          {t("navRaces")}
        </NavLink>
        <NavLink to="/ranking">{t("navRanking")}</NavLink>
        <NavLink to="/account">{t("navAccount")}</NavLink>
      </nav>
    </div>
  );
}
