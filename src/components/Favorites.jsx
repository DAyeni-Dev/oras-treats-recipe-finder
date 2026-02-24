import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiHeart, BiShoppingBag, BiTrash, BiX } from 'react-icons/bi';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import TreatCard from './TreatCard';
import { useNotification } from '../context/NotificationContext';

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Fruits'];

function Favorites() {
  const { showNotification } = useNotification();
  const [favorites, setFavorites] = useState([]);
  const [planningTreat, setPlanningTreat] = useState(null);
  const [planDate, setPlanDate] = useState(new Date().toISOString().split('T')[0]);
  const [planType, setPlanType] = useState('Breakfast');

  const loadFavorites = () => {
    try {
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      
      const validFavorites = Array.isArray(savedFavorites) 
        ? savedFavorites.filter(item => item && typeof item === 'object' && item.id)
        : [];
      setFavorites(validFavorites);
    } catch (e) {
      console.error("Failed to load favorites:", e);
      setFavorites([]);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handlePlanMeal = (e) => {
    e.preventDefault();
    if (!planningTreat || !planDate || !planType) return;

    try {
      const mealPlan = JSON.parse(localStorage.getItem('mealPlan') || '{}');
      const currentDayMeals = mealPlan[planDate] || [];
      
      // Check if this meal type is already planned for this day
      if (currentDayMeals.some(m => m.type === planType)) {
        showNotification(`${planType} is already planned for this day!`, 'error');
        return;
      }

      const updatedPlan = {
        ...mealPlan,
        [planDate]: [...currentDayMeals, { 
          id: Date.now(),
          type: planType, 
          name: planningTreat.title, 
          recipeId: planningTreat.id 
        }]
      };

      localStorage.setItem('mealPlan', JSON.stringify(updatedPlan));
      showNotification(`${planningTreat.title} added to your plan for ${planDate}!`);
      setPlanningTreat(null);
    } catch (e) {
      console.error("Failed to save to plan:", e);
      showNotification("Failed to add to plan", "error");
    }
  };

  const clearAllFavorites = () => {
    if (window.confirm("Are you sure you want to clear all your favorites? This cannot be undone.")) {
      localStorage.setItem('favorites', '[]');
      setFavorites([]);
      showNotification("All favorites cleared!", "info");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-[#005c29] py-12 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#8fbf1a] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#f93270] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-chewy text-white mb-4 tracking-wide">
            Your <span className="text-[#f93270]">Flavor</span> <span className="text-[#8fbf1a]">Vault</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            All your most loved treats, safe and sound.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">My Collection ({favorites.length})</h2>
          {favorites.length > 0 && (
            <button 
              onClick={clearAllFavorites}
              className="flex items-center gap-2 px-4 py-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
            >
              <BiTrash className="text-xl" /> Clear All
            </button>
          )}
        </div>

        {favorites.length > 0 && (
          <p className="text-sm text-gray-500 mb-6">
            Click a card to open the recipe. Tap the pink heart to remove it from your vault.
          </p>
        )}

        {favorites.length === 0 ? (
          <div 
            className="text-center py-20 bg-white rounded-3xl shadow-lg border border-gray-100"
          >
            <div className="text-6xl mb-6 text-[#f93270] animate-pulse">❤️</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">Your vault is empty</h3>
            <p className="text-gray-500 mb-8">
              Save your favorite recipes here for quick access. Tap the heart on any treat to add it to your vault.
            </p>
            <Link 
              to="/treats" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#005c29] text-white rounded-full font-bold hover:bg-[#004a21] transition-all transform hover:scale-105 shadow-lg"
            >
              <BiShoppingBag /> Find Treats
            </Link>
          </div>
        ) : (
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch"
          >
              {favorites.map(treat => (
                <div
                  key={treat.id}
                >
                  <TreatCard 
                    id={treat.id}
                    title={treat.title}
                    image={treat.image}
                    tags={treat.tags}
                    onToggle={loadFavorites}
                    showPlanButton={true}
                    onPlan={(t) => setPlanningTreat(t)}
                  />
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Quick Plan Modal */}
      <AnimatePresence>
        {planningTreat && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setPlanningTreat(null)}>
            <Motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" 
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-[#005c29] p-4 text-white flex justify-between items-center">
                <h3 className="font-bold text-lg">Add to Meal Plan</h3>
                <button onClick={() => setPlanningTreat(null)} className="hover:text-red-200">
                  <BiX className="text-2xl" />
                </button>
              </div>
              
              <div className="p-4 border-b border-gray-100 flex items-center gap-4 bg-gray-50/50">
                <img src={planningTreat.image} alt={planningTreat.title} className="w-16 h-16 rounded-lg object-cover shadow-sm" />
                <div>
                  <h4 className="font-bold text-[#005c29]">{planningTreat.title}</h4>
                  <p className="text-xs text-gray-500 line-clamp-1">{planningTreat.tags?.join(' • ')}</p>
                </div>
              </div>

              <form onSubmit={handlePlanMeal} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5 text-left">When are we eating this?</label>
                  <input 
                    type="date" 
                    value={planDate}
                    onChange={e => setPlanDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8fbf1a] outline-none text-gray-700"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5 text-left">Meal Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {MEAL_TYPES.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setPlanType(type)}
                        className={`py-2 px-3 rounded-lg text-sm font-bold transition-all border ${
                          planType === type 
                            ? 'bg-[#8fbf1a] text-white border-[#8fbf1a] shadow-md' 
                            : 'bg-white text-gray-500 border-gray-200 hover:border-[#8fbf1a] hover:text-[#005c29]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setPlanningTreat(null)}
                    className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 px-6 py-2 bg-[#f93270] text-white rounded-lg font-bold hover:bg-[#d6255b] shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Add to Plan
                  </button>
                </div>
              </form>
            </Motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Favorites;
