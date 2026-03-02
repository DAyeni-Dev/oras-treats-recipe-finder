import React from 'react';
import { BiHardHat } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Community = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center border border-gray-100">
        <div className="w-24 h-24 bg-[#8fbf1a]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <BiHardHat className="text-5xl text-[#8fbf1a]" />
        </div>
        
        <h1 className="text-3xl font-chewy text-[#005c29] mb-4 tracking-wide">
          The Banquet is <span className="text-[#f93270]">Cooking</span>
        </h1>
        
        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          We're currently building a space for our community to connect and share.
           This feature is under construction and will be ready soon!
        </p>
        
        <div className="flex flex-col gap-3">
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-[#8fbf1a] w-[65%] animate-pulse rounded-full"></div>
          </div>
          <p className="text-xs font-bold text-[#8fbf1a] uppercase tracking-widest">Construction in progress</p>
        </div>

        <Link 
          to="/" 
          className="mt-10 inline-flex items-center justify-center px-8 py-3 bg-[#005c29] text-white rounded-full font-bold hover:bg-[#004a21] transition-all transform hover:scale-105 shadow-lg w-full"
        >
          Back to Kitchen
        </Link>
      </div>
    </div>
  );
};

export default Community;
