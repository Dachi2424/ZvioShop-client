import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/admin`,
  withCredentials: true,
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

export const signIn = (password) => api.post("/signin", { password });
export const signOut = () => api.delete("/logout");
export const verify = () => api.get("/verify");

export const adminListProducts = (params = {}) =>
  axios.get(`${import.meta.env.VITE_API_URL}/products`, { params }).then((res) => res.data);

export const adminGetProduct = (id) =>
  axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`).then((res) => res.data);
export const adminCreateProduct = (payload) => api.post("/", payload);
export const adminUpdateProduct = (id, payload) => api.patch(`/edit-product/${id}`, payload);
export const adminDeleteProduct = (id) => api.delete(`/${id}`);