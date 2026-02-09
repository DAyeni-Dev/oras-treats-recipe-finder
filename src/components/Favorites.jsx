import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiHeart, BiShoppingBag } from 'react-icons/bi';
import TreatCard from './TreatCard';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

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
        {favorites.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-lg border border-gray-100">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map(treat => (
              <TreatCard 
                key={treat.id} 
                id={treat.id}
                title={treat.title}
                image={treat.image}
                tags={treat.tags}
                onToggle={loadFavorites}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
