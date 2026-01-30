import { Link } from "react-router-dom";
import landingImage from "../assets/images/landing.png";

function LandingPage() {
  return (
    <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden h-full">
      
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#f93270]/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-20 w-[200px] h-[200px] bg-[#8fbf1a]/10 rounded-full blur-3xl translate-y-1/3 pointer-events-none" />

     
      <div className="relative z-10 w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left justify-center">
        <h1 className="text-4xl md:text-5xl font-chewy mb-2 text-[#005c29] tracking-wide leading-tight">
          Welcome to <br className="hidden md:block" />
          <span className="text-[#f93270]">ORA's Tr</span><span className="text-[#8fbf1a]">eats</span>
        </h1>
        <h2 className="text-base md:text-lg font-light mb-4 text-[#8fbf1a] tracking-widest uppercase">
          Recipe Finder
        </h2>

        <div className="space-y-3 text-sm md:text-base text-gray-700 leading-relaxed max-w-lg">
          <p>
            Cooking should be fun, messy, and delicious! 
            Find your next obsession, turn "nothing to eat" into a feast, 
            and plan meals that make you smile.
          </p>
          <p>
            Let's make some magic in the kitchen!
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
          <Link
            to="/treats"
            className="bg-[#f93270] text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#005c29] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Browse Treats
          </Link>
          <Link
            to="/grocerylist"
            className="border-2 border-[#005c29] text-[#005c29] px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#005c29] hover:text-white transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Your Basket
          </Link>
        </div>
      </div>

      
      <div className="relative z-10 w-full md:w-1/2 flex justify-center items-center p-2">
        <img 
          src={landingImage} 
          alt="Delicious food spread" 
          className="max-w-[70%] md:max-h-[60vh] h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  );
}

export default LandingPage;