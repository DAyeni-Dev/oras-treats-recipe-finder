import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';
import TreatBar from './TreatBar';
import Footer from './Footer';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex w-full h-screen bg-white overflow-hidden relative">
      
      <button 
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-[#005c29] text-white rounded-full shadow-lg hover:bg-[#8fbf1a] transition-colors"
        onClick={() => setIsSidebarOpen(true)}
      >
        <BiMenu size={24} />
      </button>

      
      <TreatBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      
      <main className="flex-1 relative flex flex-col overflow-y-auto w-full bg-gray-50">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col min-h-full"
          >
            <div className="flex-1 flex flex-col">
              <Outlet />
            </div>
            
            <Footer />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Layout;
