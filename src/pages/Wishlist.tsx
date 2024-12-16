import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice"; // Akcia na pridanie do košíka
import ProtectedRoute from "../components/ProtectedRoute";
import { FaShoppingCart } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { useState } from "react";

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
                    <h1 className="font-myFont text-7xl py-5 text-transparent bg-clip-text bg-gradient-to-l from-[#676cab] via-amber-600 to-[#be8aa9]">
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
                                    <div className="flex">
                                        <button
                                            className="w-1/2 text-sm bg-gradient-to-r from-red-500 via-transparent to-red-800 hover:bg-red-500 text-[--black] px-3 py-2 font-semibold flex justify-center items-center rounded-br-[30px]"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            <RiDeleteBinFill className="mr-2" />
                                            Odstrániť
                                        </button>
                                        <button
                                            className="w-1/2 text-sm bg-gradient-to-r from-[--green] via-transparent to-[--secundar] hover:bg-[--green] text-[--black] px-3 py-2 font-semibold flex justify-center items-center rounded-tl-[30px]"
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
            </div>
        </ProtectedRoute>
    );
};

export default Wishlist;
