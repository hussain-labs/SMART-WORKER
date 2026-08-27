import React from 'react';

const ThemePreview = () => {
  return (
    <div className="min-h-screen bg-theme-bg flex items-center justify-center p-6 font-sans">
      {/* Container Background (Canvas) - Actually inherited from body, but shown here as requested */}
      <div className="bg-card max-w-md w-full rounded-2xl shadow-xl overflow-hidden border border-theme-border transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
        {/* Header Section */}
        <div className="p-8 border-b border-theme-border">
          {/* Subtle Badge (Secondary/Peach) */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block bg-peach text-espresso font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              New Release
            </span>
            <span className="inline-block border border-peach text-peach font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              v1.0
            </span>
          </div>
          
          {/* Dark Espresso Heading */}
          <h2 className="text-3xl font-extrabold text-espresso mb-3 tracking-tight">
            Color Harmony
          </h2>
          {/* Muted Paragraph */}
          <p className="text-theme-muted leading-relaxed text-sm">
            Experience a carefully curated palette blending warm neutrals with vibrant coral accents. Designed to provide a modern, accessible, and inviting interface.
          </p>
        </div>
        
        {/* Action Section */}
        <div className="p-8 bg-theme-bg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-espresso font-medium">Ready to explore?</span>
            {/* Primary Button (Coral) */}
            <button className="bg-coral hover:opacity-90 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg active:scale-95 focus:ring-4 focus:ring-opacity-30 outline-none">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePreview;
