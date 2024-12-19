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
        <div className="absolute top-5 left-10">
          <Breadcrumbs />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-extrabold text-6xl text-transparent my-5 bg-clip-text bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900 via-purple-300 to-teal-500">
            Profil
          </h1>
          {user && (
            <>
              <p className="text-4xl mb-2">Meno: {user.name}</p>
            </>
          )}
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center my-4 whitespace-nowrap rounded px-3.5 py-2.5 text-sm font-medium text-[--white] bg-gradient-to-r from-red-700 to-red-400  shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
          >
            Odhlásiť sa
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
