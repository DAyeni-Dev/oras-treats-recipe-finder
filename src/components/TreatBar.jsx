import bgImage from "../assets/images/ora-logo-white.png";
import { useState } from "react";
import { Link } from "react-router-dom";

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
        <nav className="absolute top-0 left-0 w-full flex justify-between items-center p-6 z-20">
  <h1 className="text-2xl font-bold text-white">ORA’s Treats</h1>
  <h4 className="text-2xl mt-4 font-semibold">Recipe Finder</h4>
  <ul className="flex list-none gap-8 text-white font-medium">
    <li>
      <Link to="/" className="hover:text-green-400 transition">
        Kitchen/
      </Link>
    </li>
    <li>
      <Link to="/treats" className="hover:text-green-400 transition">
        Treats/
      </Link>
    </li>
    <li>
      <Link to="/About" className="hover:text-green-400 transition">
        Behind the Treats/
      </Link>
    </li>
    <li>
      <Link to="/Contact" className="hover:text-green-400 transition">
        Join the Banquet/
      </Link>
    </li>
    <li>
      <Link to="/favorites" className="hover:text-green-400 transition">
        Flavor Vault/
      </Link>
    </li>
    <li>
      <Link to="/Planner" className="hover:text-green-400 transition">
        Treat Map/
      </Link>
    </li>
    <li>
      <Link to="/grocerylist" className="hover:text-green-400 transition">
        Market Basket
      </Link>
    </li>
  </ul>
</nav>


      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
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
