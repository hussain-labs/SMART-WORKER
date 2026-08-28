import React, { useState } from 'react';
import { Calendar, DollarSign, CheckCircle, ArrowLeft } from 'lucide-react';

const SendOfferPage = ({ worker, client, onSendOffer, onBack }) => {
  const [formData, setFormData] = useState({
    title: '',
    scope: '',
    type: 'Fixed Price',
    budget: worker?.rate || '',
    deadline: ''
  });
  const [showToast, setShowToast] = useState(false);

  if (!worker) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.budget || !formData.deadline) return;

    onSendOffer({
      clientId: client.email || client.name,
      clientName: client.name,
      workerId: worker._id || worker.email || worker.name,
      workerName: worker.name,
      title: formData.title,
      scope: formData.scope,
      type: formData.type,
      budget: Number(formData.budget),
      deadline: formData.deadline
    });

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onBack();
    }, 2000);
  };

  const getInitials = (name) => {
    if (!name) return 'W';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 relative">
      {/* Top Navigation */}
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium text-theme-primary bg-theme-card/70 hover:bg-theme-card border border-theme-border hover:border-theme-accent hover:text-theme-accent shadow-sm transition-all duration-200 cursor-pointer mb-2"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="max-w-3xl mx-auto bg-theme-card rounded-2xl shadow-sm border border-theme-border overflow-hidden">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-theme-border bg-theme-bg/30">
          <h2 className="text-2xl font-bold text-theme-primary">Create Job Offer</h2>
          <p className="text-theme-muted mt-1">Review the details and send a formal offer to hire this freelancer.</p>
        </div>

        <div className="p-8">
          {/* Worker Preview Banner */}
          <div className="flex items-center gap-5 mb-8 p-5 rounded-2xl border border-theme-border bg-theme-bg/30 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-theme-primary text-white flex items-center justify-center font-bold text-2xl overflow-hidden shrink-0 border-2 border-white shadow-sm">
              {worker.avatarBase64 ? (
                <img src={worker.avatarBase64} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                getInitials(worker.name)
              )}
            </div>
            <div>
              <h3 className="font-extrabold text-theme-primary text-xl mb-0.5">{worker.name}</h3>
              <p className="text-sm text-theme-accent font-semibold">{worker.title || 'Freelancer'} • ${worker.rate || 0}/hr</p>
            </div>
          </div>

          <form id="offerForm" onSubmit={handleSubmit} className="space-y-7">
            
            <div>
              <label className="block text-sm font-semibold text-theme-primary mb-2">Offer Title</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Build Responsive Landing Page in React"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3.5 bg-theme-bg/30 border border-theme-border rounded-xl focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 transition-all text-theme-primary placeholder-muted"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-theme-primary mb-2">Detailed Deliverables Scope</label>
              <textarea 
                rows="5"
                placeholder="Describe the deliverables, requirements, and any specific goals..."
                value={formData.scope}
                onChange={(e) => setFormData({...formData, scope: e.target.value})}
                className="w-full px-4 py-3.5 bg-theme-bg/30 border border-theme-border rounded-xl focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 transition-all text-theme-primary placeholder-muted resize-none custom-scrollbar"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              <div>
                <label className="block text-sm font-semibold text-theme-primary mb-2">Engagement Type</label>
                <div className="flex bg-theme-bg p-1.5 rounded-xl border border-theme-border">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'Fixed Price' })}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${formData.type === 'Fixed Price' ? 'bg-theme-card text-theme-primary shadow-sm' : 'text-theme-muted hover:text-theme-primary'}`}
                  >
                    Fixed Price
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'Hourly Rate' })}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${formData.type === 'Hourly Rate' ? 'bg-theme-card text-theme-primary shadow-sm' : 'text-theme-muted hover:text-theme-primary'}`}
                  >
                    Hourly Rate
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-theme-primary mb-2">Budget Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-3.5 text-theme-muted" size={20} />
                  <input 
                    type="number" 
                    required
                    min="1"
                    placeholder="500"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    className="w-full pl-10 pr-12 py-3.5 bg-theme-bg/30 border border-theme-border rounded-xl focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 transition-all text-theme-primary placeholder-muted"
                  />
                  <span className="absolute right-4 top-3.5 text-theme-muted font-medium">{formData.type === 'Hourly Rate' ? '/hr' : 'Total'}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-theme-primary mb-2">Target Delivery Date</label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-3.5 text-theme-muted" size={20} />
                <input 
                  type="date"
                  required
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  className="w-full pl-10 pr-4 py-3.5 bg-theme-bg/30 border border-theme-border rounded-xl focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 transition-all text-theme-primary"
                />
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-theme-border flex justify-end gap-4">
              <button 
                type="button"
                onClick={onBack}
                className="px-8 py-3 rounded-xl border border-theme-border text-theme-primary font-bold hover:bg-theme-bg transition-all active:scale-95"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-8 py-3 rounded-xl bg-theme-primary text-white font-bold hover:opacity-90 transition-all active:scale-95 shadow-sm"
              >
                Send Job Offer
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[70] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-theme-primary text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
            <CheckCircle className="text-emerald-400" size={20} />
            <span className="font-semibold">Offer sent successfully to {worker.name}!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendOfferPage;
