import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {useTranslation} from "react-i18next"
import NoImage from "../../assets/no-image.webp"
import AnimatedLink from "../../components/AnimatedLink";
import { Helmet } from "react-helmet-async"
import "./Details.scss";

export default function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [loading, setLoading] = useState(true);
  const [brokenImages, setBrokenImages] = useState({});
  const [mainImgLoaded, setMainImgLoaded] = useState(false);

  const { t } = useTranslation()

  useEffect(() => {

    async function getDetails(){
      try{
        const res = await axios.get(`https://zvioshop-server-production.up.railway.app/products/${id}`)
        setProduct(res.data);
        setActiveImg(0)
      } catch(err){
        console.log(err)
      } finally{
        setLoading(false)
      }
    }

    getDetails()
  }, [id]);

  useEffect(() => {
    setMainImgLoaded(false);
  }, [activeImg]);

  if (loading) return <div className="app__loader-container"><div className="app__loader" /></div>;
  if (!product) return (
    <div className="details__no-product-container page">
      <p>{t("detail_no-product")}.</p>
      <AnimatedLink to={-1} className="details__back details__back--no-product">← {t("detail_back-to-catalog")}</AnimatedLink>
    </div>)

  const images = Array.isArray(product.image) && product.image.length ? product.image : [NoImage];

  function getSrc(i) {
    return brokenImages[i] ? NoImage : images[i];
  }

  function markBroken(i) {
    setBrokenImages((prev) => ({ ...prev, [i]: true }));
  }

  return (
    <>
      <Helmet>
        <title>{t("titles.details")}</title>
      </Helmet>
      <div className="details page">
        <div className="container">
          <AnimatedLink to={-1} className="details__back">← {t("detail_back-to-catalog")}</AnimatedLink>

          <div className="details__grid">
            {/* Gallery */}
            <div className="details__gallery">
              <div className="details__main-image">
                {!mainImgLoaded && <div className="details__image-skeleton" />}
                <img
                  src={getSrc(activeImg)}
                  alt={product.name}
                  style={{ opacity: mainImgLoaded ? 1 : 0 }}
                  onLoad={() => setMainImgLoaded(true)}
                  onError={() => { markBroken(activeImg); setMainImgLoaded(true); }}
                />
              </div>
              {images.length > 1 && (
                <div className="details__thumbs">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      className={`details__thumb ${i === activeImg ? "is-active" : ""}`}
                      onClick={() => setActiveImg(i)}
                    >
                      <img
                        src={getSrc(i)}
                        alt={`${product.name} ${i + 1}`}
                        onError={() => markBroken(i)}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="details__info">
              <span className="app__badge app__badge--self-centered">
                <span className="app__badge__dot"></span>
                {t("hero_instock")}
              </span>
              <div className="details__brand">{product.brand}</div>
              <h1 className="display details__title">{product.name}</h1>

              <div className="details__price">₾{Number(product.price).toFixed(2)}</div>

              <div className="details__stats">
                <div className="details__stat">
                  <span className="details__stat-value">{product.amperage}</span>
                  <span className="details__stat-label">Ah</span>
                </div>
                <div className="details__stat">
                  <span className="details__stat-value">{Number(product.voltage)}</span>
                  <span className="details__stat-label">Volt</span>
                </div>
                <div className="details__stat">
                  <span className="details__stat-value">{product.warranty ?? "—"}</span>
                  <span className="details__stat-label">{t("detail_warranty")}</span>
                </div>
              </div>

              <div className="details__cta">
                <a href="tel:+995555777518" className="btn btn--primary">{t("detail_call-the-shop")}</a>
                <Link to="/products" className="btn btn--outline">{t("detail_browse-more")}</Link>
              </div>

              <ul className="details__perks">
                <li>{t("detail_free-instalation")}</li>
                <li>{t("detail_buy-back")}</li>
                <li>{t("detail_tested")}</li>
              </ul>
            </div>
          </div>

          {/* Spec table */}
          <section className="details__specs">
            <h2 className="details__specs-title">{t("detail_specifications")}</h2>
            <dl className="details__spec-list">
              <div><dt>{t("detail_brand")}</dt><dd>{product.brand}</dd></div>
              <div><dt>{t("detail_amperage")}</dt><dd>{product.amperage} Ah</dd></div>
              <div><dt>{t("detail_voltage")}</dt><dd>{Number(product.voltage)} V</dd></div>
              <div><dt>{t("detail_warranty2")}</dt><dd>{product.warranty ? `${product.warranty} ${t("detail_years")}` : "—"}</dd></div>
              <div><dt>SKU</dt><dd>#{String(product.id).padStart(5, "0")}</dd></div>
            </dl>
          </section>
        </div>
      </div>
    </>
  );
}