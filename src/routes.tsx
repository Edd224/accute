import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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

// Wrapper pre animáciu jednotlivých stránok
const AnimatedPage = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }} // Začiatočný stav (priehľadný a posunutý)
    animate={{ opacity: 1, y: 0 }}  // Cieľový stav (viditeľný a späť na 0)
    exit={{ opacity: 0, y: -20 }}   // Stav pri odchode (miznutie hore)
    transition={{ duration: 0.5 }}  // Trvanie animácie
  >
    {children}
  </motion.div>
);

const AppRoutes = () => {
  const location = useLocation(); // Získanie aktuálnej lokácie

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/profile" element={<AnimatedPage><Profile /></AnimatedPage>} />
        <Route path="/cart" element={<AnimatedPage><Cart /></AnimatedPage>} />
        <Route path="/checkout" element={<AnimatedPage><Checkout /></AnimatedPage>} />
        <Route path="/thank-you" element={<AnimatedPage><ThankYou /></AnimatedPage>} />
        <Route path="/dashboard" element={<AnimatedPage><Dashboard /></AnimatedPage>} />
        <Route path="/categories" element={<AnimatedPage><Categories /></AnimatedPage>} />
        <Route path="/products/:category" element={<AnimatedPage><ProductsListing /></AnimatedPage>} />
        <Route path="/product/:id" element={<AnimatedPage><ProductDetails /></AnimatedPage>} />
        <Route path="/wishlist" element={<AnimatedPage><Wishlist /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
