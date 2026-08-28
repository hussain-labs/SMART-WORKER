import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { useOffers } from '../../../hooks/useOffers';

const ServiceDetailPage = ({ service, onBack, user, openAuthModal }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const { sendOffer } = useOffers();

  if (!service) return null;

  const currentPackage = service.packages[activeTab];

  const handleOrder = () => {
    if (!user) {
      openAuthModal('client');
      return;
    }

    // A worker shouldn't order a service from themselves, but for mock simplicity, 
    // let's just make sure they are somewhat valid. The prompt doesn't specify role restrictions heavily here,
    // but typically clients order. If they are logged in, we let them proceed.

    // Trigger instant contract creation as a pending offer
    const offerData = {
      clientId: user._id || user.email || user.name,
      clientName: user.name,
      workerId: service.workerId,
      workerName: service.workerName,
      title: `${service.title} (${activeTab.toUpperCase()} Package)`,
      scope: `Service Order:\n- Package: ${activeTab.toUpperCase()}\n- Price: $${currentPackage.price}\n- Delivery: ${currentPackage.deliveryDays} Days\n- Features: ${currentPackage.features.join(', ')}`,
      type: 'Fixed Price',
      budget: currentPackage.price,
      deadline: new Date(Date.now() + currentPackage.deliveryDays * 24 * 60 * 60 * 1000).toISOString()
    };
    
    sendOffer(offerData);
    alert('Order placed successfully! A pending contract has been created. You can view it in your dashboard.');
    onBack();
  };

  return (
    <div className="min-h-screen bg-theme-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header / Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-theme-primary font-semibold hover:text-theme-accent transition-colors mb-8"
        >
          <ArrowLeft size={20} /> Back to Services
        </button>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Column: Service Overview */}
          <div className="flex-1 space-y-8">
            
            {/* Title & Meta */}
            <div>
              <div className="flex items-center gap-2 text-sm text-theme-primary/60 font-semibold mb-3">
                <span className="hover:text-theme-accent cursor-pointer">Services</span> 
                <ChevronRight size={14} /> 
                <span className="hover:text-theme-accent cursor-pointer">{service.category}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-theme-primary leading-tight mb-4">{service.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-theme-primary text-white flex items-center justify-center font-bold overflow-hidden border border-theme-border">
                    {service.workerAvatar ? <img src={service.workerAvatar} alt="Avatar" className="w-full h-full object-cover"/> : service.workerName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-theme-primary">{service.workerName}</h3>
                    <p className="text-xs text-theme-accent font-semibold">{service.level}</p>
                  </div>
                </div>
                <div className="h-6 w-px bg-theme-border hidden sm:block"></div>
                <div className="flex items-center gap-1 font-semibold text-theme-primary">
                  <Star size={18} className="text-theme-accent fill-current" />
                  {service.rating} <span className="text-theme-primary/50 font-normal">({service.reviewsCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className="rounded-2xl overflow-hidden border border-theme-border shadow-sm bg-theme-bg aspect-video">
              <img src={service.coverImage} alt={service.title} className="w-full h-full object-cover" />
            </div>

            {/* About This Gig */}
            <div className="bg-theme-card p-6 sm:p-8 rounded-2xl border border-theme-border shadow-sm">
              <h2 className="text-2xl font-bold text-theme-primary mb-4">About This Service</h2>
              <p className="text-theme-primary/80 leading-relaxed whitespace-pre-line">{service.description}</p>
            </div>

          </div>

          {/* Right Column: 3-Tier Pricing Box */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="sticky top-24 bg-theme-card rounded-2xl border border-theme-border shadow-xl overflow-hidden">
              
              {/* Tab Switcher */}
              <div className="flex border-b border-theme-border bg-theme-bg/50">
                {['basic', 'standard', 'premium'].map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setActiveTab(tier)}
                    className={`flex-1 py-4 text-center font-bold text-sm uppercase tracking-wider transition-colors ${
                      activeTab === tier 
                        ? 'bg-theme-card text-theme-accent border-b-2 border-b-theme-accent' 
                        : 'text-theme-primary/60 hover:text-theme-primary hover:bg-theme-bg'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>

              {/* Package Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-xl text-theme-primary">{currentPackage.title}</h3>
                  <span className="text-2xl font-extrabold text-theme-primary">${currentPackage.price}</span>
                </div>
                
                <p className="text-theme-primary/80 mb-6">{currentPackage.description}</p>
                
                <div className="flex gap-4 mb-6">
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-theme-primary">
                    <Clock size={16} className="text-theme-accent" />
                    {currentPackage.deliveryDays} Days Delivery
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-theme-primary">
                    <Info size={16} className="text-theme-accent" />
                    {currentPackage.revisions} Revisions
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <h4 className="font-bold text-theme-primary text-sm uppercase tracking-wider mb-2">What's Included</h4>
                  {currentPackage.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-theme-primary/80">
                      <CheckCircle2 size={18} className="text-theme-accent shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={handleOrder}
                  className="w-full bg-theme-primary hover:opacity-90 text-white font-bold text-lg py-4 rounded-xl shadow-md transition-all active:scale-95 flex justify-center items-center gap-2"
                >
                  Continue (${currentPackage.price}) <ChevronRight size={20} />
                </button>
                <p className="text-center text-xs text-theme-primary/50 mt-3 font-medium">You won't be charged yet</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
