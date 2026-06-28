import { useState } from "react";
import { Zap, Menu, X } from "lucide-react";
import "./Header.scss";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import AnimatedLink from "../AnimatedLink";


export default function Header({setLanguageLoader}) {
  const [open, setOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { label: `${t("header_brands")}`, href: "#brands" },
    { label: `${t("header_contacts")}`, href: "#contacts" },
    { label: `${t("header_FAQ")}`, href: "#faq" },
  ];

  const handleLinkClick = (href) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 250);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleLang = () => {
    setLanguageLoader(true)
    setTimeout(() => {
      const newLang = i18n.language === "en" ? "ka" : "en";
      setOpen(false)
      i18n.changeLanguage(newLang);
      localStorage.setItem("lang", newLang);
    }, 250)
  };

  return (
    <header className="nav">
      <div className="container nav__inner">
        <AnimatedLink to="/" className="nav__logo">
          <Zap strokeWidth={2.5} />
          <span className="display">Zvio<span className="accent">Shop</span></span>
        </AnimatedLink>

        <nav className="nav__links">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); handleLinkClick(l.href); }}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__right">
          <button className="nav__lang" onClick={toggleLang}>
            {i18n.language === "en" ? "ENG" : "GEO"}
          </button>
          <AnimatedLink to="/products" className="btn btn--primary nav__cta">{t("header_shop-now")}</AnimatedLink>
          <button
            className="nav__burger"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div className={`nav__mobile ${open ? "nav__mobile--open" : ""}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); handleLinkClick(l.href); }}>
            {l.label}
          </a>
        ))}
        <button className="nav__lang nav__lang--mobile" onClick={toggleLang}>
          {i18n.language === "en" ? "ENG" : "GEO"}
        </button>
      </div>
    </header>
  );
}