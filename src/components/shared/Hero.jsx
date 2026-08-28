import React, { useState } from 'react';
import {
  Search,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Headset,
  ChevronDown,
  Star,
  Clock,
  Briefcase,
  Users,
  Map
} from 'lucide-react';
import heroImg from '../../assets/hero_technician_transparent.png';

const Hero = ({ openAuthModal, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery, location);
    } else {
      alert(`Searching for: ${searchQuery || 'Any service'} in ${location || 'Any location'}`);
    }
  };

  return (
    <div className="relative font-sans pb-16 lg:pb-0">
      <div className="relative bg-[#f8f4ec] pt-12 pb-32 lg:pt-20 lg:pb-40 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

          {/* Left Column: Content */}
          <div className="flex-1 max-w-2xl w-full">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-[#fdfaf5] border border-[#e8dcc4] rounded-full px-4 py-1.5 mb-8 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#d96b27]" />
              <span className="text-sm font-semibold text-[#5c4a3d]">Trusted by Thousands of Homes & Businesses</span>
            </div>

            <h1 className="text-[2.75rem] lg:text-[3.5rem] leading-[1.1] font-serif font-bold text-[#17382b] mb-6">
              Find Trusted Workers <br />
              for Every Need, <br />
              <span className="text-[#d96b27]">Anytime, Anywhere.</span>
            </h1>

            <p className="text-lg text-[#5c6b64] mb-10 max-w-xl leading-relaxed">
              From plumbing and electrical work to home cleaning and more -
              find skilled professionals near you in just a few clicks.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center bg-white rounded-2xl shadow-lg border border-white p-2 mb-10 gap-2 sm:gap-0 w-full lg:w-[115%] lg:max-w-none relative z-20">
              {/* Service Dropdown (simulated) */}
              <div className="flex-1 w-full sm:w-auto flex items-center px-4 py-3 sm:py-0 sm:border-r border-gray-200 cursor-pointer hover:bg-gray-50 rounded-xl sm:rounded-none sm:rounded-l-xl transition">
                <div className="grid grid-cols-2 gap-0.5 mr-3 opacity-60">
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                </div>
                <input
                  type="text"
                  placeholder="Select Service"
                  className="w-full bg-transparent border-none text-sm font-medium text-gray-700 focus:outline-none placeholder-gray-500 cursor-pointer"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <ChevronDown className="w-4 h-4 text-gray-400 ml-2" />
              </div>

              {/* Location Input */}
              <div className="flex-1 w-full sm:w-auto flex items-center px-4 py-3 sm:py-0 cursor-text hover:bg-gray-50 rounded-xl sm:rounded-none transition">
                <MapPin className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Enter your location"
                  className="w-full bg-transparent border-none text-sm text-gray-700 focus:outline-none placeholder-gray-500"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* Search Button */}
              <button type="submit" className="w-full sm:w-auto bg-[#17382b] hover:bg-[#122c22] text-white text-sm font-semibold py-4 px-8 rounded-xl shadow-md transition flex items-center justify-center gap-2 shrink-0">
                <Search className="w-4 h-4" />
                Find Workers
              </button>
            </form>

            {/* Features List */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-[#5c6b64]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#d96b27]" />
                Verified Professionals
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d96b27]" />
                Background Checked
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#d96b27]" />
                Secure Payments
              </div>
              <div className="flex items-center gap-2">
                <Headset className="w-4 h-4 text-[#d96b27]" />
                24/7 Support
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="flex-1 w-full relative min-h-[500px] lg:min-h-[600px] mt-10 lg:mt-0 flex justify-end">
            {/* Curved Background Shape */}
            <div className="absolute inset-y-0 right-0 w-[90%] lg:w-[100%] bg-[#ecdac3] rounded-tl-[150px] lg:rounded-tl-[250px] shadow-inner">
            </div>

            {/* Main Hero Image */}
            <img
              src={heroImg}
              alt="Professional Technician"
              className="absolute bottom-0 right-0 z-10 h-[100%] lg:h-[110%] w-auto max-w-none object-contain object-bottom pr-0 lg:pr-12 drop-shadow-2xl"
            />

            {/* Floating Rating Badge */}
            <div className="absolute top-[20%] -left-[10%] lg:-left-[5%] z-20 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 flex flex-col gap-2 transform -rotate-2 hover:rotate-0 transition">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img src="https://i.pravatar.cc/100?img=12" alt="Customer" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                  <img src="https://i.pravatar.cc/100?img=33" alt="Customer" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                  <img src="https://i.pravatar.cc/100?img=47" alt="Customer" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                  <div className="w-8 h-8 rounded-full bg-[#d96b27] border-2 border-white flex items-center justify-center text-xs font-bold text-white relative z-10">+2K</div>
                </div>
              </div>
              <div>
                <div className="font-bold text-lg text-[#17382b]">2,500+</div>
                <div className="text-xs font-medium text-gray-500">Happy Customers</div>
              </div>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-[#d96b27] text-[#d96b27]" />)}
                <span className="text-xs font-bold text-gray-700 ml-1">4.8/5 Rating</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Stats Bar (Positioned at bottom outside overflow-hidden) */}
      <div className="absolute bottom-0 left-0 w-full z-30 px-4 sm:px-6 lg:px-8 translate-y-1/2">
        <div className="max-w-[1600px] mx-auto bg-white rounded-2xl shadow-xl shadow-black/5 border border-gray-100 p-6 flex flex-wrap justify-between items-center gap-6">

          <div className="flex items-center gap-4 flex-1 min-w-[200px]">
            <div className="w-12 h-12 rounded-full bg-[#f8f4ec] flex items-center justify-center text-[#d96b27]">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-xl text-[#17382b]">15,000+</div>
              <div className="text-sm font-medium text-gray-500">Verified Workers</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-gray-200"></div>

          <div className="flex items-center gap-4 flex-1 min-w-[200px]">
            <div className="w-12 h-12 rounded-full bg-[#f8f4ec] flex items-center justify-center text-[#d96b27]">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-xl text-[#17382b]">8,500+</div>
              <div className="text-sm font-medium text-gray-500">Jobs Completed</div>
            </div>
          </div>

          <div className="hidden lg:block w-px h-12 bg-gray-200"></div>

          <div className="flex items-center gap-4 flex-1 min-w-[200px]">
            <div className="w-12 h-12 rounded-full bg-[#f8f4ec] flex items-center justify-center text-[#d96b27]">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-xl text-[#17382b]">5,000+</div>
              <div className="text-sm font-medium text-gray-500">Happy Customers</div>
            </div>
          </div>

          <div className="hidden xl:block w-px h-12 bg-gray-200"></div>

          <div className="flex items-center gap-4 flex-1 min-w-[180px]">
            <div className="w-12 h-12 rounded-full bg-[#f8f4ec] flex items-center justify-center text-[#d96b27]">
              <Map className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-xl text-[#17382b]">50+</div>
              <div className="text-sm font-medium text-gray-500">Cities Covered</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
