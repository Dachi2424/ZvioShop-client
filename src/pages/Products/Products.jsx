import { useEffect, useState } from "react";
import axios from "axios";
import ProductFilter from "../../components/ProductFilter/ProductFilter";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import {useTranslation} from "react-i18next"
import "./Products.scss";
import { useLocation } from "react-router-dom";

const DEFAULT_FILTERS = {
  search: "",
  brand: "",
  minPrice: "",
  maxPrice: "",
  minAmperage: "",
  maxAmperage: "",
  minWarranty: "",
  maxWarranty: "",
};

export default function Products() {
  
  const location = useLocation()
  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    brand: location.state?.brand || ""
  });
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    products: [],
    total: 0,
    totalPages: 1,
    page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {t} = useTranslation()
  


  

  useEffect(() => {
    fetchProducts();
  }, [filters, page]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    })
  }, [page])

  

  async function fetchProducts() {



    //if there is no state from Brands section in home page
    try {
      setLoading(true);
      setError("");
      const params = {
        page,
        limit: 24,
      };

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== "") {
          params[key] = value;
        }
      });

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
        params,
      });
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="products-page page">
      <header className="products-page__header">
        <span className="app__badge">
          <span className="app__badge__dot"></span>
          {t("hero_instock")}
        </span>

        <h1 className="products-page__title">
          {t("products_title-part1")} <span className="accent">{t("products_title-part2")}</span>
        </h1>

        <p className="products-page__subtitle">
          {t("products_subtitle")}
        </p>
      </header>

      {/* 🔥 THIS IS THE IMPORTANT PART */}
      <div className="products-page__layout">

        {/* LEFT SIDEBAR */}
        <aside className="products-page__sidebar">
          <ProductFilter
            filters={filters}
            onChange={(newFilters) => {
              setFilters(newFilters);
              setPage(1);
            }}
            onReset={() => {
              setFilters(DEFAULT_FILTERS);
              setPage(1);
            }}
          />
        </aside>

        {/* RIGHT CONTENT */}
        <main className="products-page__main">

          <div className="products-page__meta">
            {loading ? `${t("products_loading")}...` : `${data.total} ${data.total === 1 ? t("products_product") : t("products_products")}`}
          </div>

          {error && (
            <div className="products-page__error">{error}</div>
          )}

          <ProductGrid
            products={data.products}
            loading={loading}
          />

          {data.totalPages > 1 && (
            <div className="products-page__pagination">

              <button
                className="pg-btn"
                disabled={page === 1}
                onClick={() => {
                  window.scrollTo(0, 0)
                  setPage((p) => p - 1)
                }}
              >
                ← {t("products_prev")}
              </button>

              <span className="pg-info">
                {t("products_page")} {data.page} / {data.totalPages}
              </span>

              <button
                className="pg-btn"
                disabled={page === data.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                {t("products_next")} →
              </button>
            </div>
          )}

        </main>
      </div>
    </section>
  );
}