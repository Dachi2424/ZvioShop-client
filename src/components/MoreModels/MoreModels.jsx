import { useTranslation } from "react-i18next";
import MacPower from "../../assets/macpower.jpg"
import Grif from "../../assets/grif.jpg"
import Energy from "../../assets/energy.webp"
import Platin from "../../assets/platin.jpg"
import Yigit from "../../assets/yigit.jpg"
import "./MoreModels.scss";

const extraModels = [
  { name: "Macpower", image: MacPower },
  { name: "Grif", image: Grif },
  { name: "Energy Premium", image: Energy },
  { name: "Platin", image: Platin },
  { name: "Yigit Aku", image: Yigit },
];

export default function MoreModels() {
  const { t } = useTranslation();

  return (
    <section className="section more-models">
      <div className="container">
        <div className="more-models__text">
          <h2 className="more-models__title">{t("moreModels_title")}</h2>
          <p className="more-models__subtitle">{t("moreModels_subtitle")}</p>
        </div>

        <div className="more-models__shelf">
          {extraModels.map((model) => (
            <div className="more-models__item" key={model.name}>
              <div className="more-models__imgwrap">
                <img src={model.image} alt={model.name} />
              </div>
              <span className="more-models__name">{model.name}</span>
            </div>
          ))}
        </div>

        <a href="#contacts" className="btn btn--outline more-models__cta">
          {t("moreModels_cta")}
        </a>
      </div>
    </section>
  );
}