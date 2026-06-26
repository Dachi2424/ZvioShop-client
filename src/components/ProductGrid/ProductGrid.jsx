import "./ProductGrid.scss";
import NoImage from "../../assets/no-image.webp"
import {useTranslation} from "react-i18next"
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const img = Array.isArray(product.image) && product.image.length > 0
    ? product.image[0]
    : null;

  const navigate = useNavigate()
  const { t } = useTranslation()

  function handleNavigateToDetails(id){
    navigate(`/product/${id}`)
  }

  return (
    <article className="product-card">
      <div onClick={() => handleNavigateToDetails(product.id)} className="product-card__media">
        {img ? (
          <img className="product-card__image" src={img} alt={product.name} />
        ) : (
          <img className="product-card__image" src={NoImage} alt="No battery image" />
        )}

        {product.warranty !== null && product.warranty !== 0 && (
          <span className="badge">
            {t("card_warranty")}: {product.warranty} {t("card_year")}
          </span>
        )}
      </div>

      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="brand">{product.brand}</p>
        <div className="product-card__specs-div">
          <span>{product.amperage}AH</span>
          <span>{parseFloat(product.voltage)}V</span>
        </div>
        <p className="product-card__price">₾{product.price}</p>
        <button className="btn btn--primary" onClick={() => handleNavigateToDetails(product.id)}>Details</button>
      </div>
    </article>
  );
};




export default function ProductGrid({products = [], loading}) {


  const { t } = useTranslation()


  if (loading) //this shouldnt have !
    return <div className="product-grid__loader-div"><div className="loader"></div></div>;

  if (!products.length) //this should have !
    return <div className="product-grid__products-not-found"><span>{t("productGrid_no-product")}.</span></div>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}