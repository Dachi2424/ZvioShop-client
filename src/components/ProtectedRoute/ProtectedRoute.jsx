import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { verify } from "../../api/admin";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("checking"); // "checking" | "authed" | "guest"

  useEffect(() => {
    let cancelled = false;
    
    verify()
    .then(() => !cancelled && setStatus("authed"))
    .catch(() => !cancelled && setStatus("guest"));

    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "checking") return <div className="app__loader-container"><div className="app__loader"></div></div>;
  if (status === "guest") return <Navigate to={`/${import.meta.env.VITE_ADMIN_ROUTE}`} replace />;

  return children;
}