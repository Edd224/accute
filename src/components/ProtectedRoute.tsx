import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      // Pokiaľ nie je užívateľ prihlásený, presmeruje ho na prihlásenie
      navigate("/login");
    }
  }, [isLoggedIn, navigate]); // Tento efekt sa spustí, ak sa změní isLoggedIn alebo navigate

  // Ak nie je prihlásený, nevrátí deti, pretože sú presmerované
  if (!isLoggedIn) {
    return null;
  }

  return children; // Vráti deti, ak je prihlásený
};

export default ProtectedRoute;
