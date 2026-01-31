import { Link } from "react-router-dom";
import { BiLogoFacebook, BiLogoInstagram, BiLogoWhatsapp, BiEnvelope, BiPhone } from "react-icons/bi";

export default function Footer() {
  return (
    <footer className="bg-[#005c29] text-white py-6 border-t-4 border-[#f93270]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        
        
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-2xl font-chewy tracking-wide">
            <span className="text-[#f93270]">ORA's Tr</span><span className="text-[#8fbf1a]">eats</span>
          </h3>
          <p className="text-xs opacity-80 mt-1 max-w-xs">
             Savor the Treat!
          </p>
        </div>

        
        <div className="flex gap-6 text-sm font-medium">
          <Link to="/treats" className="hover:text-[#f93270] transition-colors">Treats Collection</Link>
          <Link to="/grocerylist" className="hover:text-[#f93270] transition-colors">Market Basket</Link>
          <Link to="/" className="hover:text-[#f93270] transition-colors">Kitchen | Home</Link>
        </div>

        
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex space-x-3">
            <a href="https://www.facebook.com/profile.php?id=61575480968843&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="hover:text-[#f93270] transition-colors">
              <BiLogoFacebook size={20} />
            </a>
            <a href="https://www.instagram.com/oras_treats" target="_blank" rel="noopener noreferrer" className="hover:text-[#f93270] transition-colors">
              <BiLogoInstagram size={20} />
            </a>
            <a href="https://wa.me/2347079139920" target="_blank" rel="noopener noreferrer" className="hover:text-[#f93270] transition-colors">
              <BiLogoWhatsapp size={20} />
            </a>
          </div>
          <div className="flex flex-col items-center md:items-end gap-1 text-xs opacity-90">
             <a href="mailto:oluwadamilolaayeni321@gmail.com" className="hover:text-[#f93270]">oluwadamilolaayeni321@gmail.com</a>
             <a href="tel:+2347079139920" className="hover:text-[#f93270]">+234 707 913 9920</a>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-4 text-[10px] opacity-60">
        &copy; {new Date().getFullYear()} ORA's Treats. All rights reserved.
      </div>
    </footer>
  );
}
