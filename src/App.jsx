import TreatBar from "./components/TreatBar";
import TreatCard from "./components/TreatCard";
import { useEffect, useState } from "react";
import TreatDetails from "./components/TreatDetails";
import { Routes, Route } from "react-router-dom";

function App() {
  const [treats, setTreats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("chicken");

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((res) => res.json())
      .then((treatData) => {
        setTreats(treatData.meals || []);
      })
      .catch((error) => {
        console.error("Error fetching treats:", error);
      });
  }, [searchTerm]);

  return (
    <div>
      <TreatBar onSearch={(term) => setSearchTerm(term)} />
      <main className="p-4">
        <Routes>
          <Route
            path="/"
            element={
              treats.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                  {treats.map((treat) => (
                    <TreatCard key={treat.idMeal} treat={treat} />
                  ))}
                </div>
              ) : (
                <p>No Treats Found</p>
              )
            }
          />
          <Route path="/treat/:id" element={<TreatDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
