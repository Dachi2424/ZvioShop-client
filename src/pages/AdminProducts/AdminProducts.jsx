import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminListProducts, adminDeleteProduct, signOut } from "../../api/admin";
import "./AdminProducts.scss";
import NoImage from "../../assets/no-image.webp"

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productsLoading, setProductsLoading] = useState(false)
  const navigate = useNavigate();


  async function loadProducts() {
    setProductsLoading(true)
    try {
      const data = await adminListProducts({ page, limit: 24 });
      setProducts(Array.isArray(data) ? data : data.products || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally{
      setProductsLoading(false)
    }
  }
  
  useEffect(() => {
    loadProducts();
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [page]);

  

  async function handleDelete(id) {
    if (!confirm("წავშალო ეს პროდუქტი?")) return;
    try {
      await adminDeleteProduct(id);
      setProducts((product) => product.filter((x) => x.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleLogout() {
    try {
      await signOut();
    } finally {
      navigate(`/${import.meta.env.VITE_ADMIN_ROUTE}`);
    }
  }

  return (
    <div className="admin-products">
      <header className="admin-products__header">
        <h1>პროდუქტები</h1>
        <div className="admin-products__actions">
          <Link to="/adminzviobattery/products/new" className="btn btn--primary">
            + ახალი პროდუქტი
          </Link>
          <button onClick={handleLogout} className="btn btn--ghost">გასვლა</button>
        </div>
      </header>

      {error && <p className="admin-products__error">{error}</p>}

      <div className="admin-products__grid">

        {productsLoading && <div className="admin-products__loading-container"><div className="app__loader"></div></div>}

        {products.map((product) => (
          <article key={product.id} className="admin-products__card">
            <img src={product.image?.[0] || NoImage} alt={product.name}/>
            {product.warranty > 0 && (
            <div className="admin-products__warranty">
              <span>გარანტია</span>
              <span>{product.warranty} წელი</span>
            </div>
            )}
            <div className="admin-products__body">
              <h3>{product.name}</h3>
              <p className="brand">{product.brand}</p>
              <div className="admin-products__specs-div">
                <span>{product.amperage}AH</span>
                <span>{parseFloat(product.voltage)}V</span>
              </div>
              <p className="price">{product.price} ₾</p>
              <div className="admin-products__card-actions">
                <Link to={`/${import.meta.env.VITE_ADMIN_ROUTE}/products/${product.id}/edit`} className="btn btn--ghost">
                  რედაქტირება
                </Link>
                <button onClick={() => handleDelete(product.id)} className="btn btn--danger">
                  წაშლა
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="admin-products__pagination">
          <button
            className="pg-btn"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ← წინა
          </button>
          <span className="pg-info">გვერდი {page} / {totalPages}</span>
          <button
            className="pg-btn"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            შემდეგი →
          </button>
        </div>
      )}
    </div>
  );
}