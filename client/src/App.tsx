import { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { api } from "./api";
import { AuthContext } from "./auth";
import { useI18n } from "./i18n";
import { Shell } from "./Shell";
import { AboutPage } from "./pages/AboutPage";
import { AccountPage } from "./pages/AccountPage";
import { ForgotPage, LoginPage, RegisterPage } from "./pages/AuthPages";
import { RacePage } from "./pages/RacePage";
import { RacesPage } from "./pages/RacesPage";
import { RankingPage } from "./pages/RankingPage";
import type { User } from "./types";

export function App() {
  const { t } = useI18n();
  const [user, setUser] = useState<User | null | undefined>(undefined);

  const refresh = useCallback(async () => {
    const next = await api<User>("/api/auth/me");
    setUser(next);
  }, []);

  useEffect(() => {
    api<User>("/api/auth/me")
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  if (user === undefined) {
    return <p className="boot">{t("loading")}</p>;
  }

  return (
    <AuthContext.Provider value={user ? { user, setUser, refresh } : null}>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage onUser={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/" replace /> : <RegisterPage onUser={setUser} />} />
        <Route path="/forgot" element={user ? <Navigate to="/" replace /> : <ForgotPage />} />
        <Route path="/about" element={<AboutPage signedIn={Boolean(user)} />} />
        <Route element={user ? <Shell /> : <Navigate to="/login" replace />}>
          <Route path="/" element={<RacesPage />} />
          <Route path="/races/:id" element={<RacePage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}
