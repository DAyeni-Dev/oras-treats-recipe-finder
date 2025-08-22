import { Link } from "react-router-dom";

function RecipeCard({ meal }) {
  return (
    <Link to={`/recipe/${meal.idMeal}`}>
      <div className="border rounded-lg p-2 shadow-sm w-40 hover:scale-105 transition mx-auto">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-28 object-cover rounded"
        />
        <h3 className="text-sm font-semibold mt-2 text-center text-gray-800 line-clamp-2">
          {meal.strMeal}
        </h3>
      </div>
    </Link>
  );
}

export default RecipeCard;
