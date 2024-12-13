import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { addToCart } from "../features/cart/cartSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import ProtectedRoute from "../components/ProtectedRoute";
import useHorizontalScroll from "../features/useHorizontalScroll";

const Dashboard = () => {
  const categories = useSelector((state: RootState) => state.categories.categories);
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Stav pre modálne okno
  const [modalImage, setModalImage] = useState<string | null>(null); // Uloženie URL obrázku pre modal


  // Filterovanie produktov podľa kategórie
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Funkcia na pridanie do košíka
  const handleAddToCart = (product: any) => {
    const productWithQuantity = { ...product, quantity: 1 };
    dispatch(addToCart(productWithQuantity));
  };

  // Navigácia na stránku produktu
  const goToProductDetails = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  // Hook pre horizontálne scrollovanie
  const scrollRef = useHorizontalScroll();

  // Funkcia na otvorenie modálneho okna s obrázkom
  const openModal = (imageUrl: string) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  // Funkcia na zatvorenie modálneho okna
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  return (
    <ProtectedRoute>


      <div className="bg-[--white] mt-5">
        <h1 className="font-myFont text-7xl text-transparent my-4 bg-clip-text bg-gradient-to-l from-[#676cab] via-amber-600 to-[#be8aa9]">Dashboard</h1>

        {/* Filtrácia podľa kategórie */}
        <div className="flex flex-row justify-start text-[--blue]">
          <div className="flex justify-between items-baseline">
            <div className="flex flex-col">
              <h2 className="text-2xl">Vyberte kategóriu:</h2>
              <h2>Počet produktov v kategórii: {filteredProducts.length}</h2>
            </div>

            <select
              className="border border-[--green] px-2 py-1 rounded-sm mx-5"
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

          {/* Počet kategórií */}
          <div className="flex">
            <h2>Počet kategórií: {categories.length}</h2>
          </div>
        </div>

        {/* Horizontálne scrollovanie produktov */}
        <div ref={scrollRef} className="mt-20 flex gap-4 overflow-x-auto scrollbar-hide p-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 shadow-lg rounded-lg overflow-hidden bg-white"
              style={{ width: "300px" }} // Pevná šírka pre každý produkt
            >
              <h3 className="text-3xl text-center">{product.name}</h3>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded"
                onClick={() => openModal(product.image)} // Kliknutím na obrázok otvoríme modal
              />
              <p className="font-bold text-[--green] text-2xl text-center">&#8364;{product.price}</p>
              <div className="w-full flex">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-1/2 flex justify-center text-sm items-center bg-gradient-to-r from-[--green] to-[--secundar] hover:from-[--secundar] hover:to-[--green] text-[--black] px-2 py-3 rounded rounded-br-[30px]  "
                >
                  <FaShoppingCart className="mr-1" /> Pridať do košíka
                </button>
                <button
                  onClick={() => goToProductDetails(product.id)}
                  className="w-1/2 bg-gradient-to-r from-[--secundar] via-transparent to-[--green] hover:from-[--green] hover:to-[--secundar] text-[--black] text-sm px-2 py-3 rounded rounded-tl-[30px]"
                >
                  Zobraziť detaily
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal pre zobrazenie obrázku */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="relative">
              <button
                className="absolute top-2 right-2 text-[--black] text-3xl"
                onClick={closeModal}
              >
                &#10005; {/* X symbol */}
              </button>
              <img
                src={modalImage!}
                alt="Produkt"
                className="max-w-full max-h-screen object-contain"
              />
            </div>
          </div>
        )}

      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
