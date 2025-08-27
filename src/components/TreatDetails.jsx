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
    <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 flex justify-center">
          <img
            src={treat.strMealThumb}
            alt={treat.strMeal}
            className="w-auto max-w-sm rounded-lg shadow"
          />
        </div>

        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold">{treat.strMeal}</h1>
          <p className="text-gray-700 mb-4">
            {treat.strCategory} | {treat.strArea}
          </p>

          <h2 className="text-xl font-semibold mt-4">Treat List</h2>
          <ul className="list-disc list-inside">
            {findYourTreat.map((ing, index) => (
              <li key={index}>{ing}</li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold mt-6">How to Treat Yourself</h2>
          <p className="mt-2 whitespace-pre-line">{treat.strInstructions}</p>

          <Link
            to="/treats"
            className="inline-block mt-6 text-white px-4 py-2 rounded"
          >
            Find Your Treat
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TreatDetails;
