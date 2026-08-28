import React from 'react';
import { Search, Users, CalendarCheck, ThumbsUp, ArrowRight } from 'lucide-react';

const steps = [
  {
    num: 1,
    title: 'Search a Service',
    desc: 'Choose the service you need and enter your location.',
    icon: Search
  },
  {
    num: 2,
    title: 'Choose a Worker',
    desc: 'Browse trusted profiles, check reviews and compare prices.',
    icon: Users
  },
  {
    num: 3,
    title: 'Book & Pay',
    desc: 'Book the job and pay securely through our platform.',
    icon: CalendarCheck
  },
  {
    num: 4,
    title: 'Get Your Job Done',
    desc: 'The worker comes and gets the job done. You relax!',
    icon: ThumbsUp
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-[#fcfaf8] font-sans">
      <div className="max-w-[1600px] mx-auto px-6 xl:px-12">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-[1.75rem] font-bold text-[#17382b] font-serif mb-3">How It Works</h2>
          <div className="flex justify-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#17382b]"></div>
            <div className="w-2 h-2 rounded-full bg-[#d96b27]"></div>
            <div className="w-2 h-2 rounded-full bg-[#17382b]"></div>
          </div>
        </div>

        {/* Steps */}
        <div className="flex flex-col lg:flex-row items-start justify-between relative gap-6">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 flex-1">
                {/* Icon Circle */}
                <div className="w-16 h-16 shrink-0 rounded-full bg-white shadow-sm border border-[#e8dcc4] flex items-center justify-center relative">
                  <step.icon className="w-7 h-7 text-[#17382b]" strokeWidth={1.5} />
                </div>
                
                {/* Text Content */}
                <div>
                  <h3 className="text-[15px] font-bold text-[#17382b] mb-1.5 flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#d96b27] text-white text-[10px] font-bold">
                      {step.num}
                    </span>
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 font-medium leading-relaxed max-w-[200px]">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Connecting Arrow (hidden on last step and mobile) */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex shrink-0 px-2 mt-5 text-gray-300">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
