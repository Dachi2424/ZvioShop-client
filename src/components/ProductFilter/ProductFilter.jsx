import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"
import "./ProductFilter.scss";

const BRANDS = [
  "Blizzaro", "Mutlu", "IronCell", "PowerPeak",
  "ArcMax", "TerraVolt", "Nordic Amp", "RedlinePower",
];

const ProductFilter = ({ filters, onChange, onReset }) => {
  const [local, setLocal] = useState(filters);
  const { t } = useTranslation()

  useEffect(() => { setLocal(filters); }, [filters]);

  const set = (key, value) => setLocal((s) => ({ ...s, [key]: value }));

  const apply = (e) => {
    e.preventDefault();
    onChange(local);
    console.log(local)
  };

  return (
    <form className="product-filter" onSubmit={apply}>
      <h3 className="product-filter__title">{t("productFilter_title")}</h3>

      <div className="field">
        <label>{t("productFilter_search")}</label>
        <input
          type="text"
          placeholder={t("productFilter_battery-name")}
          value={local.search}
          onChange={(e) => set("search", e.target.value)}
        />
      </div>

      <div className="field">
        <label>{t("productFilter_brand")}</label>
        <select value={local.brand} onChange={(e) => set("brand", e.target.value)}>
          <option value="">{t("productFilter_all-brands")}</option>
          {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      <div className="field">
        <label>{t("productFilter_price")} (₾)</label>
        <div className="range">
          <input type="number" min="0" placeholder={t("productFilter_min")}
            value={local.minPrice} onChange={(e) => set("minPrice", e.target.value)} />
          <span>—</span>
          <input type="number" min="0" placeholder={t("productFilter_max")}
            value={local.maxPrice} onChange={(e) => set("maxPrice", e.target.value)} />
        </div>
      </div>

      <div className="field">
        <label>{t("productFilter_amperage")} (Ah)</label>
        <div className="range">
          <input type="number" min="0" placeholder={t("productFilter_min")}
            value={local.minAmperage} onChange={(e) => set("minAmperage", e.target.value)} />
          <span>—</span>
          <input type="number" min="0" placeholder={t("productFilter_max")}
            value={local.maxAmperage} onChange={(e) => set("maxAmperage", e.target.value)} />
        </div>
      </div>

      <div className="field">
        <label>{t("productFilter_warranty")} ({t("productFilter_years")})</label>
        <div className="range">
          <input type="number" min="0" placeholder={t("productFilter_min")}
            value={local.minWarranty} onChange={(e) => set("minWarranty", e.target.value)} />
          <span>—</span>
          <input type="number" min="0" placeholder={t("productFilter_max")}
            value={local.maxWarranty} onChange={(e) => set("maxWarranty", e.target.value)} />
        </div>
      </div>

      <div className="actions">
        <button type="submit" className="apply">{t("productFilter_apply")}</button>
        <button type="button" className="reset" onClick={onReset}>{t("productFilter_reset")}</button>
      </div>
    </form>
  );
};

export default ProductFilter;
