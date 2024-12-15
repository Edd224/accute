import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; // Správny import výchozího exportu
import { useDispatch } from "react-redux";
import { logIn } from "../features/auth/authSlice"; // Import logIn akcie
import users from "../mock/users.json";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Inicializácia dispatch

  const handleLogin = () => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Testovací platný JWT token
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.6k0NHO3sb9zOX6dR4jmYHz4TYZ8s5L2tRFL31ZkcTZU";

      // Uloženie tokenu do localStorage
      localStorage.setItem("token", token);

      // Dekódovanie tokenu
      const decodedToken = jwt_decode(token);
      console.log(decodedToken);

      // Zmena Redux stavu na prihláseného
      dispatch(logIn());

      // Presmerovanie na inú stránku po úspešnom prihlásení
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
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
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-[--green] text-white hover:text-[--black] py-2 rounded-lg hover:bg-[--secundar] focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
