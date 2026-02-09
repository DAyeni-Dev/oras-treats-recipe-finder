import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { useNotification } from '../context/NotificationContext';

function TreatCard({ id, title, image, tags, onToggle }) {
  const { showNotification } = useNotification();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some(fav => fav.id === id));
  }, [id]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter(fav => fav.id !== id);
      showNotification('Removed from Favorites', 'error');
    } else {
      newFavorites = [...favorites, { id, title, image, tags }];
      showNotification('Added to Favorites!');
    }

    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
    
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
      <Link to={`/treats/${id}`} className="flex flex-col h-full">
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={image || "https://placehold.co/600x400?text=Yummy+Treat"} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-all transform hover:scale-110 z-10"
          >
            {isFavorite ? (
              <BiSolidHeart className="text-[#f93270] text-xl" />
            ) : (
              <BiHeart className="text-gray-400 hover:text-[#f93270] text-xl" />
            )}
          </button>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-[#005c29] mb-2 font-chewy tracking-wide group-hover:text-[#f93270] transition-colors">
            {title}
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags?.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-[#8fbf1a]/10 text-[#5a7a10] text-xs font-medium rounded-md">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
            <span className="text-[#f93270] font-semibold group-hover:underline">View Recipe →</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default TreatCard;
