import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth";
import { useI18n } from "../i18n";
import { MailPanel } from "./MailPanel";
import { GroupsPanel } from "./GroupsPanel";
import { NewsEditor } from "./NewsPanel";

type Pal = {
  id: number;
  name: string;
  email: string;
  nickname: string;
  resetRequested: boolean;
};

export function AccountPage() {
  const { user, setUser } = useAuth();
  const { t } = useI18n();
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
      setNotice("passwordUpdated");
    } catch (err) {
      setError(err instanceof Error ? err.message : "couldNotChangePassword");
    }
  }

  return (
    <div className="stack">
      <section className="card profile">
        <p className="eyebrow">{user.isAdmin ? t("administrator") : t("palsAccount")}</p>
        <h2>{user.nickname}</h2>
        <p>{user.name}</p>
        <p className="meta">{user.email}</p>
      </section>
      <GroupsPanel />
      {user.isAdmin ? <NewsEditor /> : null}
      {user.isAdmin ? <MailPanel /> : null}
      <form className="card form" onSubmit={changePassword}>
        <h2>{t("changePassword")}</h2>
        <label>
          {t("currentPassword")}
          <input
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        <label>
          {t("newPassword")}
          <input
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            autoComplete="new-password"
            minLength={8}
            required
          />
        </label>
        {error ? <p className="alert">{t(error)}</p> : null}
        {notice ? <p className="note">{t(notice)}</p> : null}
        <button className="primary" type="submit">
          {t("updatePassword")}
        </button>
      </form>
      {user.isAdmin ? (
        <section className="stack">
          <h2>{t("resetAPassword")}</h2>
          <p className="muted">{t("resetHelp")}</p>
          {pals.length === 0 ? <p className="card empty">{t("noOtherAccounts")}</p> : null}
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
      {!user.isAdmin ? (
        <DeleteOwnAccount nickname={user.nickname} onDeleted={() => { setUser(null); navigate("/login"); }} />
      ) : null}
      <p className="switch">
        <Link to="/about">{t("about")}</Link>
      </p>
      <button className="ghost" type="button" onClick={logout}>
        {t("logout")}
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
  const { t } = useI18n();
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
      setNotice("passwordSavedFor");
      onReset(pal.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "couldNotSetPassword");
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
      setError(err instanceof Error ? err.message : "couldNotDeleteAccount");
      setDeleting(false);
    }
  }

  return (
    <form className="card pal" onSubmit={submit}>
      <div className="pal-head">
        <strong>{pal.nickname}</strong>
        {pal.resetRequested ? <p className="asked">{t("askedReset")}</p> : null}
      </div>
      <p className="meta">
        {pal.name} · {pal.email}
      </p>
      <label>
        {t("newPassword")}
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
      {notice ? <p className="note">{t(notice, { nickname: pal.nickname })}</p> : null}
      <button className="primary" type="submit" disabled={busy}>
        {busy ? t("saving") : t("setPassword")}
      </button>
      {confirming ? (
        <>
          <p className="alert">{t("deleteAccountConfirm", { nickname: pal.nickname })}</p>
          <button className="danger" type="button" disabled={deleting} onClick={() => void remove()}>
            {deleting ? t("deleting") : t("deleteAccount")}
          </button>
          <button className="ghost" type="button" onClick={() => setConfirming(false)}>
            {t("cancel")}
          </button>
        </>
      ) : (
        <button className="danger" type="button" onClick={() => setConfirming(true)}>
          {t("deleteAccount")}
        </button>
      )}
    </form>
  );
}

type ListedSkier = { id: number; name: string; nation: string; gender: "W" | "M" };

function RemoveSkiers() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [found, setFound] = useState<ListedSkier[]>([]);
  const [pending, setPending] = useState<ListedSkier | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [removedName, setRemovedName] = useState("");
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
      setRemovedName(skier.name);
      setNotice("skierRemoved");
    } catch (err) {
      setError(err instanceof Error ? err.message : "couldNotRemoveSkier");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="card form">
      <h2>{t("removeSkier")}</h2>
      <p className="muted">{t("removeSkierHelp")}</p>
      <label>
        {t("search")}
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("namePlaceholder")} />
      </label>
      {error ? <p className="alert">{t(error)}</p> : null}
      {notice ? <p className="note">{t(notice, { name: removedName })}</p> : null}
      <ul className="skier-admin">
        {found.map((skier) => (
          <li key={skier.id}>
            <span>
              <strong>{skier.name}</strong>
              <em>
                {skier.nation} · {skier.gender === "W" ? t("gender_W") : t("gender_M")}
              </em>
            </span>
            {pending?.id === skier.id ? (
              <button className="danger" type="button" disabled={busy} onClick={() => void remove(skier)}>
                {busy ? t("removing") : t("removeNow")}
              </button>
            ) : (
              <button className="ghost" type="button" onClick={() => setPending(skier)}>
                {t("remove")}
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function DeleteOwnAccount({ nickname, onDeleted }: { nickname: string; onDeleted: () => void }) {
  const { t } = useI18n();
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
      setError(err instanceof Error ? err.message : "couldNotDeleteAccount");
      setBusy(false);
    }
  }

  return (
    <section className="card form">
      <h2>{t("deleteMyAccount")}</h2>
      <p className="muted">{t("deleteMyAccountHelp", { nickname })}</p>
      {error ? <p className="alert">{t(error)}</p> : null}
      {confirming ? (
        <>
          <p className="alert">{t("cannotUndo")}</p>
          <button className="danger" type="button" disabled={busy} onClick={() => void remove()}>
            {busy ? t("deleting") : t("deleteMyAccountNow")}
          </button>
          <button className="ghost" type="button" onClick={() => setConfirming(false)}>
            {t("keepAccount")}
          </button>
        </>
      ) : (
        <button className="danger" type="button" onClick={() => setConfirming(true)}>
          {t("deleteMyAccount")}
        </button>
      )}
    </section>
  );
}
