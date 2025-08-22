import Header from "./components/Header";
import RecipeCard from "./components/RecipeCard";
import { useEffect, useState } from "react";
import RecipeDetails from "./components/RecipeDetails"
import { Routes, Route } from "react-router-dom"

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
        console.error("Error fetching data:", error);
      });
  }, [searchTerm]);

  return (
    <div>
      <Header onSearch={(term) => setSearchTerm(term)} />
      <main className="p-4">
        <Routes> 
          <Route
           path="/"
           element={
                meals.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                    {meals.map((meal) => (
                      <RecipeCard key={meal.idMeal} meal={meal} />
                    ))}
                  </div>
        ) : (
          <p>No Meals Found</p>
        )
      }
      />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
    </Routes>
      </main>
    </div>
  );
}

export default App;
