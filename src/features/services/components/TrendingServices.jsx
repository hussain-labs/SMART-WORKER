import React from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { useServices } from '../../../hooks/useServices';

const TrendingServices = ({ onSelectService }) => {
  const { services } = useServices();
  
  // Show only up to 4 services for the trending section
  const trendingServices = services.slice(0, 4);

  return (
    <section className="py-20 bg-white font-sans">
      <div className="max-w-[1600px] mx-auto px-6 xl:px-12">
        
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-theme-primary mb-2 tracking-tight">Trending Services / Popular Gigs</h2>
            <p className="text-theme-primary/70 text-lg">Most popular services based on client reviews and ratings.</p>
          </div>
          <button className="hidden sm:flex items-center text-theme-accent font-semibold hover:text-[#e67363] transition-colors">
            See all services <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingServices.map(service => (
            <div 
              key={service.id} 
              className="bg-theme-card border border-theme-border rounded-2xl overflow-hidden hover:border-theme-accent hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
              onClick={() => onSelectService(service)}
            >
              {/* Cover Image */}
              <div className="h-48 overflow-hidden relative bg-theme-bg">
                <img 
                  src={service.coverImage} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                {/* Worker Info */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-theme-primary text-white flex items-center justify-center font-bold text-xs overflow-hidden shrink-0">
                    {service.workerAvatar ? (
                      <img src={service.workerAvatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      service.workerName.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-theme-primary text-sm leading-tight">{service.workerName}</h4>
                    <p className="text-xs text-theme-accent font-semibold">{service.level}</p>
                  </div>
                </div>

                {/* Gig Title */}
                <p className="font-semibold text-theme-primary line-clamp-2 hover:text-theme-accent transition-colors mb-3">
                  {service.title}
                </p>

                {/* Rating & Price */}
                <div className="mt-auto pt-4 border-t border-theme-border flex items-center justify-between">
                  <div className="flex items-center gap-1 font-semibold text-theme-primary">
                    <Star size={16} className="text-theme-accent fill-current" />
                    {service.rating} <span className="text-theme-primary/50 font-normal">({service.reviewsCount})</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-theme-primary/70 font-medium uppercase tracking-wider block">Starting at</span>
                    <span className="font-bold text-theme-primary text-lg">${service.packages.basic.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-8 sm:hidden py-3 border border-theme-border rounded-xl text-theme-primary font-semibold hover:bg-theme-bg transition-colors">
          See all services
        </button>

      </div>
    </section>
  );
};

export default TrendingServices;
