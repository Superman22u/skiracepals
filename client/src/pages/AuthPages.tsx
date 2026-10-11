import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import type { User } from "../types";
import { WinterMark } from "../WinterMark";

export function LoginPage({ onUser }: { onUser: (user: User) => void }) {
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
      setError(err instanceof Error ? err.message : "Could not log in");
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
      <p className="eyebrow">Alpine World Cup 2026/27</p>
      <h1>
        <WinterMark />
        Ski Race Pals
      </h1>
      <p className="lede">Pick the first five. Women and men are separate races.</p>
      <form className="card form" onSubmit={submit}>
        <label>
          Email or nickname
          <input value={login} onChange={(event) => setLogin(event.target.value)} autoComplete="username" required />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {error ? <p className="alert">{error}</p> : null}
        <button className="primary" disabled={busy} type="submit">
          {busy ? "Logging in…" : "Log in"}
        </button>
      </form>
      <p className="switch">
        <Link to="/forgot">Forgot your password?</Link>
      </p>
      <p className="switch">
        New here? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}

export function RegisterPage({ onUser }: { onUser: (user: User) => void }) {
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
      setError(err instanceof Error ? err.message : "Could not register");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="gate">
      <p className="eyebrow">Join the pals</p>
      <h1>Create your account</h1>
      <p className="lede">Your nickname is what everyone sees on the ranking. Each email and each nickname can only be used once.</p>
      <form className="card form" onSubmit={submit}>
        <label>
          Name
          <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label>
          Nickname
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
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            minLength={8}
            required
          />
        </label>
        {error ? <p className="alert">{error}</p> : null}
        <button className="primary" disabled={busy} type="submit">
          {busy ? "Creating…" : "Create account"}
        </button>
      </form>
      <p className="switch">
        Already registered? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export function ForgotPage() {
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
      setError(err instanceof Error ? err.message : "Could not request a reset");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="gate">
      <p className="eyebrow">Alpine World Cup 2026/27</p>
      <h1>Reset password</h1>
      <p className="lede">
        Enter your nickname. The administrator can then choose a new password and tell you what it is.
      </p>
      <form className="card form" onSubmit={submit}>
        <label>
          Nickname
          <input
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            autoComplete="username"
            required
          />
        </label>
        {error ? <p className="alert">{error}</p> : null}
        {notice ? <p className="note">{notice}</p> : null}
        <button className="primary" disabled={busy} type="submit">
          {busy ? "Sending…" : "Ask for a reset"}
        </button>
      </form>
      <p className="switch">
        <Link to="/login">Back to log in</Link>
      </p>
    </div>
  );
}
