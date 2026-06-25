import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminCreateProduct, adminUpdateProduct, adminListProducts } from "../../api/admin";
import "./ProductForm.scss";

const empty = {
  name: "",
  brand: "",
  price: "",
  amperage: "",
  voltage: "",
  image: [],
};

export default function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(empty);
  const [images, setImages] = useState([""]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const data = await adminListProducts();
        const list = Array.isArray(data) ? data : data.products || [];
        const found = list.find((p) => String(p.id) === String(id));
        if (found) {
          setForm({ ...empty, ...found });
          if (Array.isArray(found.image) && found.image.length) {
            setImages(found.image);
          }
        }
      } catch (err) {
        setError(err.message);
      }
    })();
  }, [id, isEdit]);

  function update(key) {
    return (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  }

  function updateImage(i, val) {
    setImages((arr) => arr.map((v, idx) => (idx === i ? val : v)));
  }

  const addImage = () => setImages((a) => [...a, ""]);
  const removeImage = (i) => setImages((a) => a.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    const cleanImages = images.map((s) => s.trim()).filter(Boolean);
    const payload = {
      ...form,
      price: Number(form.price),
      image: cleanImages,
    };
    try {
      if (isEdit) await adminUpdateProduct(id, payload);
      else await adminCreateProduct(payload);
      navigate("/adminzviobattery/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="product-form">
      <h1>{isEdit ? "პროდუქტის რედაქტირება" : "ახალი პროდუქტი"}</h1>
      <form onSubmit={handleSubmit} className="product-form__form">
        <div className="row row__double">
          <label>დასახელება<input value={form.name} onChange={update("name")} required /></label>
        </div>
        <div className="row">
          <label>ბრენდი<input value={form.brand} onChange={update("brand")} /></label>
          <label>ფასი (₾)<input type="number" step="0.01" value={form.price} onChange={update("price")} required /></label>
        </div>
        <div className="row">
          <label>სიმძლავრე (Ah)<input type="number" value={form.amperage} onChange={update("amperage")} /></label>
          <label>ძაბვა (V)<input value={form.voltage} onChange={update("voltage")} /></label>
        </div>

        <fieldset className="product-form__images">
          <legend>სურათების URL-ები</legend>
          {images.map((url, i) => (
            <div key={i} className="image-row">
              <input
                type="url"
                placeholder="https://..."
                value={url}
                onChange={(e) => updateImage(i, e.target.value)}
              />
              {images.length > 1 && (
                <button type="button" onClick={() => removeImage(i)} className="btn btn--danger">×</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addImage} className="btn btn--ghost">+ სურათის დამატება</button>
        </fieldset>

        {error && <p className="product-form__error">{error}</p>}

        <div className="product-form__actions">
          <button type="button" className="btn btn--ghost" onClick={() => navigate("/adminzviobattery/products")}>
            გაუქმება
          </button>
          <button type="submit" className="btn btn--primary" disabled={saving}>
            {saving ? "ინახება..." : "შენახვა"}
          </button>
        </div>
      </form>
    </div>
  );
}