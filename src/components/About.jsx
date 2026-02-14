import React from 'react';
import { BiSearchAlt, BiCart, BiHeart } from 'react-icons/bi';
import pantryImg from '../assets/images/pantry.jpg';

export default function About() {
  return (
    <div className="relative min-h-screen bg-white">
      
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      
        <div className="text-center mb-16">
          <h1 className="text-5xl font-chewy text-[#005c29] mb-6">
            About <span className="text-[#f93270]">ORA's Tr</span><span className="text-[#8fbf1a]">eats</span> Recipe Finder
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your personal kitchen assistant designed to make cooking fun, stress-free, and creative.
          </p>
        </div>

        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
             <h2 className="text-3xl font-bold text-[#8fbf1a] mb-4">More Than Just Recipes</h2>
             <p className="text-gray-700 leading-relaxed text-lg">
               <span className="text-[#f93270]">ORA's Tr</span><span className="text-[#8fbf1a]">eats</span> 
               Recipe Finder is more than just a recipe app, it’s your personal 
               kitchen assistant designed to make cooking fun, stress-free, and creative. 
               Whether you’re a beginner learning your way around the kitchen or a seasoned 
               cook looking for fresh inspiration, this app helps you discover new meals, 
               organize your cooking process, and bring more joy to your dining table.
             </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
             <img src={pantryImg} alt="Pantry full of ingredients" className="w-full h-full object-cover" />
          </div>
        </div>

        
        <div className="bg-[#005c29] text-white rounded-3xl p-10 md:p-16 mb-20 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#8fbf1a]/20 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          
          <h2 className="text-3xl font-bold mb-10 text-center relative z-10">What You Can Do</h2>
          
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            <div className="text-center p-4">
               <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <BiSearchAlt size={32} />
               </div>
               <h3 className="font-bold text-xl mb-3 text-[#8fbf1a]">Discover & Upload</h3>
               <p className="text-white/80">Search for global recipes or upload your personal favorites.</p>
            </div>
            <div className="text-center p-4">
               <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <BiCart size={32} />
               </div>
               <h3 className="font-bold text-xl mb-3 text-[#8fbf1a]">Plan & Shop</h3>
               <p className="text-white/80">Plan meals daily,weekly or monthly. Create smart grocery lists, and scale recipes.</p>
            </div>
            <div className="text-center p-4">
               <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <BiHeart size={32} />
               </div>
               <h3 className="font-bold text-xl mb-3 text-[#8fbf1a]">Reduce Waste</h3>
               <p className="text-white/80">Generate meal ideas from ingredients you already have at home.</p>
            </div>
          </div>
          
          <div className="mt-10 text-center relative z-10">
             <p className="text-lg leading-relaxed max-w-3xl mx-auto opacity-90">
               With <span className="text-[#f93270]">ORA's Tr</span><span className="text-[#8fbf1a]">eats</span> Recipe Finder, you can search for recipes from around the world, upload 
               your own personal favorites, or generate meal ideas from the ingredients 
               you already have at home, so nothing goes to waste.
             </p>
          </div>
        </div>

        
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#005c29] mb-6">Our Goal is Simple</h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-8">
             To help food lovers cook smarter, eat healthier, and treat every meal like a celebration. 
             With a growing community of recipe enthusiasts, <span className="text-[#f93270]">ORA's Tr</span><span className="text-[#8fbf1a]">eats</span> is your go-to companion for 
             turning everyday cooking into an experience worth savoring.
          </p>
          
        </div>

      </div>
    </div>
  );
}
