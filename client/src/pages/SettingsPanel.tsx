import { useEffect, useState, type FormEvent } from "react";
import { api } from "../api";
import { useI18n } from "../i18n";

type Settings = {
  email48: boolean;
  email24: boolean;
  whatsapp48: boolean;
  whatsapp24: boolean;
  phone: string;
  prefillAfterClose: boolean;
};

const empty: Settings = {
  email48: false,
  email24: false,
  whatsapp48: false,
  whatsapp24: false,
  phone: "",
  prefillAfterClose: false,
};

export function SettingsPanel() {
  const { t } = useI18n();
  const [settings, setSettings] = useState<Settings>(empty);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api<Settings>("/api/auth/settings")
      .then(setSettings)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "couldNotLoadSettings"));
  }, []);

  function update(patch: Partial<Settings>) {
    setSettings((current) => ({ ...current, ...patch }));
    setNotice("");
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const saved = await api<Settings>("/api/auth/settings", {
        method: "PUT",
        body: JSON.stringify(settings),
      });
      setSettings(saved);
      setNotice("settingsSaved");
    } catch (err) {
      setError(err instanceof Error ? err.message : "couldNotSaveSettings");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="card stack" onSubmit={(event) => void save(event)}>
      <h2>{t("settingsTitle")}</h2>
      <p className="muted">{t("settingRemindTitle")}</p>
      <label className="check">
        <input
          type="checkbox"
          checked={settings.email48}
          onChange={(event) => update({ email48: event.target.checked })}
        />
        <span>{t("settingEmail48")}</span>
      </label>
      <label className="check">
        <input
          type="checkbox"
          checked={settings.email24}
          onChange={(event) => update({ email24: event.target.checked })}
        />
        <span>{t("settingEmail24")}</span>
      </label>
      <label className="check">
        <input
          type="checkbox"
          checked={settings.whatsapp48}
          onChange={(event) => update({ whatsapp48: event.target.checked })}
        />
        <span>{t("settingWhatsapp48")}</span>
      </label>
      <label className="check">
        <input
          type="checkbox"
          checked={settings.whatsapp24}
          onChange={(event) => update({ whatsapp24: event.target.checked })}
        />
        <span>{t("settingWhatsapp24")}</span>
      </label>
      {settings.whatsapp48 || settings.whatsapp24 ? (
        <label>
          {t("settingPhone")}
          <input
            value={settings.phone}
            onChange={(event) => update({ phone: event.target.value })}
            inputMode="tel"
            autoComplete="tel"
            placeholder={t("settingPhoneHelp")}
            aria-label={t("settingPhone")}
          />
        </label>
      ) : null}
      <p className="muted">{t("settingRemindHelp")}</p>
      <p className="muted">{t("settingPrefillTitle")}</p>
      <label className="check">
        <input
          type="checkbox"
          checked={settings.prefillAfterClose}
          onChange={(event) => update({ prefillAfterClose: event.target.checked })}
        />
        <span>{t("settingPrefillAfter")}</span>
      </label>
      <p className="note">{t("settingAlways")}</p>
      {error ? <p className="alert">{t(error)}</p> : null}
      {notice ? <p className="note">{t(notice)}</p> : null}
      <button className="primary" type="submit" disabled={busy}>
        {busy ? t("saving") : t("settingSave")}
      </button>
    </form>
  );
}
