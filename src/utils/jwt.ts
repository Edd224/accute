// jwt.ts
import * as jwt_decode from 'jwt-decode';

import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from './storage';

const TOKEN_KEY = 'authToken';

export const saveToken = (token: string) => {
  saveToLocalStorage(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return getFromLocalStorage(TOKEN_KEY);
};

export const removeToken = () => {
  removeFromLocalStorage(TOKEN_KEY);
};

// Použitie decode namiesto jwt_decode
export const decodeToken = (token: string) => {
  try {
    return decode(token);  // Správne volanie funkcie decode
  } catch (error) {
    console.error("Chyba pri dekódovaní tokenu:", error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const decodedToken = decodeToken(token);
  if (decodedToken) {
    const expirationTime = decodedToken.exp * 1000; // exp je v sekundách
    return Date.now() > expirationTime;
  }
  return true;
};
