import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode"; // Správny import výchozího exportu
import { useDispatch } from "react-redux";
import { logIn } from "../features/auth/authSlice"; // Import logIn akcie
import users from "../mock/users.json";
import { SignJWT } from "jose";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Inicializácia dispatch

  const handleLogin = async () => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Generovanie JWT tokenu pomocou jose
      const token = await new SignJWT({ userId: user.id, name: user.name })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1h") // Token vyprší po 1 hodine
        .sign(new TextEncoder().encode("secret-key")); // Tajný kľúč na podpisovanie tokenov

      // Uloženie tokenu do localStorage
      localStorage.setItem("token", token);

      // Zmena Redux stavu na prihláseného
      dispatch(logIn());

      // Presmerovanie na inú stránku po úspešnom prihlásení
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };



  return (
    <div className="flex items-center px-5 sm:px-8 justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8  rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-900 via-purple-300 to-teal-500">
          Login
        </h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <div className="flex items-center justify-center">
            <input
              id="password"
              type={showPassword ? "text" : "password"} // Dynamický typ vstupu
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* Ikona oka */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Prepínanie stavu
              className="flex items-center text-[--black] ml-2"
            >
              {showPassword ? (
                <FaEye className="h-5 w-5" />
              ) : (
                <FaEyeSlash className="h-5 w-5" />
              )}
            </button>

          </div>
        </div>
        <button
          onClick={handleLogin}
          className="w-full inline-flex items-center justify-center whitespace-nowrap rounded px-3.5 py-2.5 text-sm font-medium text-[--white] bg-gradient-to-r from-teal-700 to-teal-400  shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1800ms]"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
