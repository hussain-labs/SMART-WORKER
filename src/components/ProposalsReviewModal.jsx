import React from 'react';
import { X, CheckCircle, XCircle, FileText, Star, Clock, DollarSign } from 'lucide-react';

const ProposalsReviewModal = ({ isOpen, onClose, job, proposals, onAcceptProposal, onDeclineProposal }) => {
  if (!isOpen || !job) return null;

  const jobProposals = proposals.filter(p => p.jobId === job.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-4 bg-espresso/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-theme-card shadow-2xl w-full max-w-lg h-full rounded-2xl overflow-hidden flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-theme-border flex justify-between items-center bg-theme-bg/30">
          <div>
            <h2 className="text-xl font-bold text-espresso flex items-center gap-2">
              <FileText className="text-coral" /> Received Proposals
            </h2>
            <p className="text-sm text-theme-muted mt-1">{job.title}</p>
          </div>
          <button onClick={onClose} className="p-2 text-theme-muted hover:bg-theme-card rounded-full transition-colors border border-transparent hover:border-theme-border">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-theme-bg/10 space-y-4">
          {jobProposals.length === 0 ? (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-warm mb-3" />
              <p className="text-theme-muted font-medium">No proposals received yet.</p>
            </div>
          ) : (
            jobProposals.map(proposal => (
              <div key={proposal.id} className="bg-theme-card border border-theme-border rounded-xl p-5 shadow-sm hover:border-peach transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-espresso text-white rounded-full flex items-center justify-center font-bold overflow-hidden">
                      {proposal.workerAvatar ? (
                        <img src={proposal.workerAvatar} alt="avatar" className="w-full h-full object-cover" />
                      ) : (
                        proposal.workerName.charAt(0)
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-espresso">{proposal.workerName}</h4>
                      <p className="text-xs font-semibold flex items-center gap-1 text-espresso"><Star size={12} className="text-coral fill-current"/> {proposal.workerRating}</p>
                    </div>
                  </div>
                  {proposal.status === 'pending' && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-semibold border border-yellow-200">Pending</span>}
                  {proposal.status === 'accepted' && <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-semibold border border-emerald-200">Accepted</span>}
                  {proposal.status === 'rejected' && <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-semibold border border-red-200">Declined</span>}
                </div>

                <div className="flex gap-4 mb-3 text-sm font-semibold text-espresso">
                  <span className="flex items-center gap-1 bg-theme-bg px-2 py-1 rounded-md border border-theme-border"><DollarSign size={14} className="text-coral" /> ${proposal.bidAmount}</span>
                  <span className="flex items-center gap-1 bg-theme-bg px-2 py-1 rounded-md border border-theme-border"><Clock size={14} className="text-coral" /> {proposal.estimatedTime}</span>
                </div>

                <div className="mb-4 bg-theme-bg/30 p-3 rounded-lg border border-theme-border/50">
                  <p className="text-sm text-espresso whitespace-pre-wrap">"{proposal.coverLetter}"</p>
                </div>

                {proposal.status === 'pending' && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onAcceptProposal(proposal)}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg transition-all active:scale-95 text-sm flex items-center justify-center gap-1"
                    >
                      <CheckCircle size={16} /> Accept & Hire
                    </button>
                    <button 
                      onClick={() => onDeclineProposal(proposal.id)}
                      className="flex-1 bg-theme-card border border-theme-border text-espresso hover:bg-red-50 hover:text-red-600 hover:border-red-200 font-semibold py-2 rounded-lg transition-all active:scale-95 text-sm flex items-center justify-center gap-1"
                    >
                      <XCircle size={16} /> Decline
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProposalsReviewModal;
