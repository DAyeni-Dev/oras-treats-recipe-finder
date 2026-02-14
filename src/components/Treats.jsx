import React, { useState, useEffect } from 'react';
import { BiSearch, BiFilter, BiLoaderAlt, BiGlobe } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';
import TreatCard from './TreatCard';
import drinksData from '../data/drinks.json';

function Treats() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCategory, setCurrentCategory] = useState("Dessert");
  const [currentArea, setCurrentArea] = useState("");
  const [treats, setTreats] = useState([]);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
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

    
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then(res => res.json())
      .then(data => {
        if (data.meals) {
          setAreas(data.meals);
        }
      })
      .catch(err => console.error("Error fetching areas:", err));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setTreats([]);

    const delayDebounceFn = setTimeout(() => {
      
      if (currentCategory === 'Drinks' && !currentArea) {
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
        } else if (currentArea) {
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${currentArea}`;
        } else {
          const categoryToFetch = currentCategory === "All" ? "Dessert" : currentCategory;
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
  }, [searchTerm, currentCategory, currentArea]);

  const handleCategoryClick = (cat) => {
    setCurrentCategory(cat);
    setCurrentArea(""); 
    setSearchTerm("");
  };

  const handleAreaClick = (area) => {
    setCurrentArea(area);
    setCurrentCategory("All"); 
    setSearchTerm("");
  };

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
                currentCategory === 'Drinks' 
                  ? "Search for refreshing drinks..." 
                  : "Search for tasty treats..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border-0 shadow-lg text-gray-700 focus:ring-4 focus:ring-[#f93270]/20 focus:outline-none text-lg"
            />
            <BiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl" />
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="relative group">
              <BiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg z-10" />
              <select 
                value={currentCategory}
                onChange={(e) => handleCategoryClick(e.target.value)}
                className="appearance-none w-full pl-12 pr-12 py-3 rounded-full border-0 shadow-lg text-gray-700 font-medium focus:ring-4 focus:ring-[#f93270]/20 focus:outline-none cursor-pointer min-w-[200px] bg-white transition-transform hover:scale-105"
              >
                <option value="All" className="text-gray-700">All Types</option>
                {categories.map((cat) => (
                  <option key={cat.idCategory} value={cat.strCategory} className="text-gray-700">
                    {cat.strCategory}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
                ▼
              </div>
            </div>

            <div className="relative group">
              <BiGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg z-10" />
              <select 
                value={currentArea}
                onChange={(e) => handleAreaClick(e.target.value)}
                className="appearance-none w-full pl-12 pr-12 py-3 rounded-full border-0 shadow-lg text-gray-700 font-medium focus:ring-4 focus:ring-[#f93270]/20 focus:outline-none cursor-pointer min-w-[200px] bg-white transition-transform hover:scale-105"
              >
                <option value="" className="text-gray-700">All Cuisines</option>
                {areas.map(area => (
                  <option key={area.strArea} value={area.strArea} className="text-gray-700">
                    {area.strArea}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
                ▼
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

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
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode='popLayout'>
                {treats.map(treat => (
                  <motion.div
                    key={treat.idMeal}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TreatCard 
                      id={treat.idMeal}
                      title={treat.strMeal}
                      image={treat.strMealThumb}
                      tags={[
                        treat.strCategory || currentCategory, 
                        treat.strArea,
                        ...(treat.strTags ? treat.strTags.split(',') : [])
                      ].filter(Boolean).slice(0, 3)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-20">
                   <h3 className="text-2xl font-bold text-gray-700 mb-2">
                {currentCategory === 'Drinks' ? "No drinks found!" : "No treats found!"}
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
