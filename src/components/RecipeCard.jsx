import { Link } from "react-router-dom"


function RecipeCard({ meal }) {
  return (
    <link to={'/recipe/${meal.idMeal}'}>
    <div className="border rounded-lg p-2 shadow-sm w-40 hover:scale-150 transition max-auto">
   
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover"
        />
    
      <h3 className="text-sm font-semibold mt-2 text-center text-gray-800 line-clamp-2">
        {meal.strMeal}
      </h3>
    </div>
    </link>
  );
}

export default RecipeCard;
