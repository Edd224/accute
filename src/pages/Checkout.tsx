import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Breadcrumbs from "../components/Breadcrumbs";

const Checkout = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch(); // Načítanie dispatch funkcie
  const navigate = useNavigate(); // Získanie navigačnej funkcie

  // Výpočet celkovej sumy
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Zabraňuje predvolenej akcii formulára
    dispatch(clearCart()); // Vyprázdnenie košíka po nákupe
    navigate("/thank-you"); // Presmerovanie na komponent ThankYou
  };

  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-[--white] flex justify-center items-center">
      <div className="container pb-8 px-10 py-4 sm:pb-0">
        <Breadcrumbs />
        <h1 className="text-2xl font-bold">Checkout</h1>
        <h2 className="mt-4">Prehľad objednávky</h2>
        <ul className="border p-4">
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <span>
                {item.name} (x{item.quantity}) {/* Zobrazenie množstva */}
              </span>
              <span> &#8364;{(item.price * item.quantity).toFixed(2)}</span> {/* Cena za celkové množstvo */}
            </li>
          ))}
        </ul>
        {/* Zobrazenie celkovej sumy */}
        <div className="mt-4 flex justify-between items-center border-t pt-4">
          <span className="font-bold text-lg">Celková suma:</span>
          <span className="font-bold text-lg">&#8364;{totalAmount.toFixed(2)}</span>
        </div>
        <form className="w-1/2 mt-4 space-y-2" onSubmit={handleSubmit}>
          <h2>Vaše údaje</h2>
          <input type="text" placeholder="Meno" className="border p-2 w-full mb-4" required />
          <input type="text" placeholder="Adresa" className="border p-2 w-full mb-4" required />
          <input type="text" placeholder="Platobné údaje" className="border p-2 w-full mb-4" required />
          <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded px-3.5 py-2.5 text-sm font-medium text-[--white] bg-gradient-to-r from-teal-700 to-teal-400  shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]">
            Potvrdiť objednávku
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
