import React from 'react';
import { 
  Droplet, 
  Zap, 
  Hammer, 
  PaintRoller, 
  Wind, 
  Sparkles, 
  Settings2, 
  Grid,
  ArrowRight
} from 'lucide-react';

const categories = [
  { name: 'Plumber', icon: Droplet, price: 'From Rs. 500' },
  { name: 'Electrician', icon: Zap, price: 'From Rs. 400' },
  { name: 'Carpenter', icon: Hammer, price: 'From Rs. 600' },
  { name: 'Painter', icon: PaintRoller, price: 'From Rs. 450' },
  { name: 'AC Repair', icon: Wind, price: 'From Rs. 700' },
  { name: 'Cleaning', icon: Sparkles, price: 'From Rs. 350' },
  { name: 'Appliances Repair', icon: Settings2, price: 'From Rs. 500' },
  { name: 'More Services', icon: Grid, price: 'View All', isMore: true },
];

const CategoryCards = () => {
  return (
    <section className="pt-28 pb-20 bg-white relative font-sans">
      <div className="max-w-[1600px] mx-auto px-6 xl:px-12">

        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h2 className="text-[1.75rem] font-bold text-[#17382b] font-serif">Popular Categories</h2>
          <a href="#" className="flex items-center gap-1.5 text-sm font-semibold text-[#d96b27] hover:text-[#c45a1f] transition mt-4 sm:mt-0">
            View All Categories <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className={`group bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-[#d96b27]/30 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col items-center justify-center p-6 text-center hover:-translate-y-1 ${cat.isMore ? 'bg-gray-50' : ''}`}
            >
              <div className="relative mb-4">
                {/* Decorative background shape */}
                {!cat.isMore && <div className="absolute -inset-2 bg-[#fdfaf5] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>}
                
                <cat.icon 
                  strokeWidth={1.5} 
                  className={`relative z-10 w-8 h-8 ${cat.isMore ? 'text-[#5c6b64]' : 'text-[#17382b]'}`} 
                />
              </div>
              <h3 className="text-[13px] font-bold text-[#17382b] mb-1">{cat.name}</h3>
              <p className="text-[11px] font-medium text-gray-500">{cat.price}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategoryCards;
