import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import bgImage from "../assets/images/ora-logo-white.png";

function TreatBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="relative w-full min-h-[650px] text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
     
      <div className="absolute inset-0 bg-black/50"></div>

 
      <nav className="relative z-20 flex justify-between items-center p-6">
        <div>
          <h1 className="text-2xl font-bold">ORA’s Treats</h1>
          <h4 className="text-sm font-light">Recipe Finder</h4>
        </div>

     
        <button
          className="sm:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

     
        <ul className="hidden sm:flex gap-8 font-medium">
          <li><Link to="/" className="hover:text-green-400">Kitchen</Link></li>
          <li><Link to="/treats" className="hover:text-green-400">Treats</Link></li>
          <li><Link to="/about" className="hover:text-green-400">Behind the Treats</Link></li>
          <li><Link to="/contact" className="hover:text-green-400">Join the Banquet</Link></li>
          <li><Link to="/favorites" className="hover:text-green-400">Flavor Vault</Link></li>
          <li><Link to="/planner" className="hover:text-green-400">Treat Map</Link></li>
          <li><Link to="/grocerylist" className="hover:text-green-400">Market Basket</Link></li>
        </ul>
      </nav>

      {isOpen && (
        <ul className="sm:hidden flex flex-col items-center gap-4 mt-4 font-medium bg-black/70 p-4 rounded-lg mx-6 z-20 relative">
          <li><Link to="/" onClick={() => setIsOpen(false)}>Kitchen</Link></li>
          <li><Link to="/treats" onClick={() => setIsOpen(false)}>Treats</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>Behind the Treats</Link></li>
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>Join the Banquet</Link></li>
          <li><Link to="/favorites" onClick={() => setIsOpen(false)}>Flavor Vault</Link></li>
          <li><Link to="/planner" onClick={() => setIsOpen(false)}>Treat Map</Link></li>
          <li><Link to="/grocerylist" onClick={() => setIsOpen(false)}>Market Basket</Link></li>
        </ul>
      )}

  
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h2 className="text-3xl mt-2">Discover, Plan and Savor Every Meal</h2>
        <p className="mt-4 text-lg font-mono max-w-xl">
          Find delicious recipes, plan your meals, and shop smarter with ORA’s Treat Recipes.
        </p>
      </div>
    </header>
  );
}

export default TreatBar;
