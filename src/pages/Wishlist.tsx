import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice"; // Akcia na pridanie do košíka
import ProtectedRoute from "../components/ProtectedRoute";
import { FaShoppingCart } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion


const Wishlist = () => {
    const dispatch = useDispatch();
    const wishlist = useSelector((state: RootState) => state.wishlist.items);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalImage, setModalImage] = useState<string | null>(null);

    console.log("Wishlist items:", wishlist);

    const handleRemove = (id: string) => {
        dispatch(removeFromWishlist(id));
    };

    const handleAddToCart = (item: any) => {
        dispatch(
            addToCart({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: 1,
            })
        );
        dispatch(removeFromWishlist(item.id));
    };

    const openModal = (imageUrl: string) => {
        setModalImage(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalImage(null);
    };

    // Ak je wishlist prázdny, zobraz len správu, ale stále vykonaj hooky
    if (wishlist.length === 0) {
        return (
            <ProtectedRoute>
                <div className="flex justify-center items-center min-h-60">
                    <p className="text-3xl text-gray-500">Položka obľúbené je prázdna</p>
                </div>
            </ProtectedRoute>
        );
    }
    return (
        <ProtectedRoute>
            <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-[--white] flex justify-center items-center">
                <div className="container px-5 sm:px-10 pb-8 sm:pb-0">
                    <div className="absolute top-5 left-10">
                        <Breadcrumbs />
                    </div>
                    <h1 className="font-extrabold text-6xl py-5 text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900 via-purple-300 to-teal-500">
                        Obľúbené
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {wishlist.map((item) => (
                            <div
                                key={item.id}
                                className="border shadow-lg rounded overflow-hidden bg-white"
                            >
                                {/* Obrázok a tlačidlá v kontajneri */}
                                <div className="flex flex-col">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-64 object-cover"
                                        onClick={() => openModal(item.image)} // Kliknutím na obrázok otvoríme modal

                                    />
                                    <div className="flex space-x-2">
                                        <button
                                            className="w-1/2 inline-flex items-center justify-center whitespace-nowrap rounded px-3.5 py-2.5 text-sm font-medium text-[--white] bg-gradient-to-r from-red-700 to-red-400  shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            <RiDeleteBinFill className="mr-2" />
                                            Odstrániť
                                        </button>
                                        <button
                                            className="w-1/2 inline-flex items-center justify-center whitespace-nowrap rounded px-3.5 py-2.5 text-sm font-medium text-[--white] bg-gradient-to-r from-teal-700 to-teal-400  shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
                                            onClick={() => handleAddToCart(item)}
                                        >
                                            <FaShoppingCart className="mr-2" />
                                            Pridať do košíka
                                        </button>
                                    </div>
                                </div>

                                {/* Informácie o produkte */}
                                <div className="flex justify-between p-4">
                                    <h2 className="text-lg font-bold text-[--black] mb-2">
                                        {item.name}
                                    </h2>
                                    <p className="text-[--green] text-lg font-bold">&#8364;{item.price}</p>
                                </div>
                            </div>
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

export default Wishlist;
