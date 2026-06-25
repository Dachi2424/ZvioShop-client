import { Phone } from "lucide-react";
import "./Contacts.scss";
import { useTranslation } from "react-i18next";


export default function Contacts() {

  const {t} = useTranslation()

  const staff = [
    { name: t("contacts_sergo"), role: "", phone: "+995 555 77 75 18" },
    { name: t("contacts_koba"), role: "", phone: "+995 593 19 01 07" },
    { name: t("contacts_zvio"), role: "", phone: "+995 555 26 30 31" },
  ];


  return (
    <section id="contacts" className="section contacts">
      <div className="container">
        <h2 className="display section__title">{t("contacts_title")}</h2>
        <p className="section__subtitle">{t("contacts_subtitle")}</p>

        <div className="grid grid--3">
          {staff.map((person) => (
            <a className="contacts__card" key={person.name} href={`tel:${person.phone.replace(/\s/g, "")}`}>
              <div className="contacts__icon">
                <Phone />
              </div>
              <h3 className="display contacts__name">{person.name}</h3>
              <p className="contacts__role">{person.role}</p>
              <p className="contacts__phone">{person.phone}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}