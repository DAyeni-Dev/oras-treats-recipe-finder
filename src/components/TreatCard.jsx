import React from 'react';
import { Link } from 'react-router-dom';

function TreatCard({ id, title, image, tags }) {
  return (
    <Link to={`/treats/${id}`} className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-1">
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={image || "https://placehold.co/600x400?text=Yummy+Treat"} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
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
  );
}

export default TreatCard;
