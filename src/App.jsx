import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import TreatBar from "./components/TreatBar";
import TreatList from "./components/TreatList";
import TreatDetails from "./components/TreatDetails";

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
    <div className="flex flex-col min-h-screen">
      <TreatBar onSearch={setSearchTerm} />

      <main className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path="/treats" element={<TreatList treats={treats} />} />
          <Route path="/treat/:id" element={<TreatDetails />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
