import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../features/auth/authSlice";

const Profile = () => {
  // Hook pre prístup k dispatch funkciám Reduxu
  const dispatch = useDispatch();
  // Hook pre navigáciu medzi stránkami v rámci aplikácie
  const navigate = useNavigate();

  // Načítanie tokenu zo localStorage a dekódovanie údajov používateľa z tokenu
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode<{ userId: string; name: string }>(token) : null;

  // Funkcia pre odhlásenie používateľa
  const handleLogout = () => {
    // Odstránenie tokenu z localStorage pri odhlásení
    localStorage.removeItem("token");
    // Dispatch akcie pre odhlásenie (čistenie stavu v Redux store)
    dispatch(logOut());
    // Navigácia na stránku prihlásenia po odhlásení
    navigate("/login");
  };

  return (
    <>
      <h1 className="font-myFont text-7xl text-transparent my-5 bg-clip-text bg-gradient-to-l from-[#676cab] via-amber-600 to-[#be8aa9]">Profil</h1>

      <div className="flex flex-col items-center justify-center">
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
    </>
  );
};


export default Profile;