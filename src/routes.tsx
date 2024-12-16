import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Categories from "./pages/Categories";
import ProductsListing from "./pages/ProductsListing";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/home" />} /> 
      <Route path="/home" element={<Home />} />     
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/products/:category" element={<ProductsListing />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/wishlist" element={<Wishlist />} />

    </Routes>
  );
};

export default AppRoutes;
