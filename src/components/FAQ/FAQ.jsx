import { useState } from "react";
import "./FAQ.scss";
import { useTranslation } from "react-i18next";

const faqs = [
  {
    q: "How do I know which battery fits my car?",
    a: "Check your current battery's label for group size, CCA rating, and terminal layout. Match those numbers to the spec strip on any listing — if you're unsure, call the shop and we'll confirm fitment for your make and model.",
  },
  {
    q: "Do you install the battery?",
    a: "Every order includes free curbside installation in supported areas. Our tech tests your charging system, removes the old battery, and installs the new one in about 15 minutes.",
  },
  {
    q: "What happens to my old battery?",
    a: "We take it for recycling at no charge. Lead-acid batteries are over 95% recyclable, and we make sure yours doesn't end up in a landfill.",
  },
  {
    q: "What does the warranty actually cover?",
    a: "Free replacement for manufacturing defects or premature failure within the warranty period — no pro-rating, no receipts required if you registered at checkout.",
  },
  {
    q: "Can I pay on delivery?",
    a: "Yes, cash and card payments are both accepted at the time of delivery or installation.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const {t} = useTranslation()

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