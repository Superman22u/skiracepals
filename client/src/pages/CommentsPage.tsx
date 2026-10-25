import { useEffect, useRef, useState, type FormEvent } from "react";
import { api } from "../api";
import { useAuth } from "../auth";
import { useI18n, type Lang } from "../i18n";

type Comment = {
  id: number;
  body: string;
  createdAt: string;
  authorId: number;
  author: string;
};

const seenKey = "skirace-comments-seen";

const emojis = [
  "😀", "😁", "😂", "🤣", "😊", "😉", "😍", "😎",
  "🤔", "😮", "😢", "😭", "😴", "🤗", "😜", "😇",
  "👍", "👎", "👏", "🙌", "🙏", "🔥", "❤️", "💯",
  "❄️", "⛷️", "🏂", "🎿", "🏔️", "🏆", "🥇", "🥈",
  "🥉", "☀️", "🌨️", "🍺", "🎉", "✅", "💪", "🤝",
  "🇨🇭", "🇦🇹", "🇮🇹", "🇫🇷", "🇩🇪", "🇳🇴", "🇸🇪", "🇺🇸",
];

export function rememberCommentsSeen(id: number) {
  sessionStorage.setItem(seenKey, String(id));
}

export function readCommentsSeen(): number | null {
  const raw = sessionStorage.getItem(seenKey);
  if (raw == null) return null;
  const id = Number(raw);
  return Number.isFinite(id) ? id : null;
}

export function CommentsPage() {
  const { user } = useAuth();
  const { t, lang } = useI18n();
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const stick = useRef(true);
  const composerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const caretRef = useRef<number | null>(null);

  useEffect(() => {
    let current = true;
    async function load() {
      const result = await api<{ comments: Comment[] }>("/api/comments", { cache: "no-store" });
      if (!current) return;
      setComments((previous) => (previous && sameComments(previous, result.comments) ? previous : result.comments));
      rememberCommentsSeen(result.comments.at(-1)?.id ?? 0);
    }
    load().catch((err: unknown) => {
      if (!current) return;
      setComments([]);
      setError(err instanceof Error ? err.message : "couldNotLoadComments");
    });
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      load().catch(() => undefined);
    }, 4000);
    return () => {
      current = false;
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!emojiOpen) return;
    function onPointer(event: PointerEvent) {
      const target = event.target;
      if (target instanceof Node && composerRef.current?.contains(target)) return;
      setEmojiOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [emojiOpen]);

  useEffect(() => {
    const onScroll = () => {
      stick.current = document.documentElement.scrollHeight - window.scrollY - window.innerHeight < 80;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!stick.current) return;
    window.scrollTo(0, document.documentElement.scrollHeight);
  }, [comments]);

  async function send(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setEmojiOpen(false);
    stick.current = true;
    try {
      const created = await api<Comment>("/api/comments", {
        method: "POST",
        body: JSON.stringify({ body }),
      });
      setBody("");
      setComments((current) => [...(current ?? []), created]);
      rememberCommentsSeen(created.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "couldNotSendComment");
    } finally {
      setBusy(false);
    }
  }

  function insertEmoji(emoji: string) {
    const input = inputRef.current;
    setBody((current) => {
      const live = input != null && input.value === current;
      const from = live ? (input.selectionStart ?? current.length) : (caretRef.current ?? current.length);
      const to = live ? (input.selectionEnd ?? current.length) : (caretRef.current ?? current.length);
      const next = current.slice(0, from) + emoji + current.slice(to);
      if (next.length > 300) return current;
      caretRef.current = from + emoji.length;
      return next;
    });
    requestAnimationFrame(() => {
      const caret = caretRef.current;
      if (!input || caret == null) return;
      input.focus();
      input.setSelectionRange(caret, caret);
    });
  }

  async function remove(id: number) {
    setError("");
    try {
      await api(`/api/comments/${id}`, { method: "DELETE" });
      setComments((current) => (current ?? []).filter((comment) => comment.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "couldNotDeleteComment");
    }
  }

  return (
    <div className="comments-page">
      <h2>{t("comments")}</h2>
      {comments == null ? <p className="muted">{t("loading")}</p> : null}
      {comments != null && comments.length === 0 ? <p className="muted">{t("commentsEmpty")}</p> : null}
      <div className="comments-list">
        {comments?.map((comment) => (
          <article className="comment-line" key={comment.id}>
            <p className="meta">
              <strong>{comment.author}</strong> · {formatCommentTime(comment.createdAt, lang)}
            </p>
            <p>{comment.body}</p>
            {user.isAdmin || comment.authorId === user.id ? (
              <button type="button" onClick={() => void remove(comment.id)}>
                {t("commentsDelete")}
              </button>
            ) : null}
          </article>
        ))}
      </div>
      <div className="comments-composer" ref={composerRef}>
        {emojiOpen ? (
          <div className="emoji-pop">
            {emojis.map((emoji) => (
              <button key={emoji} type="button" aria-label={emoji} onClick={() => insertEmoji(emoji)}>
                {emoji}
              </button>
            ))}
          </div>
        ) : null}
        {error ? <p className="alert">{t(error)}</p> : null}
        <form className="comments-form" onSubmit={(event) => void send(event)}>
          <input
            ref={inputRef}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder={t("commentsPlaceholder")}
            maxLength={300}
            aria-label={t("commentsPlaceholder")}
            required
          />
          <button
            className="emoji-toggle"
            type="button"
            aria-label={t("commentsEmoji")}
            aria-expanded={emojiOpen}
            onClick={() => setEmojiOpen((open) => !open)}
          >
            😊
          </button>
          <button className="primary" type="submit" disabled={busy || body.trim().length === 0}>
            {busy ? t("commentsSending") : t("commentsSend")}
          </button>
        </form>
      </div>
    </div>
  );
}

function sameComments(current: Comment[], next: Comment[]): boolean {
  if (current.length !== next.length) return false;
  return current.every((item, index) => item.id === next[index].id && item.body === next[index].body);
}

function formatCommentTime(value: string, lang: Lang): string {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/);
  if (!match) return value;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]), Number(match[4]), Number(match[5])));
  return new Intl.DateTimeFormat(lang === "de" ? "de-DE" : "en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(date);
}
