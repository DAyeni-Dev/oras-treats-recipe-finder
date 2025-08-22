import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function RecipeDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => setMeal(data.meals[0]))
      .catch((error) => console.error("Error fetching meal:", error));
  }, [id]);

  if (!meal) return <p>Fetching your treat...</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full rounded-lg"
      />
      <h1 className="text-3xl font-bold mt-4">{meal.strMeal}</h1>
      <p className="text-gray-700">{meal.strCategory} | {meal.strArea}</p>

      <h2 className="text-xl font-semibold mt-6">Treats</h2>
      <ul className="list-disc list-inside">
        {ingredients.map((ing, index) => (
          <li key={index}>{ing}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6">Instructions</h2>
      <p className="mt-2 whitespace-pre-line">{meal.strInstructions}</p>

      <Link
        to="/"
        className="inline-block mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Find Your Treat
      </Link>
    </div>
  );
}

export default RecipeDetails;
