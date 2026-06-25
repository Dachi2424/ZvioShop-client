import { BatteryFull } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./Brands.scss";

const brands = [
  "VoltCore",
  "Duracrank",
  "IronCell",
  "PowerPeak",
  "ArcMax",
  "TerraVolt",
  "Nordic Amp",
  "RedlinePower",
];

export default function Brands() {

  const {t} = useTranslation()

  return (
    <section id="brands" className="section brands">
      <div className="container">
        <h2 className="display section__title">{t("brands_title")}</h2>
        <p className="section__subtitle">{t("brands_subtitle")}</p>

        <div className="brands__grid">
          {brands.map((brand) => (
            <div className="brands__card" key={brand}>
              <BatteryFull className="brands__icon" />
              <span className="brands__name">{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}