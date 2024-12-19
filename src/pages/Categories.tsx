import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Link } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import Breadcrumbs from "../components/Breadcrumbs";


const Categories = () => {
  const categories = useSelector((state: RootState) => state.categories.categories);

  useEffect(() => {
    AOS.init();
  }, []);


  return (
    <ProtectedRoute>
      <div className="relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-[--white] flex justify-center items-center">
        <div className="container pb-8 px-10 py-4 sm:pb-0">
          <div className="absolute top-5 left-10">
            <Breadcrumbs />
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="div">
              <h1 className="font-extrabold text-6xl py-5 text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900 via-purple-300 to-teal-500">Kategórie</h1>
            </div>

            <ul className="space-y-4 text-3xl text-[--black] my-10">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/products/${category.id}`}
                    className="hover:text-[--green] rounded px-3 py-2"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Categories;
