import { Link } from "react-router-dom";
import { LangSwitch } from "../LangSwitch";
import { WinterMark } from "../WinterMark";
import { useI18n } from "../i18n";

const licenseUrl = "https://www.apache.org/licenses/LICENSE-2.0";

export function AboutPage({ signedIn }: { signedIn: boolean }) {
  const { t } = useI18n();

  return (
    <div className="gate">
      <div className="gate-tools">
        <LangSwitch tone="light" />
      </div>
      <p className="eyebrow">{t("season")}</p>
      <h1>
        <WinterMark />
        {t("aboutTitle")}
      </h1>
      <div className="stack about">
        <p>{t("aboutMade")}</p>
        <p>{t("aboutBody")}</p>
        <p>
          {t("aboutCopyright")}
          <br />
          <a href={licenseUrl}>{t("aboutLicense")}</a>
        </p>
        <p className="muted">{t("aboutFis")}</p>
        <p className="switch">
          <Link to={signedIn ? "/account" : "/login"}>{t("aboutBack")}</Link>
        </p>
      </div>
    </div>
  );
}
