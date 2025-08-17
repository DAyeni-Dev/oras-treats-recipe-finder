import Header from "./components/Header";
import RecipeCard from "./components/RecipeCard";
import { useEffect, useState } from "react";

function App() {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("chicken");

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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {meals.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} />
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
