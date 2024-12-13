import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes"; // Uistite sa, že cesta k routes.tsx je správna
import { Provider } from "react-redux";
import { store } from "./app/store"; // Predpokladáme, že máte nastavený Redux store
import Header from "./components/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import productsData from "./mock/products.json"; // Import produktových dát z JSON súboru
import { setProducts } from "./features/products/productsSlice";

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Načítanie dát z JSON a uloženie do Redux Store
    dispatch(setProducts(productsData));
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <AppRoutes />
    </Router>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
