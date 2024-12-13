// Importovanie potrebných funkcií z Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definovanie typu pre položku v zozname prianí
interface WishlistItem {
  id: string;      // Unikátne ID položky
  name: string;    // Názov položky
  price: number;   // Cena položky
  image: string;   // URL obrázku položky
}

// Definovanie typu pre stav zoznamu prianí
interface WishlistState {
  items: WishlistItem[]; // Pole položiek v zozname prianí
}

// Počiatočný stav, ktorý začína s prázdnym zoznamom položiek
const initialState: WishlistState = {
  items: [],
};

// Vytvorenie slice pre wishlist (zoznam prianí)
const wishlistSlice = createSlice({
  name: "wishlist", // Názov slice
  initialState,     // Počiatočný stav
  reducers: {
    // Akcia na pridanie položky do wishlistu
    addToWishlist(state, action: PayloadAction<WishlistItem>) {
      // Skontroluje, či položka už existuje v zozname prianí
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        // Ak položka neexistuje, pridá ju do zoznamu prianí
        state.items.push(action.payload);
      }
    },
    // Akcia na odstránenie položky zo wishlistu
    removeFromWishlist(state, action: PayloadAction<string>) {
      // Filtruje položky v zozname prianí a odstraňuje položku s konkrétnym ID
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

// Exportovanie akcií, ktoré menia stav wishlistu
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

// Exportovanie samotného redukora, ktorý spracováva akcie a aktualizuje stav
export default wishlistSlice.reducer;
