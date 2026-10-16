import { useI18n, type Lang } from "./i18n";

function FlagDE() {
  return (
    <svg className="flag" viewBox="0 0 60 40" aria-hidden="true">
      <rect width="60" height="13.34" fill="#000" />
      <rect y="13.34" width="60" height="13.33" fill="#DD0000" />
      <rect y="26.67" width="60" height="13.33" fill="#FFCE00" />
    </svg>
  );
}

function FlagEN() {
  return (
    <svg className="flag" viewBox="0 0 60 40" aria-hidden="true">
      <clipPath id="uk-flag">
        <rect width="60" height="40" />
      </clipPath>
      <g clipPath="url(#uk-flag)">
        <rect width="60" height="40" fill="#012169" />
        <path d="M0 0 L60 40 M60 0 L0 40" stroke="#fff" strokeWidth="10" />
        <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="6" />
        <path d="M30 0 V40 M0 20 H60" stroke="#fff" strokeWidth="16" />
        <path d="M30 0 V40 M0 20 H60" stroke="#C8102E" strokeWidth="9" />
      </g>
    </svg>
  );
}

export function LangSwitch({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { lang, setLang, t } = useI18n();

  function choose(next: Lang) {
    setLang(next);
  }

  return (
    <div className={tone === "light" ? "lang light" : "lang"} role="group" aria-label={t("language")}>
      <button type="button" className={lang === "en" ? "on" : ""} aria-pressed={lang === "en"} onClick={() => choose("en")}>
        <FlagEN />
        EN
      </button>
      <button type="button" className={lang === "de" ? "on" : ""} aria-pressed={lang === "de"} onClick={() => choose("de")}>
        <FlagDE />
        DE
      </button>
    </div>
  );
}
