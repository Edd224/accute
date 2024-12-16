import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // Presmerovanie na domovskú stránku po 3 sekundách
    }, 4000);

    // Vyčistenie časovača pri unmount komponentu
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto text-center">
        <h2 className="text-2xl font-bold text-[--green] mb-4">Ďakujeme za váš nákup!</h2>
        <p className="text-gray-700 mb-4">
          Vaša objednávka bola úspešne prijatá. Presmerujeme vás na hlavnú stránku.
        </p>
        <div className="loader mx-auto"></div>
      </div>
    </div>
  );
};

export default ThankYou;
