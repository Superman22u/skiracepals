import { useEffect, useState } from "react";
import { useNavigate, Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { WinterMark } from "./WinterMark";
import { api } from "./api";
import { useAuth } from "./auth";
import { LangSwitch } from "./LangSwitch";
import { useI18n } from "./i18n";
import { readCommentsSeen, rememberCommentsSeen } from "./pages/CommentsPage";

export function Shell() {
  const { user, setUser } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const onComments = location.pathname === "/comments";
  const [unseen, setUnseen] = useState(false);

  useEffect(() => {
    if (onComments) {
      setUnseen(false);
      return;
    }
    let current = true;
    async function load() {
      const result = await api<{ comments: { id: number }[] }>("/api/comments", { cache: "no-store" });
      if (!current) return;
      const newest = result.comments.at(-1)?.id ?? 0;
      const seen = readCommentsSeen();
      if (seen == null) {
        rememberCommentsSeen(newest);
        setUnseen(false);
        return;
      }
      setUnseen(newest > seen);
    }
    load().catch(() => undefined);
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      load().catch(() => undefined);
    }, 4000);
    return () => {
      current = false;
      window.clearInterval(timer);
    };
  }, [onComments]);

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
        <NavLink to="/comments" className={({ isActive }) => [isActive ? "active" : "", unseen && !isActive ? "has-new" : ""].filter(Boolean).join(" ")}>
          {t("navComments")}
        </NavLink>
      </nav>
    </div>
  );
}
