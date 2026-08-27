import React from 'react';
import { Search } from 'lucide-react';

const Hero = ({ openAuthModal }) => {
  return (
    <div className="relative bg-theme-bg pt-16 pb-24 sm:pt-24 sm:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-espresso tracking-tight mb-6">
          Find the Perfect <span className="text-coral">Smart Worker</span><br/> for Your Next Big Idea
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-theme-muted mb-10">
          The ultimate platform for top-tier freelancers and visionary clients. High quality work, guaranteed.
        </p>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto bg-card rounded-full shadow-lg flex items-center p-2 mb-12 border border-theme-border transition-shadow focus-within:shadow-xl focus-within:border-peach">
          <div className="pl-4 text-theme-muted">
            <Search size={24} />
          </div>
          <input 
            type="text" 
            placeholder="What service are you looking for?" 
            className="flex-1 w-full bg-transparent border-none py-3 px-4 text-espresso placeholder-muted focus:outline-none focus:ring-0 text-lg"
          />
          <button className="bg-coral hover:opacity-90 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all duration-200 active:scale-95 whitespace-nowrap">
            Search
          </button>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => openAuthModal('client')}
            className="w-full sm:w-auto bg-espresso hover:bg-espresso/90 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-200 active:scale-95"
          >
            Hire a Smart Worker
          </button>
          <button 
            onClick={() => openAuthModal('worker')}
            className="w-full sm:w-auto bg-card border border-peach text-peach hover:bg-peach/10 font-semibold py-3 px-8 rounded-lg shadow-sm transition-all duration-200 active:scale-95"
          >
            Join as a Freelancer
          </button>
        </div>

      </div>
    </div>
  );
};

export default Hero;
