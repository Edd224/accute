import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { addToCart } from "../features/cart/cartSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import ProtectedRoute from "../components/ProtectedRoute";
import useHorizontalScroll from "../features/useHorizontalScroll";
import Breadcrumbs from "../components/Breadcrumbs";

const Dashboard = () => {
  const categories = useSelector((state: RootState) => state.categories.categories);
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const handleAddToCart = (product: any) => {
    const productWithQuantity = { ...product, quantity: 1 };
    dispatch(addToCart(productWithQuantity));
  };

  const goToProductDetails = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const scrollRef = useHorizontalScroll();

  const openModal = (imageUrl: string) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  return (
    <ProtectedRoute>
      <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-[--white] flex justify-center items-center">
        <div className="container pb-8 sm:px-0 px-8 sm:pb-0 bg-[--white] mt-5">
          <div className="absolute top-5 left-10">
            <Breadcrumbs />
          </div>
          <h1 className="font-extrabold text-6xl text-transparent my-8 bg-clip-text bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900 via-purple-300 to-teal-500">
            Dashboard
          </h1>

          {/* Filtrácia podľa kategórie */}
          <div className="flex flex-row justify-start text-[--blue]">
            <div className="flex justify-between items-baseline">
              <div className="flex flex-col">
                <h2 className="text-2xl">Vyberte kategóriu:</h2>
                <h2>Počet produktov v kategórii: {filteredProducts.length}</h2>
              </div>

              <select
                className="border border-[--green] px-2 py-1 rounded-sm mx-2"
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">Všetky</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id.toString()}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex">
              <h2>Počet kategórií: {categories.length}</h2>
            </div>
          </div>

          {/* Horizontálne scrollovanie produktov */}
          <div
            ref={scrollRef}
            className="mt-16 flex gap-4 overflow-x-auto scrollbar-hide p-4"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }} // Začína priehľadne a mierne posunuté
                animate={{ opacity: 1, y: 0 }} // Animuje na plnú viditeľnosť a pôvodnú pozíciu
                transition={{
                  duration: 0.5, // Trvanie animácie
                  delay: index * 0.1, // Oneskorenie pre každý produkt
                }}
                className="flex-shrink-0  rounded-lg overflow-hidden bg-white"
                style={{ width: "300px" }}
              >
                <h3 className="text-3xl text-center">{product.name}</h3>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded"
                  onClick={() => openModal(product.image)}
                />
                <p className="font-bold text-[--green] text-2xl text-center">
                  &#8364;{product.price}
                </p>
                <div className="w-full flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-1/2 inline-flex items-center justify-center whitespace-nowrap rounded px-3.5 py-2.5 text-sm font-medium text-[--white] bg-gradient-to-r from-teal-700 to-teal-400  shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
                  >
                    <FaShoppingCart className="mr-1" /> Pridať do košíka
                  </button>
                  <button
                    onClick={() => goToProductDetails(product.id)}
                    className="w-1/2 inline-flex justify-center whitespace-nowrap rounded px-3.5 py-2.5 text-sm font-medium text-slate-800 bg-gradient-to-bl from-yellow-50 via-neutral-100 to-stone-400 shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.2)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
                  >
                    Zobraziť detaily
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Modal pre zobrazenie obrázku */}
          {isModalOpen && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }} // Počiatočný stav (priehľadný)
                animate={{ opacity: 1 }} // Animovaný stav (viditeľný)
                exit={{ opacity: 0 }} // Stav pri zatváraní (fade-out)
                transition={{ duration: 0.3 }} // Dĺžka trvania animácie
                className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }} // Menší a priehľadný
                  animate={{ scale: 1, opacity: 1 }} // Priblížený a viditeľný
                  exit={{ scale: 0.8, opacity: 0 }} // Stav pri zatváraní
                  transition={{ duration: 0.3, ease: "easeOut" }} // Hladká animácia
                  className="relative"
                >
                  <button
                    className="absolute top-2 right-2 text-white text-3xl"
                    onClick={closeModal}
                  >
                    &#10005; {/* X symbol */}
                  </button>
                  <img
                    src={modalImage!}
                    alt="Produkt"
                    className="max-w-full max-h-screen object-contain rounded-lg shadow-lg"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
