import React, { useState, useEffect } from 'react';
import { BiSearch, BiFilter, BiLoaderAlt } from 'react-icons/bi';
import TreatCard from './TreatCard';
import drinksData from '../data/drinks.json';

function Treats() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Dessert"); // Default to Dessert for "Treats" theme
  const [treats, setTreats] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(res => res.json())
      .then(data => {
        if (data.categories) {
           const filteredCats = data.categories.filter(c => c.strCategory !== 'Goat');
           filteredCats.push({ idCategory: 'drinks', strCategory: 'Drinks' });
           setCategories(filteredCats);
        }
      })
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setTreats([]);

    const delayDebounceFn = setTimeout(() => {
      
      if (activeFilter === 'Drinks') {
        const filteredDrinks = drinksData.filter(drink => {
            if (!searchTerm) return true;
            return drink.name.toLowerCase().includes(searchTerm.toLowerCase());
        });

        const mappedDrinks = filteredDrinks.map(drink => ({
            idMeal: drink.id,
            strMeal: drink.name,
            strMealThumb: drink.image,
            strCategory: drink.category,
            strArea: drink.glass,
            strTags: drink.type || 'Alcoholic'
        }));
        
        setTreats(mappedDrinks);
        setLoading(false);

      } else {
        let url = '';
        if (searchTerm) {
          url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
        } else {
          const categoryToFetch = activeFilter === "All" ? "Dessert" : activeFilter;
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryToFetch}`;
        }

        fetch(url)
          .then(res => res.json())
          .then(data => {
            if (data.meals) {
              setTreats(data.meals);
            } else {
              setTreats([]);
            }
            setLoading(false);
          })
          .catch(err => {
            console.error("Error fetching treats:", err);
            setError("Failed to load treats. Please try again.");
            setLoading(false);
          });
      }

    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, activeFilter]);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-[#005c29] py-12 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#8fbf1a] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#f93270] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-chewy text-white mb-4 tracking-wide">
            Explore the <span className="text-[#f93270]">Tr</span><span className="text-[#8fbf1a]">eats</span>
          </h1>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Discover your next favorite meal or drink from our collection.
          </p>

          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder={
                activeFilter === 'Drinks' ? "Search for a Drink... (e.g., Margarita, Cola)" :
                "What are you craving? (e.g., cake, pasta...)"
              }
              className="w-full px-6 py-4 pl-12 rounded-full text-gray-700 bg-white shadow-lg focus:outline-none focus:ring-4 focus:ring-[#8fbf1a]/50 transition-all text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <div className="flex items-center gap-2 mr-2 text-gray-500 font-medium">
             <BiFilter /> Filters:
          </div>
          {categories.map(cat => (
            <button
              key={cat.idCategory}
              onClick={() => {
                setActiveFilter(cat.strCategory);
                setSearchTerm("");
              }}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                activeFilter === cat.strCategory && (activeFilter === 'Drinks' || !searchTerm)
                  ? 'bg-[#f93270] text-white shadow-md transform scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.strCategory}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <BiLoaderAlt className="animate-spin text-4xl text-[#8fbf1a] mb-4" />
            <p className="text-gray-500 font-medium">FINDING YOUR TREATS...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-gray-700 mb-2">Oops!</h3>
            <p className="text-gray-500">{error}</p>
          </div>
        )}

        {!loading && !error && (
          treats.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {treats.map(treat => (
                <TreatCard 
                  key={treat.idMeal} 
                  id={treat.idMeal}
                  title={treat.strMeal}
                  image={treat.strMealThumb}
                  tags={[
                    treat.strCategory || activeFilter, 
                    treat.strArea,
                    ...(treat.strTags ? treat.strTags.split(',') : [])
                  ].filter(Boolean).slice(0, 3)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
                   <h3 className="text-2xl font-bold text-gray-700 mb-2">
                {activeFilter === 'Drinks' ? "No drinks found!" : "No treats found!"}
              </h3>
              <p className="text-gray-500">Try adjusting your search or filters.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Treats;
