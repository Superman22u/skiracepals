import { useEffect, useState, type FormEvent } from "react";
import { api } from "../api";
import { formatRaceDate } from "../format";
import { useI18n } from "../i18n";

type NewsItem = {
  id: number;
  body: string;
  createdAt: string;
};

export function NewsPanel() {
  const { t, lang } = useI18n();
  const [items, setItems] = useState<NewsItem[] | null>(null);

  useEffect(() => {
    api<{ news: NewsItem[] }>("/api/news")
      .then((result) => setItems(result.news))
      .catch(() => setItems([]));
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <section className="card news">
      <h2>{t("news")}</h2>
      {items.map((item) => (
        <article key={item.id}>
          <p className="meta">{formatRaceDate(item.createdAt, lang)}</p>
          <p className="news-body">{item.body}</p>
        </article>
      ))}
    </section>
  );
}

export function NewsEditor() {
  const { t, lang } = useI18n();
  const [items, setItems] = useState<NewsItem[]>([]);
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [pendingId, setPendingId] = useState<number | null>(null);

  useEffect(() => {
    api<{ news: NewsItem[] }>("/api/news")
      .then((result) => setItems(result.news))
      .catch(() => setItems([]));
  }, []);

  async function publish(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const created = await api<NewsItem>("/api/admin/news", {
        method: "POST",
        body: JSON.stringify({ body }),
      });
      setItems((current) => [created, ...current]);
      setBody("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "couldNotPublishNews");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: number) {
    setBusy(true);
    setError("");
    try {
      await api(`/api/admin/news/${id}`, { method: "DELETE" });
      setItems((current) => current.filter((item) => item.id !== id));
      setPendingId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "couldNotRemoveNews");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="card form">
      <h2>{t("news")}</h2>
      <p className="muted">{t("newsHelp")}</p>
      <form className="stack" onSubmit={publish}>
        <label>
          {t("news")}
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder={t("newsPlaceholder")}
            rows={4}
            maxLength={1000}
            required
          />
        </label>
        {error ? <p className="alert">{t(error)}</p> : null}
        <button className="primary" type="submit" disabled={busy || body.trim().length === 0}>
          {busy ? t("publishing") : t("publishNews")}
        </button>
      </form>
      {items.length === 0 ? <p className="muted">{t("noNewsYet")}</p> : null}
      {items.map((item) => (
        <article className="news-item" key={item.id}>
          <p className="meta">{formatRaceDate(item.createdAt, lang)}</p>
          <p className="news-body">{item.body}</p>
          {pendingId === item.id ? (
            <button className="danger" type="button" disabled={busy} onClick={() => void remove(item.id)}>
              {t("removeNews")}
            </button>
          ) : (
            <button className="ghost" type="button" onClick={() => setPendingId(item.id)}>
              {t("removeNews")}
            </button>
          )}
        </article>
      ))}
    </section>
  );
}
