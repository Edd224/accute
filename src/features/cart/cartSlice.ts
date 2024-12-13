import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definovanie typu položky v košíku
interface CartItem {
  id: string;       // Unikátne ID produktu
  name: string;     // Názov produktu
  price: number;    // Cena produktu
  quantity: number; // Množstvo produktu v košíku
  image: string;    // Obrázok produktu
}

// Definovanie typu pre stav košíka
interface CartState {
  items: CartItem[]; // Pole produktov v košíku
}

// Počiatočný stav košíka
const initialState: CartState = {
  items: [], // Začínajúci košík je prázdny
};

// Vytvorenie slice pre košík
const cartSlice = createSlice({
  name: "cart", // Názov slice
  initialState, // Počiatočný stav
  reducers: {
    // Akcia na pridanie položky do košíka
    addToCart(state, action: PayloadAction<CartItem>) {
      // Skontroluje, či už položka existuje v košíku
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // Ak existuje, zvýši množstvo
        existingItem.quantity += action.payload.quantity;
      } else {
        // Ak neexistuje, pridá nový produkt
        state.items.push(action.payload);
      }
    },

    // Akcia na odstránenie položky z košíka
    removeFromCart(state, action: PayloadAction<string>) {
      // Odstráni produkt s daným ID
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // Akcia na zvýšenie množstva položky v košíku
    increaseQuantity(state, action: PayloadAction<string>) {
      // Nájde produkt v košíku podľa ID a zvýši jeho množstvo
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    // Akcia na zníženie množstva položky v košíku
    decreaseQuantity(state, action: PayloadAction<string>) {
      // Nájde produkt v košíku podľa ID a zníži jeho množstvo, ak je väčšie ako 1
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

// Exportovanie akcií, ktoré môžeme použiť na vykonanie operácií so stavom košíka
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
