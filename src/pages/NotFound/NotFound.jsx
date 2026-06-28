import { Link } from "react-router-dom";
import "./NotFound.scss";
import { useTranslation } from "react-i18next"
import { Helmet } from "react-helmet-async"

export default function NotFound() {
  
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t("titles.notFound")}</title>
      </Helmet>
      <div className="not-found">
        <div className="not-found__glow" />
        <div className="container not-found__container">
          <div className="not-found__code display">
            <span>4</span>
            <span className="not-found__battery">
              <svg viewBox="0 0 80 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="2" y="2" width="70" height="48" rx="6" stroke="#F4C022" strokeWidth="3.5"/>
                <rect x="74" y="17" width="6" height="18" rx="2" fill="#F4C022"/>
                <path d="M36 16 L28 28 H36 L28 38" stroke="#F4C022" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span>4</span>
          </div>

          <p className="not-found__label">{t("notFound_not-found")}</p>
          <h1 className="not-found__heading display">{t("notFound_dead-on-arrival")}</h1>
          <p className="not-found__sub">{t("notFound_no-charge")}</p>

          <div className="not-found__actions">
            <Link to="/" className="btn btn--primary">{t("notFound_go-home")}</Link>
            <Link to="/products" className="btn btn--outline">{t("notFound_browse")}</Link>
          </div>
        </div>
      </div>
    </>
  );
}