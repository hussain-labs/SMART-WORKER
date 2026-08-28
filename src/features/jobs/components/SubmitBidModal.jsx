import React, { useState } from 'react';
import { X, Send, Briefcase, DollarSign, Clock } from 'lucide-react';

const SubmitBidModal = ({ isOpen, onClose, worker, job, onSubmitBid }) => {
  const [formData, setFormData] = useState({
    bidAmount: '',
    estimatedTime: '1-2 weeks',
    coverLetter: ''
  });

  if (!isOpen || !job) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitBid({
      ...formData,
      jobId: job.id,
      jobTitle: job.title,
      workerId: worker._id || worker.email || worker.name,
      workerName: worker.name,
      workerAvatar: worker.avatarBase64,
      workerRating: worker.rating || 5.0
    });
    alert('Bid submitted successfully! 🎉');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-theme-card rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar border border-theme-border">
        <div className="p-6 border-b border-theme-border sticky top-0 bg-theme-card z-10 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-espresso flex items-center gap-2">
            <Send className="text-coral" /> Submit Proposal
          </h2>
          <button onClick={onClose} className="p-2 text-theme-muted hover:bg-theme-bg rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 bg-theme-bg/30 border-b border-theme-border">
          <h3 className="font-bold text-espresso mb-1">Job Overview</h3>
          <p className="text-lg font-semibold text-coral">{job.title}</p>
          <div className="flex gap-4 mt-2 text-sm text-theme-muted">
            <span className="flex items-center gap-1"><Briefcase size={14} /> {job.category}</span>
            <span className="flex items-center gap-1"><DollarSign size={14} /> {job.budgetType}: ${job.budget}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {job.duration}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-espresso mb-1">Your Bid Amount ($)</label>
              <input 
                required
                type="number"
                min="5"
                placeholder={`e.g. ${job.budget}`}
                className="w-full p-3 border border-theme-border rounded-xl focus:outline-none focus:border-peach focus:ring-2 focus:ring-peach/30 transition-all text-espresso placeholder-muted"
                value={formData.bidAmount}
                onChange={e => setFormData({...formData, bidAmount: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-espresso mb-1">Estimated Time</label>
              <select 
                className="w-full p-3 border border-theme-border rounded-xl focus:outline-none focus:border-peach focus:ring-2 focus:ring-peach/30 transition-all text-espresso bg-theme-card"
                value={formData.estimatedTime}
                onChange={e => setFormData({...formData, estimatedTime: e.target.value})}
              >
                <option>Less than 1 week</option>
                <option>1-2 weeks</option>
                <option>1-3 months</option>
                <option>3-6 months</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-espresso mb-1">Cover Letter / Pitch</label>
            <textarea 
              required
              rows={6}
              placeholder="Explain why you are the best fit for this job. Highlight your relevant experience and how you plan to execute the project..."
              className="w-full p-3 border border-theme-border rounded-xl focus:outline-none focus:border-peach focus:ring-2 focus:ring-peach/30 transition-all text-espresso placeholder-muted resize-none custom-scrollbar"
              value={formData.coverLetter}
              onChange={e => setFormData({...formData, coverLetter: e.target.value})}
            ></textarea>
          </div>

          <div className="pt-6 border-t border-theme-border flex gap-3">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 py-3 bg-theme-card border border-theme-border text-espresso font-bold rounded-xl hover:bg-theme-bg transition-colors active:scale-95"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3 bg-coral text-white font-bold rounded-xl hover:opacity-90 shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Send size={20} /> Submit Bid
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitBidModal;
