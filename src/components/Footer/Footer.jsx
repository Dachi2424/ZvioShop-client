import { Zap, Check, MapPin, Phone } from "lucide-react";
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

        <div className="footer__contact">
          <a href="https://maps.google.com/?q=თბილისი,წერეთლის+გამზირი+59" target="_blank" rel="noreferrer" className="footer__contact-item">
            <MapPin />
            <span>{t("footer_address")}</span>
          </a>
          <a href="tel:+995555777518" className="footer__contact-item">
            <Phone />
            <span>+995 555 777 518</span>
          </a>
        </div>

        <div className="footer__note">
          <Check />
          <span>{t("footer_offers")}</span>
        </div>
      </div>
    </footer>
  );
}