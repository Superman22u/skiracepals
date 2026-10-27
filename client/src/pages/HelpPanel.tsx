import { useI18n } from "../i18n";

const topics = ["helpBetting", "helpDue", "helpStart", "helpSettings", "helpGroups", "helpComments", "helpNews"] as const;

export function HelpPanel() {
  const { t } = useI18n();
  return (
    <section className="stack">
      <h2>{t("sectionHelp")}</h2>
      {topics.map((topic) => (
        <p className="card help-card" key={topic}>
          {t(topic)}
        </p>
      ))}
    </section>
  );
}
