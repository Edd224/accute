import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { addToCart } from "../features/cart/cartSlice";
import { addToWishlist } from "../features/wishlist/wishlistSlice";
import { FaShoppingCart } from "react-icons/fa";
import { Product } from "../features/product/Product";
import { useState } from "react";

const ProductsListing = () => {
  const { category } = useParams(); // Získanie kategórie z URL
  const products = useSelector((state: RootState) => state.products.products); // Získanie produktov z Redux Store
  const dispatch = useDispatch();

  // Filtrovanie produktov podľa kategórie
  const filteredProducts = products.filter(
    (product: Product) => product.category.toLowerCase() === category?.toLowerCase()
  );
  const handleAddToCart = (product: any) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
  };

  const handleAddToWishlist = (product: any) => {
    dispatch(
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    );
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
    <div>
      <div className="grid grid-cols-1 mt-20 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border shadow-lg rounded-lg overflow-hidden bg-white"
          >
            {/* Obrázok a tlačidlá v kontajneri */}
            <div className="flex flex-col">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
                onClick={() => openModal(product.image)} // Kliknutím na obrázok otvoríme modal
              />
              <div className="flex">
                <button
                  className="w-1/2 text-sm bg-gradient-to-r from-[--green] to-[--secundar] hover:from-[--secundar] hover:to-[--green] text-[--black] px-3 py-1 font-semibold flex justify-center items-center rounded-br-[30px]"
                  onClick={() => handleAddToCart(product)}
                >
                  <FaShoppingCart className="mr-1" />
                  Pridať do košíka
                </button>
                <button
                  className="w-1/2 text-sm bg-gradient-to-r from-[--secundar] to-[--green] hover:from-[--green] hover:to-[--secundar] text-[--black] px-3 py-1 font-semibold rounded-tl-[30px]"
                  onClick={() => handleAddToWishlist(product)}
                >
                  Pridať do obľúbených
                </button>
              </div>
            </div>

            {/* Informácie o produkte */}
            <div className="p-4">
              <h2 className="text-lg font-bold text-[--black] mb-2">
                {product.name}
              </h2>
              <p className="text-gray-700 italic mb-4">{product.description}</p>
              <p className="font-bold text-green-500">&#8364;{product.price}</p>
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
  );
};

export default ProductsListing;
