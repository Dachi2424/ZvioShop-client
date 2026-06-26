import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, verify } from "../../api/admin";
import "./AdminSignIn.scss";
import { useEffect } from "react";

export default function AdminSignIn() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    verify()
    .then(res => res.admin ? navigate(`/${import.meta.env.VITE_ADMIN_ROUTE}/products`) : null)
    .catch(() => console.log("not logged in"))
  }, [])


  async function handleSubmit(e){
    e.preventDefault();
    setError("");
    setButtonLoading(true);
    try {
      await signIn(password); // backend sets the httpOnly cookie itself
      navigate(`/${import.meta.env.VITE_ADMIN_ROUTE}/products`);
    } catch (err) {
      setError(err.message);
    } finally {
      setButtonLoading(false);
    }
  }


  return (
    <div className="admin-signin">
      <form className="admin-signin__card" onSubmit={handleSubmit}>
        <h1>ადმინ პანელი</h1>
        <label>
          პაროლი
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
          />
        </label>
        {error && <p className="admin-signin__error">{error}</p>}
        <button type="submit" disabled={buttonLoading}>
          {buttonLoading ? "მიმდინარეობს..." : "შესვლა"}
        </button>
      </form>
    </div>
  );
}