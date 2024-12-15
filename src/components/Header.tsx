import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { logOut } from "../features/auth/authSlice";
import { useState } from "react";

const Header = () => {
  const cartItemCount = useSelector((state: RootState) => state.cart.items.length);
  const wishlistItemCount = useSelector((state: RootState) => state.wishlist.items.length);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Stav pre otvorenie/zatvorenie menu

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logOut());
  };

  return (
    <header className="flex justify-between items-center p-4 border-b-2 bg-white shadow-md relative z-50">
      {/* Logo */}
      <Link to="/home" className="text-xl font-bold">
        Moja aplikácia
      </Link>

      {/* Hamburger Button (pre mobily) */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="sm:hidden text-2xl"
        aria-label="Toggle navigation"
      >
        {isMenuOpen ? "✖" : "☰"}
      </button>

      {/* Navigácia */}
      <nav
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } sm:flex flex-col sm:flex-row gap-4 uppercase text-sm font-semibold text-[--blue] absolute sm:static top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent shadow-md sm:shadow-none p-4 sm:p-0`}
        style={{
          zIndex: 100,
        }}
      >
        {/* Verejné odkazy */}
        <Link to="/home" onClick={() => setIsMenuOpen(false)}>
          Domov
        </Link>
        <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
          Dashboard
        </Link>
        <Link to="/categories" onClick={() => setIsMenuOpen(false)}>
          Kategórie
        </Link>
        <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
          Košík ({cartItemCount})
        </Link>
        <Link to="/wishlist" onClick={() => setIsMenuOpen(false)}>
          Obľúbené ({wishlistItemCount})
        </Link>

        {/* Podmienky pre prihlásenie */}
        {isLoggedIn ? (
          <>
            <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
              Profil
            </Link>
            <button
              className="uppercase"
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
            >
              Odhlásenie
            </button>
          </>
        ) : (
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>
            Prihlásenie
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
