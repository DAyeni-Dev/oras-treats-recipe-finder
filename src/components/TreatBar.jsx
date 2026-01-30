import { Link, NavLink } from "react-router-dom";
import { BiX } from "react-icons/bi";
import logo from "../assets/images/ora-logo-white.png";

export default function TreatBar({ isOpen, onClose }) {
  const linkClass = ({ isActive }) =>
    `flex items-center px-6 py-3 transition-colors duration-200 font-medium text-lg ${
      isActive
        ? "bg-[#8fbf1a] text-[#005c29] border-r-4 border-[#f93270]"
        : "text-white hover:bg-[#8fbf1a]/10 hover:text-[#8fbf1a]"
    }`;

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside 
        className={`
          w-64 h-screen bg-[#005c29] flex flex-col border-r border-[#8fbf1a]/20 shadow-2xl flex-shrink-0 
          fixed md:sticky top-0 z-50 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Close Button (Mobile Only) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-[#f93270] transition-colors md:hidden z-50"
        >
          <BiX size={28} />
        </button>

        {/* Logo Section */}
        <div className="p-8 flex flex-col items-center justify-center border-b border-[#8fbf1a]/20">
          <Link to="/" className="flex flex-col items-center gap-4 group" onClick={() => onClose && onClose()}>
            <img
              src={logo}
              alt="ORA's Treats Logo"
              className="h-24 w-24 object-cover rounded-full border-4 border-[#8fbf1a] shadow-lg transition-transform group-hover:scale-105"
            />
            <span className="font-bold text-xl tracking-wider transition-colors">
              <span className="text-[#f93270]">ORA's Tr</span><span className="text-[#8fbf1a]">eats</span>
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-10 flex flex-col space-y-4 overflow-y-auto">
          <NavLink to="/" className={linkClass} onClick={() => onClose && onClose()}>
            Kitchen
          </NavLink>
          <NavLink to="/about" className={linkClass} onClick={() => onClose && onClose()}>
            Behind the Treats
          </NavLink>
          <NavLink to="/treats" className={linkClass} onClick={() => onClose && onClose()}>
            Treats
          </NavLink>
          <NavLink to="/favorites" className={linkClass} onClick={() => onClose && onClose()}>
            Flavor Vault
          </NavLink>
          <NavLink to="/planner" className={linkClass} onClick={() => onClose && onClose()}>
            Treat Map
          </NavLink>
          <NavLink to="/grocerylist" className={linkClass} onClick={() => onClose && onClose()}>
            Market Basket
          </NavLink>
          <NavLink to="/contact" className={linkClass} onClick={() => onClose && onClose()}>
            Join the Banquet
          </NavLink>
        </nav>

        {/* Promo Section */}
        <div className="p-6 text-center border-t border-[#8fbf1a]/20 bg-[#004a21]">
          <h2 className="text-xl font-bold text-white leading-tight">
            Discover, Plan & <span className="text-[#f93270]">Savor</span> Every <span className="text-[#8fbf1a]">Meal</span>
          </h2>
          <p className="mt-3 text-xs font-sans text-white/80">
            Find delicious recipes, plan your meals, and shop smarter with <span className="text-[#f93270]">ORA's Tr</span><span className="text-[#8fbf1a]">eats</span>.
          </p>
        </div>

      </aside>
    </>
  );
}
