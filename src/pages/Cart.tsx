import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../features/cart/cartSlice";
import ProtectedRoute from "../components/ProtectedRoute";
import { RiDeleteBinFill } from "react-icons/ri";
import { LiaCashRegisterSolid } from "react-icons/lia";
import Breadcrumbs from "../components/Breadcrumbs";

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


  // Funkcia na zobrazenie detailov produktu
  const handleViewDetails = (id: string) => {
    navigate(`/product/${id}`); // Naviguje na stránku s detailami produktu podľa jeho ID
  };

  // Výpočet celkovej ceny všetkých položiek v košíku
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


  const handleCheckout = () => {
    navigate("/checkout"); // Presmerovanie na stránku Checkout
  };

  return (
    <ProtectedRoute>

      <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-[--white] flex justify-center items-center">
        <div className="container pb-8 sm:pb-0 px-5 sm:px-10 py-4 max-w-4xl mx-auto ">
          <div className="absolute top-5 left-10">
            <Breadcrumbs />
          </div>
          <div className="div">
            <h2 className="font-extrabold text-6xl py-5 text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900 via-purple-300 to-teal-500">Košík</h2>
          </div>

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
                      className="inline-flex text-xs justify-center whitespace-nowrap rounded px-3.5 py-2.5 font-medium text-slate-800 bg-gradient-to-bl from-yellow-50 via-neutral-100 to-stone-400 shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.2)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
                      onClick={() => handleViewDetails(item.id)}
                    >
                      Zobraziť detaily
                    </button>
                  </div>

                  <div className="flex-1 ml-4 space-y-4">
                    <h3 className="font-bold text-2xl">{item.name}</h3>
                    <p className="text-[--green] font-bold text-xl">{item.price} &#8364;</p>
                    <div className="flex items-center space-x-2">
                      <button
                        className="bg-gray-300 hover:bg-red-400 w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                        onClick={() => handleDecreaseQuantity(item.id)}
                      >
                        -
                      </button>
                      <span className="text-sm sm:text-xl font-semibold">{item.quantity}</span>
                      <button
                        className="bg-gray-300 hover:bg-[--green] w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                        onClick={() => handleIncreaseQuantity(item.id)}
                      >
                        +
                      </button>

                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <button
                      className="flex justify-center items-center bg-red-500 text-white px-4 py-2 text-xs sm:text-sm rounded hover:bg-red-600"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <RiDeleteBinFill className="mr-2" />
                      Odstranit
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-10 text-right">
                <h3 className="text-2xl font-bold">Celková cena:<span className="text-[--green] pl-2">{totalPrice} &#8364;</span></h3>
                <div className="flex flex-col items-end">
                  <button
                    className="items-center inline-flex  justify-center my-2 whitespace-nowrap rounded px-3.5 py-2.5 text-sm font-medium text-[--white] bg-gradient-to-r from-teal-700 to-teal-400  shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
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
      </div>
    </ProtectedRoute>
  );
};

export default Cart;
