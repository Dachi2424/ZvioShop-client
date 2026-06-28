import { useState } from "react";
import "./FAQ.scss";
import { useTranslation } from "react-i18next";



export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const {t} = useTranslation()

  const faqs = [
    {
      q: t("FAQ_question1"),
      a: t("FAQ_answer1"),
    },
    {
      q: t("FAQ_question2"),
      a: t("FAQ_answer2"),
    },
    {
      q: t("FAQ_question3"),
      a: t("FAQ_answer3"),
    },
    {
      q: t("FAQ_question4"),
      a: t("FAQ_answer4"),
    },
    {
      q: t("FAQ_question5"),
      a: t("FAQ_answer5"),
    },
  ];

  const toggle = (i) => {
    setOpenIndex((current) => (current === i ? null : i));
  };

  return (
    <section id="faq" className="section faq">
      <div className="container">
        <h2 className="display section__title">{t("FAQ_title")}</h2>
        <p className="section__subtitle">{t("FAQ_subtitle")}</p>

        <div className="faq__list">
          {faqs.map((item, i) => (
            <div className="faq__item" key={item.q}>
              <button
                className="faq__question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                {item.q}
                <span className={`faq__icon ${openIndex === i ? "faq__icon--open" : ""}`}>+</span>
              </button>
              <div className={`faq__answer-wrap ${openIndex === i ? "faq__answer-wrap--open" : ""}`}>
                <p className="faq__answer">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}