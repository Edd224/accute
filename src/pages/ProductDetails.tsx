import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { addToCart } from "../features/cart/cartSlice";
import { addToWishlist } from "../features/wishlist/wishlistSlice";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";

const ProductDetails = () => {
  const { id } = useParams(); // Získanie ID z URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.products.products); // Získanie produktov z Redux Store

  // Nájdeme konkrétny produkt podľa ID
  const product = products.find((product) => product.id === id);

  if (!product) {
    return <p>Product not found!</p>;
  }

  // Funkcia na pridanie produktu do košíka
  const handleAddToCart = () => {
    // Dispatch akcie pre pridanie produktu do košíka s potrebnými údajmi
    dispatch(
      addToCart({
        id: product.id,        // ID produktu
        name: product.name,    // Názov produktu
        price: product.price,  // Cena produktu
        image: product.image,  // Obrázok produktu
        quantity: 1,           // Počiatočné množstvo (1)
      })
    );
  };

  // Funkcia na pridanie produktu do zoznamu obľúbených
  const handleAddToWishlist = () => {
    // Dispatch akcie pre pridanie produktu do zoznamu obľúbených s potrebnými údajmi
    dispatch(
      addToWishlist({
        id: product.id,        // ID produktu
        name: product.name,    // Názov produktu
        price: product.price,  // Cena produktu
        image: product.image,  // Obrázok produktu
      })
    );
    // Navigácia na stránku so zoznamom obľúbených produktov
    navigate("/wishlist"); // Presmerovanie na obľúbené
  };
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Stav pre modálne okno
  const [modalImage, setModalImage] = useState<string | null>(null); // Uloženie URL obrázku pre modal


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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col md:flex-row md:items-center gap-6">
        {/* Obrázok */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-cover rounded"
          onClick={() => openModal(product.image)} // Kliknutím na obrázok otvoríme modal
        />

        {/* Popis produktu */}
        <div className="flex flex-col justify-between md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 italic mb-4">{product.description}</p>
          <p className="text-green-500 font-bold text-xl mb-6">
            &#8364;{product.price}
          </p>
          <div className="flex flex-col space-y-2">
            <button
              className="flex items-center justify-center w-1/2  bg-gradient-to-t from-[--green] to-[--secundar] hover:from-[--secundar] hover:to-[--green] text-[--black] px-4 py-2 rounded mr-2 rounded-br-[30px]"
              onClick={handleAddToCart}
            >
              <FaShoppingCart className="mr-2" />
              Pridať do košíka
            </button>
            <button
              className="w-1/2 bg-gradient-to-t from-[--secundar] to-[--green] hover:from-[--green] hover:to-[--secundar] text-[--black] px-4 py-2 rounded rounded-tl-[30px]"
              onClick={handleAddToWishlist}
            >
              Pridať do obľúbených
            </button>
          </div>
        </div>
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
  );
};
export default ProductDetails;
