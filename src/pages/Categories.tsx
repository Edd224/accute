import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Link } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";


const Categories = () => {
  const categories = useSelector((state: RootState) => state.categories.categories);

  return (
    <ProtectedRoute>
      <div>
        <div className="div">
          <h1 className="font-myFont text-7xl py-5 text-transparent  bg-clip-text bg-gradient-to-l from-[#676cab] via-amber-600 to-[#be8aa9]">Kategórie</h1>
        </div>
        <div className="flex flex-col justify-center items-center">
          <ul className="space-y-4 text-3xl text-[--black] my-10">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/products/${category.id}`}
                  className="hover:bg-[--green] rounded px-3 py-2"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Categories;
