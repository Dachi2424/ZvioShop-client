import { Zap, BatteryCharging } from "lucide-react";
import "./Hero.scss";
import { useTranslation } from "react-i18next";


export default function Hero() {
  
  const { t } = useTranslation()

  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="app__badge">
            <span className="app__badge__dot"></span>
            {t("hero_instock")}
          </span>

          <h1 className="display hero__title">{t("hero_power-that")}<br /><span className="accent">{t("hero_starts")}</span> {t("hero_every-time")}</h1>
          <p className="hero__desc">{t("hero_description")}</p>
          <div className="hero__actions">
            <a href="#contacts" className="btn btn--primary">{t("hero_call-the-shop")}</a>
            <a href="#faq" className="btn btn--outline">{t("hero_quote")}</a>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__glow" />
          <BatteryCharging className="hero__icon hero__icon--main" />
          <Zap className="hero__icon hero__icon--spark" />
        </div>
      </div>
    </section>
  );
}