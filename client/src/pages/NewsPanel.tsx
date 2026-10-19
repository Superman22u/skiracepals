import { useEffect, useState, type FormEvent } from "react";
import { api } from "../api";
import { formatRaceDate } from "../format";
import { useI18n, type Lang } from "../i18n";

type NewsItem = {
  id: number;
  body: string;
  createdAt: string;
};

export function NewsPanel() {
  const { t, lang } = useI18n();
  const [items, setItems] = useState<NewsItem[] | null>(null);

  useEffect(() => {
    let current = true;
    setItems(null);
    api<{ news: NewsItem[] }>(`/api/news?lang=${lang}`, { cache: "no-store" })
      .then((result) => {
        if (current) setItems(result.news);
      })
      .catch(() => {
        if (current) setItems([]);
      });
    return () => {
      current = false;
    };
  }, [lang]);

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
  const [german, setGerman] = useState<NewsItem[]>([]);
  const [english, setEnglish] = useState<NewsItem[]>([]);
  const [germanBody, setGermanBody] = useState("");
  const [englishBody, setEnglishBody] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [pendingId, setPendingId] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([
      api<{ news: NewsItem[] }>("/api/news?lang=de", { cache: "no-store" }),
      api<{ news: NewsItem[] }>("/api/news?lang=en", { cache: "no-store" }),
    ])
      .then(([de, en]) => {
        setGerman(de.news);
        setEnglish(en.news);
      })
      .catch(() => {
        setGerman([]);
        setEnglish([]);
      });
  }, []);

  async function publish(event: FormEvent, newsLang: Lang, body: string) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const created = await api<NewsItem>("/api/admin/news", {
        method: "POST",
        body: JSON.stringify({ body, lang: newsLang }),
      });
      if (newsLang === "de") {
        setGerman((current) => [created, ...current]);
        setGermanBody("");
      } else {
        setEnglish((current) => [created, ...current]);
        setEnglishBody("");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "couldNotPublishNews");
    } finally {
      setBusy(false);
    }
  }

  async function remove(newsLang: Lang, id: number) {
    setBusy(true);
    setError("");
    try {
      await api(`/api/admin/news/${id}`, { method: "DELETE" });
      const drop = (current: NewsItem[]) => current.filter((item) => item.id !== id);
      if (newsLang === "de") setGerman(drop);
      else setEnglish(drop);
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
      {error ? <p className="alert">{t(error)}</p> : null}
      <NewsDraft
        label={t("newsGerman")}
        body={germanBody}
        setBody={setGermanBody}
        items={german}
        newsLang="de"
        displayLang={lang}
        busy={busy}
        pendingId={pendingId}
        setPendingId={setPendingId}
        onPublish={publish}
        onRemove={remove}
      />
      <NewsDraft
        label={t("newsEnglish")}
        body={englishBody}
        setBody={setEnglishBody}
        items={english}
        newsLang="en"
        displayLang={lang}
        busy={busy}
        pendingId={pendingId}
        setPendingId={setPendingId}
        onPublish={publish}
        onRemove={remove}
      />
    </section>
  );
}

function NewsDraft({
  label,
  body,
  setBody,
  items,
  newsLang,
  displayLang,
  busy,
  pendingId,
  setPendingId,
  onPublish,
  onRemove,
}: {
  label: string;
  body: string;
  setBody: (value: string) => void;
  items: NewsItem[];
  newsLang: Lang;
  displayLang: Lang;
  busy: boolean;
  pendingId: number | null;
  setPendingId: (id: number | null) => void;
  onPublish: (event: FormEvent, lang: Lang, body: string) => Promise<void>;
  onRemove: (lang: Lang, id: number) => Promise<void>;
}) {
  const { t } = useI18n();
  return (
    <form className="stack" onSubmit={(event) => void onPublish(event, newsLang, body)}>
      <label>
        {label}
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder={t("newsPlaceholder")}
          rows={4}
          maxLength={1000}
          required
        />
      </label>
      <button className="primary" type="submit" disabled={busy || body.trim().length === 0}>
        {busy ? t("publishing") : t("publishNews")}
      </button>
      {items.length === 0 ? <p className="muted">{t("noNewsYet")}</p> : null}
      {items.map((item) => (
        <article className="news-item" key={item.id}>
          <p className="meta">{formatRaceDate(item.createdAt, displayLang)}</p>
          <p className="news-body">{item.body}</p>
          {pendingId === item.id ? (
            <button className="danger" type="button" disabled={busy} onClick={() => void onRemove(newsLang, item.id)}>
              {t("removeNews")}
            </button>
          ) : (
            <button className="ghost" type="button" onClick={() => setPendingId(item.id)}>
              {t("removeNews")}
            </button>
          )}
        </article>
      ))}
    </form>
  );
}
