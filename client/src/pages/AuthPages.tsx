import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import type { User } from "../types";
import { WinterMark } from "../WinterMark";
import { LangSwitch } from "../LangSwitch";
import { useI18n } from "../i18n";

export function LoginPage({ onUser }: { onUser: (user: User) => void }) {
  const { t } = useI18n();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      onUser(await api<User>("/api/auth/login", { method: "POST", body: JSON.stringify({ login, password }) }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "couldNotLogin");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="gate">
      <div className="flakes" aria-hidden="true">
        <span>❄</span>
        <span>❄</span>
        <span>❄</span>
      </div>
      <div className="gate-tools">
        <LangSwitch tone="light" />
      </div>
      <p className="eyebrow">{t("season")}</p>
      <h1>
        <WinterMark />
        {t("appName")}
      </h1>
      <p className="lede">{t("loginLede")}</p>
      <form className="card form" onSubmit={submit}>
        <label>
          {t("emailOrNickname")}
          <input value={login} onChange={(event) => setLogin(event.target.value)} autoComplete="username" required />
        </label>
        <label>
          {t("password")}
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {error ? <p className="alert">{t(error)}</p> : null}
        <button className="primary" disabled={busy} type="submit">
          {busy ? t("loggingIn") : t("login")}
        </button>
      </form>
      <p className="switch">
        <Link to="/forgot">{t("forgotPassword")}</Link>
      </p>
      <p className="switch">
        {t("newHere")} <Link to="/register">{t("createAccount")}</Link>
      </p>
      <p className="switch">
        <Link to="/about">{t("about")}</Link>
      </p>
    </div>
  );
}

export function RegisterPage({ onUser }: { onUser: (user: User) => void }) {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      onUser(
        await api<User>("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({ name, email, nickname, password }),
        }),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "couldNotRegister");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="gate">
      <div className="gate-tools">
        <LangSwitch tone="light" />
      </div>
      <p className="eyebrow">{t("join")}</p>
      <h1>{t("createYourAccount")}</h1>
      <p className="lede">{t("registerLede")}</p>
      <form className="card form" onSubmit={submit}>
        <label>
          {t("name")}
          <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required />
        </label>
        <label>
          {t("email")}
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label>
          {t("nickname")}
          <input
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            autoComplete="nickname"
            minLength={2}
            maxLength={24}
            required
          />
        </label>
        <label>
          {t("password")}
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            minLength={8}
            required
          />
        </label>
        {error ? <p className="alert">{t(error)}</p> : null}
        <button className="primary" disabled={busy} type="submit">
          {busy ? t("creating") : t("createAccount")}
        </button>
      </form>
      <p className="switch">
        {t("alreadyRegistered")} <Link to="/login">{t("login")}</Link>
      </p>
    </div>
  );
}

export function ForgotPage() {
  const { t } = useI18n();
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const result = await api<{ message: string }>("/api/auth/forgot", {
        method: "POST",
        body: JSON.stringify({ nickname }),
      });
      setNotice(result.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "couldNotReset");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="gate">
      <div className="gate-tools">
        <LangSwitch tone="light" />
      </div>
      <p className="eyebrow">{t("season")}</p>
      <h1>{t("resetPassword")}</h1>
      <p className="lede">{t("forgotLede")}</p>
      <form className="card form" onSubmit={submit}>
        <label>
          {t("nickname")}
          <input
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            autoComplete="username"
            required
          />
        </label>
        {error ? <p className="alert">{t(error)}</p> : null}
        {notice ? <p className="note">{t(notice)}</p> : null}
        <button className="primary" disabled={busy} type="submit">
          {busy ? t("sending") : t("askReset")}
        </button>
      </form>
      <p className="switch">
        <Link to="/login">{t("backToLogin")}</Link>
      </p>
    </div>
  );
}
