const Home = lazy(() => import("./pages/Home/Home"));
const Products = lazy(() => import("./pages/Products/Products"));
const Details = lazy(() => import("./pages/Details/Details"));
import LanguageLoader from "./components/LanguageLoader/LanguageLoader";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import "./App.scss";

import { lazy, Suspense, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminSignIn from "./pages/AdminSignIn/AdminSignIn"
import AdminProducts from "./pages/AdminProducts/AdminProducts"
import ProductForm from "./pages/ProductForm/ProductForm"
import NotFound from "./pages/NotFound/NotFound";




export default function App() {

  const [languageLoader, setLanguageLoader] = useState(false)

  return (
    <BrowserRouter>
      <div className="app">
        <Header setLanguageLoader={setLanguageLoader} />
        {languageLoader && <LanguageLoader setLanguageLoader={setLanguageLoader} />}
        <Suspense fallback={<div className="app__loader-container"><div className="app__loader"></div></div>}>
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products/>} />
            <Route path="/product/:id" element={<Details />}/>

            <Route path={`/${import.meta.env.VITE_ADMIN_ROUTE}`} element={<AdminSignIn />} />
            <Route path={`/${import.meta.env.VITE_ADMIN_ROUTE}/products`} element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
            <Route path={`/${import.meta.env.VITE_ADMIN_ROUTE}/products/new`} element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
            <Route path={`/${import.meta.env.VITE_ADMIN_ROUTE}/products/:id/edit`} element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  );
}