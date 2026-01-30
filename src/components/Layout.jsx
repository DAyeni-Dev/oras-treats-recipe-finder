import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import TreatBar from './TreatBar';
import Footer from './Footer';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex w-full h-screen bg-white overflow-hidden relative">
      {/* Mobile Toggle Button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-[#005c29] text-white rounded-full shadow-lg hover:bg-[#8fbf1a] transition-colors"
        onClick={() => setIsSidebarOpen(true)}
      >
        <BiMenu size={24} />
      </button>

      {/* Shared Sidebar */}
      <TreatBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col overflow-y-auto w-full">
        {/* Page Content */}
        <div className="flex-1 flex flex-col">
          <Outlet />
        </div>
        
        {/* Shared Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
