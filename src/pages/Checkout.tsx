import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Checkout = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <h2 className="mt-4">Prehľad objednávky</h2>
        <ul className="border p-4">
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </li>
          ))}
        </ul>
        <form className="mt-4">
          <h2>Vaše údaje</h2>
          <input type="text" placeholder="Meno" className="border p-2 w-full mb-4" />
          <input type="text" placeholder="Adresa" className="border p-2 w-full mb-4" />
          <input type="text" placeholder="Platobné údaje" className="border p-2 w-full mb-4" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Potvrdiť objednávku
          </button>
        </form>
      </div>
    );
  };
  
  export default Checkout;
  