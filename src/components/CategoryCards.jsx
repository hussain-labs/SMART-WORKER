import React from 'react';
import { Code, PenTool, Video, Bot, TrendingUp, Mic } from 'lucide-react';

const categories = [
  { name: 'Web Development', icon: Code, desc: 'Build modern applications' },
  { name: 'Graphic Design', icon: PenTool, desc: 'Logos, branding & UI/UX' },
  { name: 'Video Editing', icon: Video, desc: 'Professional video production' },
  { name: 'AI Services', icon: Bot, desc: 'Machine learning & AI tools' },
  { name: 'Digital Marketing', icon: TrendingUp, desc: 'SEO, social media & ads' },
  { name: 'Voice Over', icon: Mic, desc: 'Professional voice actors' },
];

const CategoryCards = () => {
  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-espresso mb-4 tracking-tight">Popular Categories</h2>
          <p className="text-theme-muted text-lg max-w-2xl mx-auto">Explore our diverse pool of talent across the most in-demand digital industries.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group bg-theme-bg p-8 rounded-2xl border border-theme-border hover:border-peach hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-start hover:-translate-y-1"
            >
              <div className="bg-peach/20 p-4 rounded-xl text-coral mb-6 group-hover:scale-110 transition-transform duration-300">
                <cat.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-espresso mb-2">{cat.name}</h3>
              <p className="text-theme-muted">{cat.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategoryCards;
