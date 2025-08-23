import bgImage from "../assets/images/ora-logo-white.png";
import { useState } from "react";

function TreatBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <header className="relative w-full h-[650px]">
      <img
        src={bgImage}
        alt="Company Logo"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-6xl md:text-7xl font-extrabold">ORA'S Treats</h1>
        <h4 className="text-2xl mt-4 font-semibold">Recipe Finder</h4>
        <h2 className="text-3xl mt-2">Discover, Plan and Savor Every Meal</h2>
        <p className="mt-6 text-lg font-mono max-w-xl">
          Find delicious recipes, plan your meals, and shop smarter with ORA’s Treat Recipes.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex gap-2 bg-white rounded p-2 shadow-md"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find Your Next Treat"
            className="p-2 rounded text-black outline-none w-64"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded font-semibold hover:bg-green-600 transition"
          >
            Let's Go
          </button>
        </form>
      </div>
    </header>
  );
}

export default TreatBar;
