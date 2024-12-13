// Importovanie potrebných funkcií z Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definovanie typu pre produkt
interface Product {
  id: string;        // Unikátne ID produktu
  name: string;      // Názov produktu
  category: string;  // Kategória produktu
  price: number;     // Cena produktu
  description: string; // Popis produktu
  image: string;     // URL obrázku produktu
}

// Definovanie typu pre stav produktov
interface ProductsState {
  products: Product[]; // Pole produktov
}

// Počiatočný stav, ktorý začína s prázdnym zoznamom produktov
const initialState: ProductsState = {
  products: [],
};

// Vytvorenie slice pre produkty
const productsSlice = createSlice({
  name: "products", // Názov slice
  initialState,     // Počiatočný stav
  reducers: {
    // Akcia na nastavenie produktov
    setProducts(state, action: PayloadAction<Product[]>) {
      // Uloží pole produktov do stavu na základe payloadu
      state.products = action.payload;
    },
  },
});

// Exportovanie akcie setProducts, ktorá mení stav produktov
export const { setProducts } = productsSlice.actions;

// Exportovanie samotného redukora, ktorý spracováva akcie a aktualizuje stav
export default productsSlice.reducer;
