import React, { useState } from 'react';
import { 
  Wrench, 
  MapPin, 
  ChevronDown, 
  Menu, 
  X 
} from 'lucide-react';

const Navbar = ({ openAuthModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [findWorkersOpen, setFindWorkersOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="w-full bg-[#17382B] text-white sticky top-0 z-50 shadow-md">
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* 1. Logo Section */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer">
            <div className="w-9 h-9 rounded-lg border border-[#D96B27]/40 bg-[#122c22] flex items-center justify-center">
              <Wrench className="w-5 h-5 text-[#D96B27]" />
            </div>
            <div className="flex flex-col select-none">
              <div className="text-xl font-bold tracking-tight leading-none text-white">
                Smart<span className="text-[#D96B27]">Worker</span>
              </div>
              <span className="text-[8px] text-[#A3B8B0] tracking-widest uppercase font-semibold mt-1">
                FIND. HIRE. RELAX.
              </span>
            </div>
          </div>

          {/* 2. Center Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-8 text-[13.5px] font-medium text-[#D1DDD7]">
            <a 
              href="#" 
              className="text-white font-semibold relative py-1 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-white after:rounded-full"
            >
              Home
            </a>

            {/* Find Workers Dropdown */}
            <div className="relative">
              <button 
                onClick={() => { setFindWorkersOpen(!findWorkersOpen); setServicesOpen(false); }}
                className="flex items-center gap-1.5 hover:text-white transition py-1"
              >
                <span>Find Workers</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>
              {findWorkersOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#1B3B36] border border-[#2A4D46] rounded-xl shadow-xl py-2 z-50 text-white">
                  <a href="#" className="block px-4 py-2 hover:bg-[#122c22] hover:text-[#D96B27] text-xs">Top Rated</a>
                  <a href="#" className="block px-4 py-2 hover:bg-[#122c22] hover:text-[#D96B27] text-xs">Near You</a>
                  <a href="#" className="block px-4 py-2 hover:bg-[#122c22] hover:text-[#D96B27] text-xs">Verified Only</a>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div className="relative">
              <button 
                onClick={() => { setServicesOpen(!servicesOpen); setFindWorkersOpen(false); }}
                className="flex items-center gap-1.5 hover:text-white transition py-1"
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#1B3B36] border border-[#2A4D46] rounded-xl shadow-xl py-2 z-50 text-white">
                  <a href="#" className="block px-4 py-2 hover:bg-[#122c22] hover:text-[#D96B27] text-xs">Plumbing</a>
                  <a href="#" className="block px-4 py-2 hover:bg-[#122c22] hover:text-[#D96B27] text-xs">Electrician</a>
                  <a href="#" className="block px-4 py-2 hover:bg-[#122c22] hover:text-[#D96B27] text-xs">Carpenter</a>
                  <a href="#" className="block px-4 py-2 hover:bg-[#122c22] hover:text-[#D96B27] text-xs">AC Repair</a>
                </div>
              )}
            </div>

            <a href="#" className="hover:text-white transition py-1">How It Works</a>
            <a href="#" className="hover:text-white transition py-1">For Businesses</a>
            <a href="#" className="hover:text-white transition py-1">Become a Worker</a>
            <a href="#" className="hover:text-white transition py-1">About Us</a>
          </nav>

          {/* 3. Location & Auth Actions */}
          <div className="hidden lg:flex items-center space-x-4 shrink-0">
            {/* Location Selector */}
            <button className="flex items-center gap-1.5 text-xs text-[#D1DDD7] hover:text-white px-2 py-1 transition">
              <MapPin className="w-3.5 h-3.5 text-[#D96B27]" />
              <span>Lahore, Pakistan</span>
              <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
            </button>

            {/* Log In Button */}
            <button onClick={openAuthModal} className="text-xs font-medium text-white px-4 py-2 rounded-lg border border-[#305345] hover:bg-[#1f4535] transition">
              Log In
            </button>

            {/* Sign Up CTA */}
            <button onClick={() => openAuthModal && openAuthModal('client')} className="text-xs font-semibold text-white bg-[#D96B27] hover:bg-[#bf5817] px-5 py-2.5 rounded-lg shadow-sm transition">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#122c22] border-t border-[#234537] px-6 pt-3 pb-6 space-y-3">
          <a href="#" className="block py-2 text-sm font-semibold text-white">Home</a>
          <a href="#" className="block py-2 text-sm text-[#D1DDD7]">Find Workers</a>
          <a href="#" className="block py-2 text-sm text-[#D1DDD7]">Services</a>
          <a href="#" className="block py-2 text-sm text-[#D1DDD7]">How It Works</a>
          <a href="#" className="block py-2 text-sm text-[#D1DDD7]">For Businesses</a>
          <a href="#" className="block py-2 text-sm text-[#D1DDD7]">Become a Worker</a>
          <a href="#" className="block py-2 text-sm text-[#D1DDD7]">About Us</a>
          <div className="pt-4 border-t border-[#234537] flex flex-col gap-2.5">
            <button onClick={openAuthModal} className="w-full py-2 text-center text-xs font-medium text-white border border-[#305345] rounded-lg">
              Log In
            </button>
            <button onClick={() => openAuthModal && openAuthModal('client')} className="w-full py-2 text-center text-xs font-semibold text-white bg-[#D96B27] rounded-lg">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
