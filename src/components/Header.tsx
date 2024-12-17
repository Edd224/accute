import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { logOut } from "../features/auth/authSlice";
import { useState } from "react";
import logo from "../assets/image/logo.png";

const Header = () => {
  const cartItemCount = useSelector((state: RootState) => state.cart.items.length);
  const wishlistItemCount = useSelector((state: RootState) => state.wishlist.items.length);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const location = useLocation(); // Získanie aktuálnej cesty

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Stav pre otvorenie/zatvorenie menu

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logOut());
  };

  // Funkcia pre kontrolu, či je odkaz aktívny
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="flex w-full justify-around items-center px-10 py-4 border-b-2 bg-white shadow-md relative z-50">
      {/* Logo */}
      <Link to="/home" className="w-10">
        <img src={logo} alt="Logo" />
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
        } sm:flex flex-col sm:flex-row gap-4 text-sm font-semibold text-[--blue] absolute sm:static top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent shadow-md sm:shadow-none px-10 py-4 sm:p-0`}
        style={{ zIndex: 100 }}
      >
        {/* Verejné odkazy */}
        <Link
          to="/home"
          className={`${
            isActive("/home") ? "text-[--green]" : ""
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          Domov
        </Link>
        <Link
          to="/dashboard"
          className={`${
            isActive("/dashboard") ? "text-[--green]" : ""
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          Dashboard
        </Link>
        <Link
          to="/categories"
          className={`${
            isActive("/categories") ? "text-[--green]" : ""
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          Kategórie
        </Link>
        <Link
          to="/cart"
          className={`${
            isActive("/cart") ? "text-[--green]" : ""
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          Košík ({cartItemCount})
        </Link>
        <Link
          to="/wishlist"
          className={`${
            isActive("/wishlist") ? "text-[--green]" : ""
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          Obľúbené ({wishlistItemCount})
        </Link>

        {/* Podmienky pre prihlásenie */}
        {isLoggedIn ? (
          <>
            <Link
              to="/profile"
              className={`${
                isActive("/profile") ? "text-[--green]" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
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
          <Link
            to="/login"
            className={`${
              isActive("/login") ? "text-[--green]" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Prihlásenie
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
