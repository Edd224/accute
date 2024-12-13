// storage.ts

// Uloženie hodnoty do localStorage
export const saveToLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };
  
  // Načítanie hodnoty z localStorage
  export const getFromLocalStorage = (key: string): string | null => {
    return localStorage.getItem(key);
  };
  
  // Odstránenie hodnoty z localStorage
  export const removeFromLocalStorage = (key: string) => {
    localStorage.removeItem(key);
  };
  