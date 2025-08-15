import Header from "./components/Header";
import { useEffect, useState } from "react";

function App() {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("pasta");

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.meals || []);
      })
      .catch((error) => {
        console.error("error fetching data:", error);
      });
  }, [searchTerm]);

  return (
    <div>
      <Header onSearch={(term) => setSearchTerm(term)} />
      <main className="p-4">
        {meals.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {meals.map((meal) => (
              <div key={meal.idMeal} className="border rounded p-2 shadow">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full rounded"
                />
                <h3 className="text-sm font-semibold mt-2">{meal.strMeal}</h3>
              </div>
            ))}
          </div>
        ) : (
          <p>No Meals Found</p>
        )}
      </main>
    </div>
  );
}

export default App;
