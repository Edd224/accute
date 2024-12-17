import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
    const location = useLocation(); // Získanie aktuálnej cesty
    const pathnames = location.pathname.split("/").filter((x) => x); // Rozdelenie cesty


    const routeNames: { [key: string]: string } = {
        checkout: "Pokladňa",
        products: "Produkty",
        "thank-you": "Ďakujeme",
    };


    return (
        <nav className="text-gray-500 text-sm mb-4">
            <ol className="list-reset flex">
                {/* Home odkaz */}
                <li>
                    <Link to="/" className="text-blue-500 hover:underline">
                        Domov
                    </Link>
                </li>
                {/* Dynamické odkazy */}
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;

                    return (
                        <React.Fragment key={name}>
                            <span className="mx-2">/</span>
                            {isLast ? (
                                <li className="text-gray-700">{routeNames[name] || name}</li>
                            ) : (
                                <li>
                                    <Link to={routeTo} className="text-blue-500 hover:underline">
                                        {routeNames[name] || name}
                                    </Link>
                                </li>)}
                        </React.Fragment>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
