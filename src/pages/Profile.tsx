import jwt_decode from "jwt-decode";  // Výchozí export
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../features/auth/authSlice";
import Breadcrumbs from "../components/Breadcrumbs";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Načítanie tokenu zo localStorage a dekódovanie údajov používateľa z tokenu
  const token = localStorage.getItem("token");
  const user = token ? jwt_decode<{ userId: string; name: string }>(token) : null;

  // Funkcia pre odhlásenie používateľa
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-[--white] flex justify-center items-center">
      <div className="container pb-8 sm:pb-0">
        <Breadcrumbs />
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-extrabold text-6xl text-transparent my-5 bg-clip-text bg-gradient-to-l from-[#676cab] via-amber-600 to-[#be8aa9]">
            Profil
          </h1>
          {user && (
            <>
              <p className="text-4xl mb-2">Meno: {user.name}</p>
            </>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Odhlásiť sa
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
