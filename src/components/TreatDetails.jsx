import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function TreatDetails() {
  const { id } = useParams();
  const [treat, setTreat] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((treatData) => setTreat(treatData.meals[0]))
      .catch((error) => console.error("Error fetching treat:", error));
  }, [id]);

  if (!treat) return <p>Fetching your treat...</p>;

  const findYourTreat = [];
  for (let i = 1; i <= 20; i++) {
    if (treat[`strIngredient${i}`]) {
      findYourTreat.push(
        `${treat[`strIngredient${i}`]} - ${treat[`strMeasure${i}`]}`
      );
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <img
        src={treat.strMealThumb}
        alt={treat.strMeal}
        className="w-full rounded-lg"
      />
      <h1 className="text-3xl font-bold mt-4">{treat.strMeal}</h1>
      <p className="text-gray-700">
        {treat.strCategory} | {treat.strArea}
      </p>

      <h2 className="text-xl font-semibold mt-6">Find Your Treat</h2>
      <ul className="list-disc list-inside">
        {findYourTreat.map((ing, index) => (
          <li key={index}>{ing}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6">How to Treat Yourself</h2>
      <p className="mt-2 whitespace-pre-line">{treat.strInstructions}</p>

      <Link
        to="/"
        className="inline-block mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Find Your Treat
      </Link>
    </div>
  );
}

export default TreatDetails;
