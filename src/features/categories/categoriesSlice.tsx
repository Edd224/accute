// Importovanie potrebných funkcií z Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definovanie typu pre kategóriu
interface Category {
  id: string;   // Unikátne ID kategórie
  name: string; // Názov kategórie
}

// Definovanie typu pre stav kategórií
interface CategoriesState {
  categories: Category[]; // Pole kategórií
}

// Počiatočný stav s preddefinovanými kategóriami
const initialState: CategoriesState = {
  categories: [
    { id: "1", name: "Pánske oblečenie" },
    { id: "2", name: "Dámske oblečenie" },
    { id: "3", name: "Detské oblečenie" },
  ],
};

// Vytvorenie slice pre kategórie
const categoriesSlice = createSlice({
  name: "categories", // Názov slice
  initialState,       // Počiatočný stav
  reducers: {
    // Akcia na nastavenie kategórií
    setCategories(state, action: PayloadAction<Category[]>) {
      // Upraví pole kategórií v stave na základe payloadu
      state.categories = action.payload;
    },
  },
});

// Exportovanie akcie setCategories, ktorá bude mení stav kategórií
export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
