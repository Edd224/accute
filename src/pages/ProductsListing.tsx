import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { addToCart } from "../features/cart/cartSlice";
import { addToWishlist } from "../features/wishlist/wishlistSlice";
import { FaShoppingCart } from "react-icons/fa";
import { Product } from "../features/product/Product";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import Breadcrumbs from "../components/Breadcrumbs";

const ProductsListing = () => {
  const { category } = useParams();
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();

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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const openModal = (imageUrl: string) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  // Definícia animácie pre produkty
  const productVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 }, // Oneskenie pre každý produkt
    }),
  };

  return (
    <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-[--white] flex justify-center items-center">
      <div className="container px-5 sm:px-10 pb-8 sm:pb-0">
        <div className="absolute top-5 left-10">
          <Breadcrumbs />
        </div>
        <div className="grid grid-cols-1 mt-20 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={productVariants} // Pridanie variantov
              initial="hidden" // Počiatočný stav
              animate="visible" // Animovaný stav
              custom={index} // Vlastná hodnota pre oneskorenie
              className="border border-[--green]/50 rounded-lg overflow-hidden bg-white"
            >
              <div className="flex flex-col">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                  onClick={() => openModal(product.image)}
                />
                <div className="flex space-x-2">
                  <button
                    className="w-1/2 text-xs inline-flex items-center justify-center whitespace-nowrap rounded px-3.5 py-2.5 font-medium text-[--white] bg-gradient-to-r from-teal-700 to-teal-400  shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaShoppingCart className="mr-1" />
                    Pridať do košíka
                  </button>
                  <button
                    className="w-1/2 text-xs inline-flex justify-center whitespace-nowrap rounded px-3.5 py-2.5 font-medium text-slate-800 bg-gradient-to-bl from-yellow-50 via-neutral-100 to-stone-400 shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.2)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
                    onClick={() => handleAddToWishlist(product)}
                  >
                    Pridať do obľúbených
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h2 className="text-lg font-bold text-[--black] mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-700 italic mb-4">{product.description}</p>
                <p className="font-bold text-green-500">&#8364;{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>

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
          </AnimatePresence>)}
      </div>
    </div>
  );
};

export default ProductsListing;
