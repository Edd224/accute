import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { logOut } from "../features/auth/authSlice";

const Header = () => {
  const cartItemCount = useSelector((state: RootState) => state.cart.items.length);
  const wishlistItemCount = useSelector((state: RootState) => state.wishlist.items.length); // Počet obľúbených produktov
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Vymazanie tokenu
    localStorage.removeItem("token");

    // Zmena Redux stavu na odhláseného
    dispatch(logOut());
  };

  return (
    <header className="flex justify-between items-center p-4 border-b-2">
      <Link to="/" className="text-xl font-bold">
        Moja aplikácia
      </Link>
      <nav className="flex gap-4 uppercase text-sm font-semibold text-[--blue]">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/categories">Kategórie</Link>
        <Link to="/cart">Košík ({cartItemCount})</Link>
        <Link to="/wishlist">Obľúbené ({wishlistItemCount})</Link> {/* Odkaz na Obľúbené */}
        {!isLoggedIn && <Link to="/login">Prihlásenie</Link>}
        {isLoggedIn && (
          <>
            <Link to="/profile">Profil</Link>
            <button className="uppercase" onClick={handleLogout}>Odhlásenie</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
