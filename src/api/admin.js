import axios from "axios";

const api = axios.create({
  baseURL: "https://zvioshop-server-production.up.railway.app/admin",
  withCredentials: true, // sends/receives the httpOnly cookie automatically
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const status = err.response?.status;
    const message = err.response?.data?.error || `Request failed (${status ?? "network"})`;
    return Promise.reject(new Error(message));
  }
);

// auth
export const signIn = (password) => api.post("/signin", { password });
export const signOut = () => api.delete("/logout");
export const verify = () => api.get("/verify");

// products (admin)
// no admin-only list route exists yet — reuse your public products endpoint
export const adminListProducts = (params = {}) =>
  axios.get("https://zvioshop-server-production.up.railway.app/products", { params }).then((res) => res.data);

export const adminCreateProduct = (payload) => api.post("/", payload);
export const adminUpdateProduct = (id, payload) => api.patch(`/edit-product/${id}`, payload);
export const adminDeleteProduct = (id) => api.delete(`/${id}`);