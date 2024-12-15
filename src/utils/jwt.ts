import  decode  from "jwt-decode"; // Named export pre jwt-decode@3.1.2

import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from './storage';

const TOKEN_KEY = 'authToken';

type DecodedToken = {
  exp: number
}

export const saveToken = (token: string) => {
  saveToLocalStorage(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return getFromLocalStorage(TOKEN_KEY);
};

export const removeToken = () => {
  removeFromLocalStorage(TOKEN_KEY);
};

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return decode(token) as DecodedToken; 
  } catch (error) {
    console.error("Chyba pri dekódovaní tokenu:", error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const decodedToken = decodeToken(token);
  if (decodedToken && decodedToken.exp) {
    const expirationTime = decodedToken.exp * 1000; // exp je v sekundách
    return Date.now() > expirationTime;
  }
  return true;
};