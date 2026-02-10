import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiHeart, BiShoppingBag, BiTrash } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';
import TreatCard from './TreatCard';
import { useNotification } from '../context/NotificationContext';

function Favorites() {
  const { showNotification } = useNotification();
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    try {
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      // Ensure we only have valid objects with IDs
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

        {favorites.length === 0 ? (
          <div 
            className="text-center py-20 bg-white rounded-3xl shadow-lg border border-gray-100"
          >
            <div className="text-6xl mb-6 text-[#f93270] animate-pulse">❤️</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">Your vault is empty</h3>
            <p className="text-gray-500 mb-8">Save your favorite recipes here for quick access!</p>
            <Link 
              to="/treats" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#005c29] text-white rounded-full font-bold hover:bg-[#004a21] transition-all transform hover:scale-105 shadow-lg"
            >
              <BiShoppingBag /> Find Treats
            </Link>
          </div>
        ) : (
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
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
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
