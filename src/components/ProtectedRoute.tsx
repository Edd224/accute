import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    // pokiaľ nie je užívateľ prihlásený , presmeruje ho na prihláseni
    navigate("/login");
    return null; // Môže vrátiť null, pretože užívateľ je presmerovaný
  }

  return children;
};

export default ProtectedRoute;
