import bgImage from "../assets/images/ora-logo-white.png";
import { useState } from "react"

function Header() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()){
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
        <h1 className="text-7xl font-bold">ORA'S Treats</h1>
        <h4 className="text-lg mt-2">Recipe Finder</h4>
        <h2 className="text-xl mt-2">Discover, Plan and Savor Every Meal</h2>
        <p className="mt-4 font-mono max-w-xl">
          Find delicious recipes, plan your meals, and shop smarter with ORA’s Treat Recipes.
        </p>
      </div>
      <form onSubmit={handleSubmit}
      className="flex gap-2">
              <input
                  type="text"
                  value={query}
                  onChange={(e) =>
                    setQuery(e.target.value)}
                    placeholder="Find Your Next Treat"
                    className="p-2 rounded text-black"/>
                    <button
                    type="submit"
                    className="bg-white text-green-300 px-4 py-2 rounded font-semibold">
                      
                    </button>
      </form>
    </header>
  );
}

export default Header;
