import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Breadcrumbs = () => {
    const location = useLocation(); // Získanie aktuálnej cesty
    const pathnames = location.pathname.split("/").filter((x) => x); // Rozdelenie cesty

    // Získanie kategórií zo store
    const categories = useSelector((state: RootState) => state.categories.categories);

    // Preložené názvy pre statické cesty
    const routeNames: { [key: string]: string } = {
        dashboard: "Dashboard",
        checkout: "Pokladňa",
        products: "Produkty",
        categories: "Kategórie",
        cart: "Košík",
        wishlist: "Obľúbené",
        profile: "Profil",
        "thank-you": "Ďakujeme",
    };

    // Funkcia na získanie názvu kategórie podľa ID
    const getCategoryName = (id: string) => {
        const category = categories.find((cat) => cat.id === id);
        return category ? category.name : id; // Ak sa nenašla kategória, vráti ID
    };

    return (
        <nav className="text-gray-500 text-sm mb-4">
            <ol className="list-reset flex">
                {/* Odkaz na Domov */}
                <li>
                    <Link to="/" className="text-blue-500 hover:underline">
                        Domov
                    </Link>
                </li>
                {/* Dynamické odkazy */}
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;

                    // Nahradenie ID kategórie jej názvom
                    const displayName = routeNames[name] || getCategoryName(name);

                    return (
                        <React.Fragment key={name}>
                            <span className="mx-2">/</span>
                            {isLast ? (
                                <li className="text-gray-700">{displayName}</li>
                            ) : (
                                <li>
                                    <Link to={routeTo} className="text-blue-500 hover:underline">
                                        {displayName}
                                    </Link>
                                </li>
                            )}
                        </React.Fragment>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
