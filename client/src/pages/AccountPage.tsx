import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth";

type Pal = {
  id: number;
  name: string;
  email: string;
  nickname: string;
  resetRequested: boolean;
};

export function AccountPage() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pals, setPals] = useState<Pal[]>([]);

  async function logout() {
    await api("/api/auth/logout", { method: "POST" });
    setUser(null);
    navigate("/login");
  }

  useEffect(() => {
    if (!user.isAdmin) return;
    api<{ pals: Pal[] }>("/api/auth/pals")
      .then((result) => setPals(result.pals))
      .catch(() => setPals([]));
  }, [user.isAdmin]);

  async function changePassword(event: FormEvent) {
    event.preventDefault();
    setError("");
    setNotice("");
    try {
      await api("/api/auth/password", {
        method: "POST",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      setCurrentPassword("");
      setNewPassword("");
      setNotice("Password updated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not change the password");
    }
  }

  return (
    <div className="stack">
      <section className="card profile">
        <p className="eyebrow">{user.isAdmin ? "Administrator" : "Pals account"}</p>
        <h2>{user.nickname}</h2>
        <p>{user.name}</p>
        <p className="meta">{user.email}</p>
      </section>
      <form className="card form" onSubmit={changePassword}>
        <h2>Change password</h2>
        <label>
          Current password
          <input
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        <label>
          New password
          <input
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            autoComplete="new-password"
            minLength={8}
            required
          />
        </label>
        {error ? <p className="alert">{error}</p> : null}
        {notice ? <p className="note">{notice}</p> : null}
        <button className="primary" type="submit">
          Update password
        </button>
      </form>
      {user.isAdmin ? (
        <section className="stack">
          <h2>Reset a password</h2>
          <p className="muted">When someone forgets their password, set a new one here and tell them what it is.</p>
          {pals.length === 0 ? <p className="card empty">No other accounts yet.</p> : null}
          {pals.map((pal) => (
            <PalReset
              key={pal.id}
              pal={pal}
              onReset={(id) =>
                setPals((current) => current.map((item) => (item.id === id ? { ...item, resetRequested: false } : item)))
              }
              onDelete={(id) => setPals((current) => current.filter((item) => item.id !== id))}
            />
          ))}
        </section>
      ) : null}
      {user.isAdmin ? <RemoveSkiers /> : null}
      <DeleteOwnAccount nickname={user.nickname} onDeleted={() => { setUser(null); navigate("/login"); }} />
      <button className="ghost" type="button" onClick={logout}>
        Log out
      </button>
    </div>
  );
}

function PalReset({
  pal,
  onReset,
  onDelete,
}: {
  pal: Pal;
  onReset: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirming, setConfirming] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await api(`/api/auth/pals/${pal.id}/password`, {
        method: "POST",
        body: JSON.stringify({ newPassword: password }),
      });
      setPassword("");
      setNotice(`New password saved for ${pal.nickname}.`);
      onReset(pal.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not set the password");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    setDeleting(true);
    setError("");
    try {
      await api(`/api/auth/pals/${pal.id}`, { method: "DELETE" });
      onDelete(pal.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete the account");
      setDeleting(false);
    }
  }

  return (
    <form className="card pal" onSubmit={submit}>
      <div className="pal-head">
        <strong>{pal.nickname}</strong>
        {pal.resetRequested ? <p className="asked">Asked for a reset</p> : null}
      </div>
      <p className="meta">
        {pal.name} · {pal.email}
      </p>
      <label>
        New password
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
      {notice ? <p className="note">{notice}</p> : null}
      <button className="primary" type="submit" disabled={busy}>
        {busy ? "Saving…" : "Set password"}
      </button>
      {confirming ? (
        <>
          <p className="alert">Delete {pal.nickname} and every bet on that account? This cannot be undone.</p>
          <button className="danger" type="button" disabled={deleting} onClick={() => void remove()}>
            {deleting ? "Deleting…" : "Delete account"}
          </button>
          <button className="ghost" type="button" onClick={() => setConfirming(false)}>
            Cancel
          </button>
        </>
      ) : (
        <button className="danger" type="button" onClick={() => setConfirming(true)}>
          Delete account
        </button>
      )}
    </form>
  );
}

type ListedSkier = { id: number; name: string; nation: string; gender: "W" | "M" };

function RemoveSkiers() {
  const [query, setQuery] = useState("");
  const [found, setFound] = useState<ListedSkier[]>([]);
  const [pending, setPending] = useState<ListedSkier | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const term = query.trim();
    if (term.length < 2) {
      setFound([]);
      return;
    }
    const handle = window.setTimeout(() => {
      api<ListedSkier[]>(`/api/admin/skiers?q=${encodeURIComponent(term)}`)
        .then(setFound)
        .catch(() => setFound([]));
    }, 200);
    return () => window.clearTimeout(handle);
  }, [query]);

  async function remove(skier: ListedSkier) {
    setBusy(true);
    setError("");
    try {
      await api(`/api/admin/skiers/${skier.id}`, { method: "DELETE" });
      setFound((current) => current.filter((item) => item.id !== skier.id));
      setPending(null);
      setNotice(`${skier.name} is off the start lists. Past bets still show the name.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not remove the skier");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="card form">
      <h2>Remove a skier</h2>
      <p className="muted">
        Take someone off the lists when they no longer compete. Adding the same name on a race puts them back.
      </p>
      <label>
        Search
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name" />
      </label>
      {error ? <p className="alert">{error}</p> : null}
      {notice ? <p className="note">{notice}</p> : null}
      <ul className="skier-admin">
        {found.map((skier) => (
          <li key={skier.id}>
            <span>
              <strong>{skier.name}</strong>
              <em>
                {skier.nation} · {skier.gender === "W" ? "Women" : "Men"}
              </em>
            </span>
            {pending?.id === skier.id ? (
              <button className="danger" type="button" disabled={busy} onClick={() => void remove(skier)}>
                {busy ? "Removing…" : "Remove now"}
              </button>
            ) : (
              <button className="ghost" type="button" onClick={() => setPending(skier)}>
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function DeleteOwnAccount({ nickname, onDeleted }: { nickname: string; onDeleted: () => void }) {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function remove() {
    setBusy(true);
    setError("");
    try {
      await api("/api/auth/me", { method: "DELETE" });
      onDeleted();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete the account");
      setBusy(false);
    }
  }

  return (
    <section className="card form">
      <h2>Delete my account</h2>
      <p className="muted">This removes the account {nickname} and every bet on it.</p>
      {error ? <p className="alert">{error}</p> : null}
      {confirming ? (
        <>
          <p className="alert">This cannot be undone.</p>
          <button className="danger" type="button" disabled={busy} onClick={() => void remove()}>
            {busy ? "Deleting…" : "Delete my account now"}
          </button>
          <button className="ghost" type="button" onClick={() => setConfirming(false)}>
            Keep my account
          </button>
        </>
      ) : (
        <button className="danger" type="button" onClick={() => setConfirming(true)}>
          Delete my account
        </button>
      )}
    </section>
  );
}
