import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Slider.scss";
import { useTranslation } from "react-i18next";



const AUTOPLAY_MS = 5000;

export default function Slider() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const {t} = useTranslation()

  const slides = [
  {
    src: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&q=80",
    alt: "Row of new car batteries on a shelf",
    caption: t("slider_caption1"),
  },
  {
    src: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=1200&q=80",
    alt: "Mechanic installing a car battery",
    caption: t("slider_caption1"),
  },
  {
    src: "https://images.unsplash.com/photo-1632823469850-1b7b1e8e1d6e?w=1200&q=80",
    alt: "Car engine bay close up",
    caption: t("slider_caption1"),
  },
  {
    src: "https://images.unsplash.com/photo-1486326658623-d8d3f5b75f51?w=1200&q=80",
    alt: "Battery testing equipment",
    caption: t("slider_caption1"),
  },
  {
    src: "https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=1200&q=80",
    alt: "Warehouse aisle with batteries",
    caption: t("slider_caption1"),
  },
];


  const goTo = useCallback((i) => {
    setIndex(((i % slides.length) + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);

    return () => clearInterval(timerRef.current);
  }, []);

  const restartTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
  };

  const handleManual = (action) => {
    action();
    restartTimer();
  };

  return (
    <section id="gallery" className="section slider">
      <div className="container">
        <h2 className="display section__title">{t("slider_title")}</h2>
        <p className="section__subtitle">{t("slider_subtitle")}</p>

        <div className="slider__viewport">
          <div
            className="slider__track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((slide) => (
              <div className="slider__slide" key={slide.src}>
                <img src={slide.src} alt={slide.alt} loading="lazy" />
                <div className="slider__caption">{slide.caption}</div>
              </div>
            ))}
          </div>

          <button
            className="slider__arrow slider__arrow--prev"
            onClick={() => handleManual(prev)}
            aria-label="Previous slide"
          >
            <ChevronLeft />
          </button>
          <button
            className="slider__arrow slider__arrow--next"
            onClick={() => handleManual(next)}
            aria-label="Next slide"
          >
            <ChevronRight />
          </button>
        </div>

        <div className="slider__dots">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              className={`slider__dot ${i === index ? "slider__dot--active" : ""}`}
              onClick={() => handleManual(() => goTo(i))}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}