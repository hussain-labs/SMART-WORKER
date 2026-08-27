import React from 'react';
import { Briefcase, Globe, Mail, Link } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-espresso text-canvas py-12 border-t border-theme-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-coral p-1.5 rounded text-white">
                <Briefcase size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Smart Worker</span>
            </div>
            <p className="text-warm/80 max-w-sm mb-6">
              Connecting visionaries with elite talent. The smartest way to build your team and grow your career online.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-warm hover:text-peach transition-colors"><Globe size={20} /></a>
              <a href="#" className="text-warm hover:text-peach transition-colors"><Mail size={20} /></a>
              <a href="#" className="text-warm hover:text-peach transition-colors"><Link size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">For Talent</h4>
            <ul className="space-y-2 text-warm/80">
              <li><a href="#" className="hover:text-peach transition-colors">How to find work</a></li>
              <li><a href="#" className="hover:text-peach transition-colors">Direct Contracts</a></li>
              <li><a href="#" className="hover:text-peach transition-colors">Reviews</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">For Clients</h4>
            <ul className="space-y-2 text-warm/80">
              <li><a href="#" className="hover:text-peach transition-colors">How to hire</a></li>
              <li><a href="#" className="hover:text-peach transition-colors">Project Catalog</a></li>
              <li><a href="#" className="hover:text-peach transition-colors">Enterprise</a></li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-theme-border/30 pt-8 flex flex-col md:flex-row justify-between items-center text-warm/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Smart Worker. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-peach">Terms of Service</a>
            <a href="#" className="hover:text-peach">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
