import { useTranslation } from "react-i18next";
import "./MoreModels.scss";

const extraModels = [
  "Macpower",
  "Grif",
  "Energy Premium",
  "Platin",
  "Yigit Aku",
];

export default function MoreModels() {
  const { t } = useTranslation();

  return (
    <section className="section more-models">
      <div className="container more-models__inner">
        <div className="more-models__text">
          <h2 className="more-models__title">{t("moreModels_title")}</h2>
          <p className="more-models__subtitle">{t("moreModels_subtitle")}</p>
        </div>

        <div className="more-models__list">
          {extraModels.map((model) => (
            <span className="more-models__pill" key={model}>
              {model}
            </span>
          ))}
        </div>

        <a href="#contacts" className="btn btn--outline more-models__cta">
          {t("moreModels_cta")}
        </a>
      </div>
    </section>
  );
}