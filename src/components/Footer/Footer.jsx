import { Zap, Check } from "lucide-react";
import "./Footer.scss";
import { useTranslation } from "react-i18next";

export default function Footer() {

  const {t} = useTranslation()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__logo">
          <Zap />
          <span className="display">
            Zvio<span className="accent">Shop</span>
          </span>
        </div>

        <p className="footer__copy">© 2026 ZvioShop. <span>{t("footer_all-rights-reserved")}</span>.</p>

        <div className="footer__note">
          <Check />
          <span>{t("footer_offers")}</span>
        </div>
      </div>
    </footer>
  );
}