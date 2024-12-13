import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../features/cart/cartSlice";
import ProtectedRoute from "../components/ProtectedRoute";
import { RiDeleteBinFill } from "react-icons/ri";
import { LiaCashRegisterSolid } from "react-icons/lia";

const Cart = () => {
  // Načítanie položiek z Redux stavu
  const cartItems = useSelector((state: RootState) => state.cart.items);
  // Načítanie dispatch funkcie z Redux na vykonávanie akcií
  const dispatch = useDispatch();
  // Načítanie navigácie z react-router-dom
  const navigate = useNavigate();

  // Funkcia na odstránenie položky z košíka
  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id)); // Vykonanie akcie removeFromCart s ID položky
  };

  // Funkcia na zvýšenie množstva položky v košíku
  const handleIncreaseQuantity = (id: string) => {
    dispatch(increaseQuantity(id)); // Vykonanie akcie increaseQuantity s ID položky
  };

  // Funkcia na zníženie množstva položky v košíku
  const handleDecreaseQuantity = (id: string) => {
    dispatch(decreaseQuantity(id)); // Vykonanie akcie decreaseQuantity s ID položky
  };

  // Funkcia na spracovanie pokladne (v tomto prípade len simulácia)
  const handleCheckout = () => {
    alert("Pokladňa je momentálne iba simulovaná. Ďakujeme za váš nákup!"); // Ukáže simulované hlásenie o pokladni
  };

  // Funkcia na zobrazenie detailov produktu
  const handleViewDetails = (id: string) => {
    navigate(`/product/${id}`); // Naviguje na stránku s detailami produktu podľa jeho ID
  };

  // Výpočet celkovej ceny všetkých položiek v košíku
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <ProtectedRoute>
      <>
        <div className="div">
          <h2 className="font-myFont text-7xl py-5 text-transparent  bg-clip-text bg-gradient-to-l from-[#676cab] via-amber-600 to-[#be8aa9]">Košík</h2>
        </div>

        <div className="p-4 max-w-4xl mx-auto">
          {cartItems.length === 0 ? (
            <p className="flex justify-center items-center min-h-60 text-3xl text-gray-500 mx-auto">Košík je prázdny</p>
          ) : (
            <div className="">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-end justify-between p-2 border rounded shadow-sm"
                >
                  <div className="flex flex-col justify-center items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-28 h-28 m-2 object-cover rounded"
                    />
                    <button
                      className="bg-[--secundar] text-[--black] p-2 text-sm rounded "
                      onClick={() => handleViewDetails(item.id)}
                    >
                      Zobraziť detaily
                    </button>
                  </div>

                  <div className="flex-1 ml-4 space-y-4">
                    <h3 className="font-bold text-2xl">{item.name}</h3>
                    <p className="text-[--green] font-bold text-lg">{item.price} &#8364;</p>
                    <div className="flex items-center space-x-2">
                      <button
                        className="bg-gray-300 hover:bg-red-400 w-10 h-10 rounded-full"
                        onClick={() => handleDecreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span className="text-xl font-semibold">{item.quantity}</span>
                      <button
                        className="bg-gray-300 hover:bg-[--green] w-10 h-10 rounded-full"
                        onClick={() => handleIncreaseQuantity(item.id)}
                      >
                        +
                      </button>

                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <button
                      className="flex justify-center items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <RiDeleteBinFill className="mr-2" />
                      Odstranit
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-10 text-right">
                <h3 className="text-xl font-bold">Celková cena: {totalPrice} &#8364;</h3>
                <div className="flex flex-col items-end">
                  <button
                    className="flex items-center bg-green-500 text-white px-4 py-2 rounded mt-2 hover:bg-green-600"
                    onClick={handleCheckout}
                  >
                    <LiaCashRegisterSolid className="mr-2" />
                    Pokladňa
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    </ProtectedRoute>
  );
};

export default Cart;
