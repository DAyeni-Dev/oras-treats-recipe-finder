import { Link } from "react-router-dom";
import landingImage from "../assets/images/olp.png";

function LandingPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 w-full h-full relative overflow-hidden">
      
      
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${landingImage})` }}
      />

      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#f93270]/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-20 w-[200px] h-[200px] bg-[#8fbf1a]/10 rounded-full blur-3xl translate-y-1/3 pointer-events-none z-0" />

     
      <div className="relative z-10 w-full flex flex-col items-center text-center justify-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-chewy mb-2 text-[#005c29] tracking-wide leading-tight">
          Welcome to <br className="hidden md:block" />
          <span className="text-[#f93270]">ORA's Tr</span><span className="text-[#8fbf1a]">eats</span>
        </h1>
        <h2 className="text-lg md:text-xl font-semibold mb-6 text-[#8fbf1a] tracking-widest uppercase">
          Recipe Finder
        </h2>

        <div className="space-y-4 text-base md:text-lg text-gray-800 leading-relaxed max-w-2xl font-medium">
          <p>
            Cooking should be fun, messy, and delicious! 
            Find your next obsession, turn "nothing to eat" into a feast, 
            and plan meals that make you smile.
          </p>
          <p>
            Let's make some magic in the kitchen!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <Link
            to="/treats"
            className="bg-[#f93270] text-white px-8 py-3 rounded-full font-bold text-base hover:bg-[#005c29] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Browse Treats
          </Link>
          <Link
            to="/grocerylist"
            className="border-2 border-[#005c29] text-[#005c29] px-8 py-3 rounded-full font-bold text-base hover:bg-[#005c29] hover:text-white transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 bg-white"
          >
            Your Basket
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;