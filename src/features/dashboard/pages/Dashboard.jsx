import React, { useRef, useContext, useState, useEffect } from 'react';
import { Briefcase, FileText, Settings, Star, TrendingUp, Users, MapPin, CheckCircle, ExternalLink, MessageSquare, Camera, Clock, XCircle, DollarSign, Search, PlusCircle, Send, ArrowLeft, Image as ImageIcon, LayoutGrid } from 'lucide-react';
import WorkerCardSkeleton from '../../../components/shared/WorkerCardSkeleton';
import EmptyState from '../../../components/shared/EmptyState';
import SubmitBidModal from '../../jobs/components/SubmitBidModal';
import ProposalsReviewModal from '../../jobs/components/ProposalsReviewModal';
import PostJobPage from '../../jobs/pages/PostJobPage';
import WorkerProfilePage from '../../profile/pages/WorkerProfilePage';
import SendOfferPage from '../../jobs/pages/SendOfferPage';
import EditProfilePage from '../../profile/pages/EditProfilePage';
import ManagePortfolioPage from '../../profile/pages/ManagePortfolioPage';
import CreateServicePage from '../../services/pages/CreateServicePage';
import { useOffers } from '../../../hooks/useOffers';
import { useJobs } from '../../../hooks/useJobs';
import { useServices } from '../../../hooks/useServices';
import { AuthContext } from '../../../context/AuthContext';
import { NotificationContext } from '../../../context/NotificationContext';
import api from '../../../api/api';

const WorkerDashboard = ({ user, isEditModalOpen, closeEditModal, openEditModal, onBackToHome }) => {
  const { updateUser } = useContext(AuthContext);
  const { addNotification } = useContext(NotificationContext) || {};
  const { offers, updateOfferStatus } = useOffers();
  const { jobs, submitProposal, proposals } = useJobs();
  const { services, addService, deleteService } = useServices();
  
  const myOffers = offers.filter(o => o.workerId === (user._id || user.email || user.name));
  const myProposals = proposals.filter(p => p.workerId === (user._id || user.email || user.name));
  const openJobs = jobs.filter(j => j.status === 'open');
  const myServices = services.filter(s => s.workerId === (user._id || user.email || user.name));

  const [activeTab, setActiveTab] = useState('overview');
  const [selectedJobToBid, setSelectedJobToBid] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isEditModalOpen) {
      setCurrentView('edit-profile');
    }
  }, [isEditModalOpen]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentView, activeTab]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateUser({ avatarBase64: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const toggleAvailability = () => updateUser({ isAvailable: !user.isAvailable });
  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';

  const handleSaveProfile = (newData) => {
    updateUser(newData);
    closeEditModal();
  };

  const handleOfferStatus = (offer, status) => {
    updateOfferStatus(offer.id, status);
    if (addNotification) {
      addNotification(
        offer.clientId,
        `Offer ${status === 'active' ? 'Accepted' : 'Declined'}`,
        `${status === 'active' ? '✅' : '❌'} ${user.name} ${status === 'active' ? 'accepted' : 'declined'} your job offer for '${offer.title}'`,
        status === 'active' ? 'accept' : 'decline'
      );
    }
  };

  const handleBidSubmit = (bidData) => {
    submitProposal(bidData);
    if (addNotification) {
      const targetJob = jobs.find(j => j.id === bidData.jobId);
      if (targetJob) {
        addNotification(
          targetJob.clientId,
          "New Job Bid",
          `🚀 New Bid received on your job post '${targetJob.title}' from ${user.name}`,
          'bid'
        );
      }
    }
  };

  return (
    <div className="space-y-6">
      {currentView === 'manage-portfolio' && (
        <ManagePortfolioPage user={user} onSave={handleSaveProfile} onBack={() => setCurrentView('dashboard')} />
      )}

      {currentView === 'create-service' && (
        <CreateServicePage 
          worker={user} 
          onSave={(newService) => { addService(newService); setCurrentView('dashboard'); setActiveTab('services'); }} 
          onBack={() => setCurrentView('dashboard')} 
        />
      )}

      {currentView === 'edit-profile' && (
        <EditProfilePage profileData={user} onSave={handleSaveProfile} onBack={() => { setCurrentView('dashboard'); closeEditModal(); }} />
      )}

      {currentView === 'dashboard' && (
        <>
      {/* Navigation Tabs */}
      <div className="flex gap-4 border-b border-theme-border pb-2 overflow-x-auto custom-scrollbar">
        <button onClick={() => setActiveTab('overview')} className={`font-semibold pb-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'overview' ? 'border-coral text-coral' : 'border-transparent text-theme-muted hover:text-espresso'}`}>Overview</button>
        <button onClick={() => setActiveTab('jobs')} className={`font-semibold pb-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'jobs' ? 'border-coral text-coral' : 'border-transparent text-theme-muted hover:text-espresso'}`}>Browse Open Jobs</button>
        <button onClick={() => setActiveTab('bids')} className={`font-semibold pb-2 border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'bids' ? 'border-coral text-coral' : 'border-transparent text-theme-muted hover:text-espresso'}`}>
          My Applications {myProposals.length > 0 && <span className="bg-peach/20 text-coral text-xs px-2 py-0.5 rounded-full">{myProposals.length}</span>}
        </button>
        <button onClick={() => setActiveTab('services')} className={`font-semibold pb-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'services' ? 'border-coral text-coral' : 'border-transparent text-theme-muted hover:text-espresso'}`}>
          My Services
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="bg-coral/10 p-6 rounded-2xl border border-coral/20">
            <h2 className="text-2xl font-bold text-espresso mb-2">Welcome back, {user.name}! 🛠️</h2>
            <p className="text-theme-muted">Explore new job postings matching your skills and boost your earnings.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-2xl shadow-sm border border-theme-border flex flex-col items-center">
              <Briefcase className="text-coral mb-2" size={32} />
              <h3 className="text-2xl font-bold text-espresso">{myProposals.length}</h3>
              <p className="text-theme-muted text-sm uppercase tracking-wide">Active Bids</p>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-sm border border-theme-border flex flex-col items-center">
              <TrendingUp className="text-coral mb-2" size={32} />
              <h3 className="text-2xl font-bold text-espresso">$4,250</h3>
              <p className="text-theme-muted text-sm uppercase tracking-wide">Earnings</p>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-sm border border-theme-border flex flex-col items-center">
              <Star className="text-coral mb-2" size={32} />
              <h3 className="text-2xl font-bold text-espresso">4.9/5</h3>
              <p className="text-theme-muted text-sm uppercase tracking-wide">Profile Rating</p>
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-theme-border overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-theme-border bg-theme-bg/30 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left w-full sm:w-auto">
                <div className="relative group cursor-pointer shrink-0" onClick={() => fileInputRef.current?.click()}>
                  <div className="w-24 h-24 rounded-full bg-coral text-white flex items-center justify-center font-bold text-3xl shadow-md border-4 border-white overflow-hidden">
                    {user.avatarBase64 ? <img src={user.avatarBase64} alt="Avatar" className="w-full h-full object-cover" /> : getInitials(user.name)}
                  </div>
                  <div className="absolute inset-0 bg-espresso/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={20} className="text-white mb-1" />
                    <span className="text-white text-[10px] font-semibold uppercase tracking-wider">Update</span>
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-2xl font-extrabold text-espresso">{user.name}</h3>
                  <p className="text-lg text-coral font-medium">{user.title || 'Add a professional title'}</p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2">
                    <span className="flex items-center gap-1 text-sm text-theme-muted bg-theme-bg px-3 py-1 rounded-full border border-theme-border"><MapPin size={14} /> {user.location || 'Location not set'}</span>
                    <button onClick={toggleAvailability} className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full border transition-all active:scale-95 ${user.isAvailable ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' : 'bg-theme-border/50 text-theme-muted border-theme-border hover:bg-theme-border'}`}>
                      <span className={`w-2 h-2 rounded-full ${user.isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-muted'}`}></span>
                      {user.isAvailable ? 'Available for work' : 'Busy right now'}
                    </button>
                  </div>
                </div>
              </div>
              <button onClick={openEditModal} className="w-full sm:w-auto mt-4 sm:mt-0 bg-coral hover:opacity-90 text-white font-semibold py-2.5 px-6 rounded-xl shadow-sm transition-all active:scale-95 whitespace-nowrap">Edit Profile</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-warm">
              <div className="md:col-span-2 p-6 sm:p-8 space-y-8">
                <section>
                  <h4 className="text-lg font-bold text-espresso mb-3">About Me</h4>
                  <p className="text-theme-muted leading-relaxed whitespace-pre-line">{user.bio || "No bio provided yet. Add a bio to tell clients more about yourself!"}</p>
                </section>
                <section>
                  <h4 className="text-lg font-bold text-espresso mb-3">Skills & Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.skills?.length > 0 ? user.skills.map((skill, idx) => (
                      <span key={idx} className="bg-peach/20 text-espresso font-semibold text-sm px-3 py-1.5 rounded-lg border border-peach/30 shadow-sm">{skill}</span>
                    )) : <p className="text-sm text-theme-muted italic">No skills added yet.</p>}
                  </div>
                </section>
              </div>
              <div className="p-6 sm:p-8 bg-theme-bg/30 space-y-6">
                <div className="bg-card border border-theme-border rounded-xl p-5 space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-theme-border"><span className="text-theme-muted font-medium">Hourly Rate</span><span className="text-xl font-bold text-espresso">${user.rate || '0'}<span className="text-sm font-normal text-theme-muted">/hr</span></span></div>
                  <div className="flex justify-between items-center pb-4 border-b border-theme-border"><span className="text-theme-muted font-medium">Response Time</span><span className="font-semibold text-espresso">&lt; 2 hours</span></div>
                  <div className="flex justify-between items-center"><span className="text-theme-muted font-medium">Jobs Completed</span><span className="font-semibold text-espresso flex items-center gap-1"><CheckCircle size={16} className="text-coral"/> 47</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-theme-border overflow-hidden mt-6">
            <div className="p-6 border-b border-theme-border bg-theme-bg/30 flex items-center justify-between">
              <h3 className="text-xl font-bold text-espresso flex items-center gap-2"><ImageIcon className="text-coral" /> My Portfolio Projects</h3>
              <button onClick={() => setCurrentView('manage-portfolio')} className="flex items-center gap-2 bg-theme-card border border-theme-border hover:border-coral hover:text-coral text-espresso text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                <PlusCircle size={16} /> Manage Portfolio
              </button>
            </div>
            <div className="p-6">
              {(!user.portfolio || user.portfolio.length === 0) ? (
                <EmptyState title="No portfolio projects yet" message="Showcase your best work to attract more clients and win bids." icon={ImageIcon} actionLabel="Add Project" onAction={() => setCurrentView('manage-portfolio')} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.portfolio.map((proj, idx) => (
                    <div key={idx} className="bg-theme-card border border-theme-border rounded-xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                      <div className="h-40 overflow-hidden bg-theme-bg border-b border-theme-border relative">
                        {proj.coverImage ? (
                          <img src={proj.coverImage} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center"><ImageIcon className="text-theme-muted" size={32} /></div>
                        )}
                        <span className="absolute top-2 right-2 bg-theme-card/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-espresso uppercase tracking-wider">{proj.category}</span>
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h4 className="font-bold text-espresso mb-1 line-clamp-1">{proj.title}</h4>
                        <p className="text-sm text-theme-muted line-clamp-2 mb-3 flex-1">{proj.description}</p>
                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-theme-border/50">
                          <div className="flex gap-2">
                            {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-coral hover:text-coral/80 text-xs font-semibold flex items-center gap-1"><ExternalLink size={14} /> Live</a>}
                          </div>
                          <span className="text-xs text-theme-muted font-medium">{proj.tags?.[0] || 'Project'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-theme-border overflow-hidden mt-6">
            <div className="p-6 border-b border-theme-border bg-theme-bg/30 flex items-center justify-between">
              <h3 className="text-xl font-bold text-espresso flex items-center gap-2"><FileText className="text-coral" /> Job Offers & Contracts</h3>
            </div>
            <div className="p-6">
              {myOffers.length === 0 ? (
                <EmptyState title="No active offers yet" message="Check back later or make sure your availability is turned on." icon={FileText} />
              ) : (
                <div className="space-y-4">
                  {myOffers.map(offer => (
                    <div key={offer.id} className="border border-theme-border rounded-xl p-5 flex flex-col md:flex-row justify-between gap-4 hover:border-peach transition-colors">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-bold text-espresso text-lg">{offer.title}</h4>
                          {offer.status === 'pending' && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-semibold border border-yellow-200">Pending Approval ⏳</span>}
                          {offer.status === 'active' && <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-semibold border border-emerald-200">Active / In Progress 🚀</span>}
                          {offer.status === 'completed' && <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full font-semibold border border-gray-200">Completed ✅</span>}
                          {offer.status === 'declined' && <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-semibold border border-red-200">Declined ❌</span>}
                        </div>
                        <p className="text-sm text-theme-muted">Client: <span className="font-semibold text-espresso">{offer.clientName}</span></p>
                        <p className="text-sm text-theme-muted mt-2 max-w-2xl">{offer.scope}</p>
                        <div className="flex gap-4 mt-3 text-sm font-semibold text-espresso">
                          <span className="flex items-center gap-1"><DollarSign size={14} className="text-coral" /> {offer.type}: ${offer.budget}</span>
                          <span className="flex items-center gap-1"><Clock size={14} className="text-coral" /> Deadline: {new Date(offer.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                      {offer.status === 'pending' && (
                        <div className="flex md:flex-col gap-2 shrink-0 justify-center">
                          <button onClick={() => handleOfferStatus(offer, 'active')} className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-all active:scale-95 text-sm flex items-center gap-1"><CheckCircle size={16} /> Accept Offer</button>
                          <button onClick={() => handleOfferStatus(offer, 'declined')} className="bg-theme-card border border-theme-border text-espresso hover:bg-red-50 hover:text-red-600 hover:border-red-200 font-semibold py-2 px-4 rounded-lg shadow-sm transition-all active:scale-95 text-sm flex items-center justify-center gap-1"><XCircle size={16} /> Decline</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'jobs' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-espresso">Browse Open Jobs</h2>
          </div>
          {openJobs.length === 0 ? (
            <EmptyState title="No open jobs available" message="There are currently no job postings. Check back soon!" icon={Briefcase} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
              {openJobs.map(job => (
                <div key={job.id} className="bg-card p-6 rounded-2xl shadow-sm border border-theme-border hover:border-theme-accent hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-espresso text-lg leading-tight">{job.title}</h4>
                    <span className="bg-peach/20 text-coral text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap">{job.category}</span>
                  </div>
                  <p className="text-sm text-theme-muted mb-4 line-clamp-3 flex-1">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills?.map((skill, idx) => (
                      <span key={idx} className="bg-theme-bg border border-theme-border text-espresso text-xs font-semibold px-2 py-1 rounded-md">{skill}</span>
                    ))}
                  </div>

                  <div className="flex gap-4 mb-5 pt-4 border-t border-theme-border text-sm font-semibold text-espresso">
                    <span className="flex items-center gap-1"><DollarSign size={14} className="text-coral" /> {job.budgetType}: ${job.budget}</span>
                    <span className="flex items-center gap-1"><Clock size={14} className="text-coral" /> {job.duration}</span>
                  </div>

                  <button 
                    onClick={() => setSelectedJobToBid(job)}
                    className="w-full bg-coral hover:opacity-90 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-all active:scale-95 text-sm flex items-center justify-center gap-2 mt-auto"
                  >
                    <Send size={16} /> Submit Proposal
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'bids' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-espresso">My Applications</h2>
          </div>
          {myProposals.length === 0 ? (
            <EmptyState title="No applications yet" message="You haven't submitted any proposals. Browse jobs and start pitching!" icon={Send} actionLabel="Browse Jobs" onAction={() => setActiveTab('jobs')} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myProposals.map(proposal => (
                <div key={proposal.id} className="bg-card border border-theme-border rounded-xl p-5 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-espresso text-lg leading-tight">{proposal.jobTitle}</h4>
                    {proposal.status === 'pending' && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-semibold border border-yellow-200">Under Review ⏳</span>}
                    {proposal.status === 'accepted' && <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-semibold border border-emerald-200">Accepted ✅</span>}
                    {proposal.status === 'rejected' && <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-semibold border border-red-200">Rejected ❌</span>}
                  </div>
                  <div className="flex gap-4 my-3 text-sm font-semibold text-espresso">
                    <span className="flex items-center gap-1 bg-theme-bg px-2 py-1 rounded-md border border-theme-border"><DollarSign size={14} className="text-coral" /> Bid: ${proposal.bidAmount}</span>
                    <span className="flex items-center gap-1 bg-theme-bg px-2 py-1 rounded-md border border-theme-border"><Clock size={14} className="text-coral" /> Time: {proposal.estimatedTime}</span>
                  </div>
                  <div className="bg-theme-bg/30 p-3 rounded-lg border border-theme-border/50">
                    <p className="text-sm text-espresso line-clamp-2 italic">"{proposal.coverLetter}"</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'services' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-espresso">My Services / Gigs</h2>
            <button 
              onClick={() => setCurrentView('create-service')}
              className="bg-coral hover:opacity-90 text-white font-semibold py-2 px-4 rounded-xl shadow-sm transition-all active:scale-95 text-sm flex items-center gap-2"
            >
              <PlusCircle size={18} /> Create New Service
            </button>
          </div>
          
          {myServices.length === 0 ? (
            <EmptyState title="No services yet" message="Create your first gig to start attracting clients!" icon={LayoutGrid} actionLabel="Create Service" onAction={() => setCurrentView('create-service')} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myServices.map(service => (
                <div key={service.id} className="bg-theme-card border border-theme-border rounded-2xl overflow-hidden shadow-sm flex flex-col">
                  <div className="h-40 overflow-hidden relative">
                    <img src={service.coverImage} alt={service.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <span className="text-xs font-bold text-coral uppercase tracking-wider mb-2 block">{service.category}</span>
                    <h4 className="font-bold text-espresso text-lg leading-tight mb-2 line-clamp-2">{service.title}</h4>
                    <p className="text-sm text-theme-muted line-clamp-2 mb-4 flex-1">{service.description}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-theme-border">
                      <span className="font-bold text-espresso">From ${service.packages.basic.price}</span>
                      <button onClick={() => deleteService(service.id)} className="text-red-500 hover:text-red-600 text-sm font-semibold transition-colors">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <SubmitBidModal isOpen={!!selectedJobToBid} onClose={() => setSelectedJobToBid(null)} worker={user} job={selectedJobToBid} onSubmitBid={handleBidSubmit} />
        </>
      )}
    </div>
  );
};

const ClientDashboard = ({ user, isEditModalOpen, closeEditModal, openEditModal, onBackToHome }) => {
  const { updateUser } = useContext(AuthContext);
  const { addNotification } = useContext(NotificationContext) || {};
  const fileInputRef = useRef(null);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [loadingWorkers, setLoadingWorkers] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [selectedJobForReview, setSelectedJobForReview] = useState(null);

  // Navigation State
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeWorker, setActiveWorker] = useState(null);

  const { offers, sendOffer, updateOfferStatus } = useOffers();
  const { jobs, postJob, closeJob, proposals, updateProposalStatus } = useJobs();

  const myOffers = offers.filter(o => o.clientId === (user._id || user.email || user.name));
  const myPostedJobs = jobs.filter(j => j.clientId === (user._id || user.email || user.name));
  
  const filterTags = ['All', 'React.js', 'Node.js', 'UI/UX Design', 'Video Editing', 'Tailwind CSS', 'MongoDB', 'AI / Prompts'];

  useEffect(() => {
    const handleOpenHireModal = (e) => {
      setActiveWorker(e.detail);
      setCurrentView('send-offer');
    };
    window.addEventListener('open-hire-modal', handleOpenHireModal);
    return () => window.removeEventListener('open-hire-modal', handleOpenHireModal);
  }, []);

  useEffect(() => {
    if (isEditModalOpen) {
      setCurrentView('edit-profile');
    }
  }, [isEditModalOpen]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentView, activeTab]);

  useEffect(() => {
    const fetchWorkers = async () => {
      setLoadingWorkers(true);
      try {
        const res = await api.get(`/users/workers${searchTerm ? `?search=${searchTerm}` : ''}`);
        setWorkers(res.data);
      } catch (err) {
        console.error("Failed to fetch workers", err);
      }
      setLoadingWorkers(false);
    };
    const timeoutId = setTimeout(fetchWorkers, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const onlineCount = workers.filter(w => w.isAvailable).length;
  const filteredWorkers = workers
    .filter(w => !showOnlineOnly || w.isAvailable)
    .filter(w => selectedSkill === 'All' || (w.skills && w.skills.includes(selectedSkill)))
    .sort((a, b) => (b.isAvailable === a.isAvailable) ? 0 : a.isAvailable ? -1 : 1);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateUser({ avatarBase64: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'C';

  const handleAcceptProposal = (proposal) => {
    updateProposalStatus(proposal.id, 'accepted');
    sendOffer({
      clientId: user._id || user.email || user.name,
      clientName: user.name,
      workerId: proposal.workerId,
      workerName: proposal.workerName,
      title: proposal.jobTitle,
      scope: `Accepted Proposal:\n${proposal.coverLetter}`,
      type: 'Fixed Price',
      budget: proposal.bidAmount,
      deadline: proposal.estimatedTime
    });
    if (addNotification) {
      addNotification(
        proposal.workerId,
        "Proposal Accepted",
        `✅ ${user.name} accepted your job proposal for '${proposal.jobTitle}'`,
        'accept'
      );
    }
    alert('Proposal accepted and contract initiated! 🎉');
    setSelectedJobForReview(null);
  };

  const handleDeclineProposal = (proposal) => {
    updateProposalStatus(proposal.id, 'rejected');
    if (addNotification) {
      addNotification(
        proposal.workerId,
        "Proposal Declined",
        `❌ ${user.name} declined your job proposal for '${proposal.jobTitle}'`,
        'decline'
      );
    }
  };

  const handleSendOffer = (offerData) => {
    sendOffer(offerData);
    if (addNotification) {
      addNotification(
        offerData.workerId,
        "New Job Offer",
        `📩 New Job Offer from ${offerData.clientName} for $${offerData.budget}: ${offerData.title}`,
        'offer'
      );
    }
  };

  if (currentView === 'post-job') {
    return <PostJobPage onBack={() => setCurrentView('dashboard')} client={user} onPostJob={postJob} />;
  }

  if (currentView === 'edit-profile') {
    return <EditProfilePage profileData={user} onSave={(newData) => { updateUser(newData); closeEditModal(); }} onBack={() => { setCurrentView('dashboard'); closeEditModal(); }} />;
  }

  if (currentView === 'worker-profile') {
    return (
      <WorkerProfilePage 
        worker={activeWorker} 
        onBack={() => setCurrentView('dashboard')} 
        onHireWorker={(w) => {
          setActiveWorker(w);
          setCurrentView('send-offer');
        }} 
      />
    );
  }

  if (currentView === 'send-offer') {
    return (
      <SendOfferPage 
        worker={activeWorker} 
        client={user} 
        onSendOffer={(offer) => {
          handleSendOffer(offer);
        }} 
        onBack={() => setCurrentView(activeWorker ? 'worker-profile' : 'dashboard')} 
      />
    );
  }

  return (
    <div className="space-y-6" id="client-profile">
      {/* Client Profile Header with Post Job Action */}
      <div className="bg-card rounded-2xl shadow-sm border border-theme-border overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-theme-border bg-theme-bg/30 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left w-full sm:w-auto">
            <div className="relative group cursor-pointer shrink-0" onClick={() => fileInputRef.current?.click()}>
              <div className="w-24 h-24 rounded-full bg-espresso text-white flex items-center justify-center font-bold text-3xl shadow-md border-4 border-white overflow-hidden">
                {user.avatarBase64 ? <img src={user.avatarBase64} alt="Avatar" className="w-full h-full object-cover" /> : getInitials(user.name)}
              </div>
              <div className="absolute inset-0 bg-coral/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={20} className="text-white mb-1" />
                <span className="text-white text-[10px] font-semibold uppercase tracking-wider">Update</span>
              </div>
              <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-2xl font-extrabold text-espresso">{user.name}</h3>
              <p className="text-lg text-coral font-medium">{user.industry || 'Company Industry'}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2">
                <span className="flex items-center gap-1 text-sm text-theme-muted bg-theme-bg px-3 py-1 rounded-full border border-theme-border"><MapPin size={14} /> {user.location || 'Location not set'}</span>
                <span className="flex items-center gap-1 text-sm font-semibold text-espresso bg-theme-border/30 px-3 py-1 rounded-full border border-theme-border">{user.email || 'No email set'}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-4 sm:mt-0">
            <button onClick={openEditModal} className="w-full sm:w-auto bg-theme-card hover:bg-theme-bg border border-theme-border text-espresso font-semibold py-2.5 px-6 rounded-xl shadow-sm transition-all active:scale-95 whitespace-nowrap">Edit Details</button>
            <button onClick={() => setCurrentView('post-job')} className="w-full sm:w-auto bg-coral hover:opacity-90 text-white font-semibold py-2.5 px-6 rounded-xl shadow-sm transition-all active:scale-95 whitespace-nowrap flex items-center justify-center gap-2">
              <PlusCircle size={18} /> Post a Job
            </button>
          </div>
        </div>
        {user.bio && (
          <div className="p-6 sm:p-8 bg-theme-card">
            <h4 className="text-sm font-bold uppercase tracking-wider text-theme-muted mb-2">About the Company</h4>
            <p className="text-espresso leading-relaxed">{user.bio}</p>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 border-b border-theme-border pb-2 overflow-x-auto custom-scrollbar">
        <button onClick={() => setActiveTab('overview')} className={`font-semibold pb-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'overview' ? 'border-coral text-coral' : 'border-transparent text-theme-muted hover:text-espresso'}`}>Overview & Discover</button>
        <button onClick={() => setActiveTab('jobs')} className={`font-semibold pb-2 border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'jobs' ? 'border-coral text-coral' : 'border-transparent text-theme-muted hover:text-espresso'}`}>
          My Posted Jobs {myPostedJobs.length > 0 && <span className="bg-peach/20 text-coral text-xs px-2 py-0.5 rounded-full">{myPostedJobs.length}</span>}
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Metrics Header */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-2xl shadow-sm border border-theme-border flex items-center gap-4">
              <div className="bg-peach/20 p-4 rounded-xl text-coral"><FileText size={28} /></div>
              <div>
                <p className="text-theme-muted text-sm font-semibold uppercase">Active Projects</p>
                <h3 className="text-2xl font-bold text-espresso">3</h3>
              </div>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-sm border border-theme-border flex items-center gap-4">
              <div className="bg-peach/20 p-4 rounded-xl text-coral"><Users size={28} /></div>
              <div>
                <p className="text-theme-muted text-sm font-semibold uppercase">Total Hires</p>
                <h3 className="text-2xl font-bold text-espresso">14</h3>
              </div>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-sm border border-theme-border flex items-center gap-4">
              <div className="bg-peach/20 p-4 rounded-xl text-coral"><TrendingUp size={28} /></div>
              <div>
                <p className="text-theme-muted text-sm font-semibold uppercase">Total Spent</p>
                <h3 className="text-2xl font-bold text-espresso">$12,450</h3>
              </div>
            </div>
          </div>

          {/* Active Contracts & Hires Section */}
          <div className="space-y-6 pt-4 border-t border-theme-border">
            <h2 className="text-2xl font-bold text-espresso mb-4">Active Contracts & Hires</h2>
            {myOffers.length === 0 ? (
              <EmptyState title="No active contracts" message="You haven't hired any workers or sent any job offers yet." icon={Briefcase} actionLabel="Explore All Workers" onAction={() => document.getElementById('discover-talent-section')?.scrollIntoView({ behavior: 'smooth' })} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myOffers.map(offer => (
                  <div key={offer.id} className="bg-card border border-theme-border rounded-xl p-5 flex flex-col hover:border-peach transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-espresso text-lg leading-tight">{offer.title}</h4>
                      {offer.status === 'pending' && <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-semibold border border-yellow-200 whitespace-nowrap">Pending ⏳</span>}
                      {offer.status === 'active' && <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-semibold border border-emerald-200 whitespace-nowrap">Active 🚀</span>}
                      {offer.status === 'completed' && <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full font-semibold border border-gray-200 whitespace-nowrap">Completed ✅</span>}
                      {offer.status === 'declined' && <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-semibold border border-red-200 whitespace-nowrap">Declined ❌</span>}
                    </div>
                    <p className="text-sm text-theme-muted mb-2">Worker: <span className="font-semibold text-espresso">{offer.workerName}</span></p>
                    <div className="flex gap-4 mt-auto pt-4 border-t border-theme-border text-sm font-semibold text-espresso">
                      <span className="flex items-center gap-1"><DollarSign size={14} className="text-coral" /> ${offer.budget}</span>
                      <span className="flex items-center gap-1"><Clock size={14} className="text-coral" /> {new Date(offer.deadline).toLocaleDateString()}</span>
                    </div>
                    {offer.status === 'active' && (
                      <button onClick={() => updateOfferStatus(offer.id, 'completed')} className="mt-4 w-full bg-theme-card border border-theme-border text-espresso hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 font-semibold py-2 px-4 rounded-lg transition-all active:scale-95 text-sm flex items-center justify-center gap-2">
                        <CheckCircle size={16} /> Mark as Completed
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Worker Discovery Section */}
          <div className="space-y-6 pt-4 border-t border-theme-border">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-espresso">Discover Talent</h2>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {onlineCount} Online Now
                  </span>
                </div>
                <p className="text-theme-muted text-sm mt-1">Find the perfect freelancer for your next project.</p>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button onClick={() => setShowOnlineOnly(!showOnlineOnly)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-semibold text-sm transition-all shadow-sm shrink-0 ${showOnlineOnly ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' : 'bg-card border-theme-border text-espresso hover:bg-theme-bg'}`}>
                  <span className={`w-2 h-2 rounded-full ${showOnlineOnly ? 'bg-emerald-500' : 'bg-theme-border'}`}></span> Online Only
                </button>
                <div className="w-full relative">
                  <input type="text" placeholder="Search by name or skill..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-card border border-theme-border rounded-xl focus:outline-none focus:border-peach focus:ring-2 focus:ring-peach/30 text-espresso transition-all shadow-sm" />
                  <div className="absolute left-3 top-3 text-theme-muted"><Search size={18} /></div>
                </div>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex overflow-x-auto gap-2 pb-2 custom-scrollbar" id="discover-talent-section">
              {filterTags.map(tag => (
                <button key={tag} onClick={() => setSelectedSkill(tag)} className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${selectedSkill === tag ? 'bg-theme-primary text-white border-theme-accent shadow-sm' : 'bg-theme-card text-theme-primary border-theme-border hover:bg-theme-bg'}`}>{tag}</button>
              ))}
            </div>

            {loadingWorkers ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                <WorkerCardSkeleton /><WorkerCardSkeleton /><WorkerCardSkeleton /><WorkerCardSkeleton />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {filteredWorkers.map((worker) => (
                  <div key={worker._id || worker.id} className="bg-card p-6 rounded-2xl shadow-sm border border-theme-border hover:border-theme-accent hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-14 h-14 bg-espresso text-white rounded-full flex items-center justify-center font-bold text-xl overflow-hidden shrink-0 border border-theme-border/50">
                            {worker.avatarBase64 ? <img src={worker.avatarBase64} alt="Avatar" className="w-full h-full object-cover" /> : worker.name.charAt(0)}
                          </div>
                          <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full ${worker.isAvailable ? 'bg-emerald-500' : 'bg-theme-border'}`}></span>
                        </div>
                        <div>
                          <h4 className="font-bold text-espresso text-lg leading-tight">{worker.name}</h4>
                          <p className="text-sm text-coral font-medium">{worker.title || 'Freelancer'}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-bold text-espresso">${worker.rate || 0}<span className="text-xs font-normal text-theme-muted">/hr</span></p>
                        <p className="text-sm font-semibold flex items-center justify-end gap-1 text-espresso"><Star size={14} className="text-coral fill-current"/> {worker.rating || 5.0}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {worker.skills?.length > 0 ? worker.skills.map((skill, idx) => (
                        <span key={idx} className="bg-peach/20 text-espresso text-xs font-semibold px-2 py-1 rounded-md border border-peach/30">{skill}</span>
                      )) : <span className="text-xs text-theme-muted italic">No skills listed</span>}
                    </div>
                    
                    <p className="text-sm text-theme-muted line-clamp-2 mb-6 flex-1">{worker.bio || 'No bio provided.'}</p>
                    
                    <div className="flex gap-3 mt-auto">
                      <button onClick={() => { setActiveWorker(worker); setCurrentView('send-offer'); }} className="flex-1 bg-coral hover:opacity-90 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-all active:scale-95 text-sm">Hire Worker</button>
                      <button onClick={() => { setActiveWorker(worker); setCurrentView('worker-profile'); }} className="flex-1 bg-theme-bg hover:bg-theme-border/50 border border-theme-border text-espresso font-semibold py-2 px-4 rounded-lg transition-all active:scale-95 text-sm">View Profile</button>
                    </div>
                  </div>
                ))}
                
                {filteredWorkers.length === 0 && (
                  <EmptyState title="No matching talent found" message="Try adjusting your search filters or check back later." icon={Search} actionLabel="Clear All Filters" onAction={() => {setSearchTerm(''); setShowOnlineOnly(false); setSelectedSkill('All');}} />
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'jobs' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-espresso">My Posted Jobs</h2>
            <button onClick={() => setCurrentView('post-job')} className="bg-coral hover:opacity-90 text-white font-semibold py-2 px-4 rounded-xl shadow-sm transition-all active:scale-95 text-sm flex items-center justify-center gap-2">
              <PlusCircle size={18} /> Post a New Job
            </button>
          </div>
          {myPostedJobs.length === 0 ? (
            <EmptyState title="No jobs posted yet" message="Post a job to start receiving proposals from talented workers." icon={Briefcase} actionLabel="Post a Job" onAction={() => setCurrentView('post-job')} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myPostedJobs.map(job => {
                const jobBids = proposals.filter(p => p.jobId === job.id);
                return (
                  <div key={job.id} className="bg-card border border-theme-border rounded-xl p-5 shadow-sm hover:border-theme-accent transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-espresso text-lg leading-tight">{job.title}</h4>
                        <p className="text-xs text-theme-muted mt-1">Posted {new Date(job.createdAt).toLocaleDateString()}</p>
                      </div>
                      {job.status === 'open' ? <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-semibold border border-emerald-200">Open</span> : <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full font-semibold border border-gray-200">Closed</span>}
                    </div>
                    
                    <div className="flex gap-4 my-3 text-sm font-semibold text-espresso">
                      <span className="flex items-center gap-1"><DollarSign size={14} className="text-coral" /> {job.budgetType}: ${job.budget}</span>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-theme-border">
                      <div className="flex items-center gap-2 text-sm font-semibold text-espresso">
                        <Users size={16} className="text-coral" /> {jobBids.length} Proposals
                      </div>
                      <div className="flex gap-2">
                        {job.status === 'open' && (
                          <button onClick={() => closeJob(job.id)} className="px-3 py-1.5 bg-theme-bg border border-theme-border text-espresso font-semibold rounded-lg hover:bg-theme-border/50 transition-colors text-xs">
                            Close Job
                          </button>
                        )}
                        <button onClick={() => setSelectedJobForReview(job)} className="px-3 py-1.5 bg-theme-card border border-coral text-coral hover:bg-coral/5 font-semibold rounded-lg transition-colors text-xs">
                          Review Proposals
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <ProposalsReviewModal isOpen={!!selectedJobForReview} onClose={() => setSelectedJobForReview(null)} job={selectedJobForReview} proposals={proposals} onAcceptProposal={handleAcceptProposal} onDeclineProposal={handleDeclineProposal} />
    </div>
  );
};

const AdminDashboard = () => (
  <div className="space-y-6">
    <div className="bg-espresso text-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-2">Welcome Admin! 🛡️</h2>
      <p className="text-warm/80">System Overview and Platform Analytics.</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div className="bg-card p-6 rounded-2xl shadow-sm border border-theme-border flex flex-col items-center">
        <Users className="text-espresso mb-2" size={32} />
        <h3 className="text-2xl font-bold text-espresso">1,248</h3>
        <p className="text-theme-muted text-sm uppercase tracking-wide">Total Workers</p>
      </div>
      <div className="bg-card p-6 rounded-2xl shadow-sm border border-theme-border flex flex-col items-center">
        <Briefcase className="text-espresso mb-2" size={32} />
        <h3 className="text-2xl font-bold text-espresso">842</h3>
        <p className="text-theme-muted text-sm uppercase tracking-wide">Total Clients</p>
      </div>
      <div className="bg-card p-6 rounded-2xl shadow-sm border border-theme-border flex flex-col items-center">
        <Settings className="text-espresso mb-2" size={32} />
        <h3 className="text-2xl font-bold text-espresso">325</h3>
        <p className="text-theme-muted text-sm uppercase tracking-wide">Active Projects</p>
      </div>
    </div>
  </div>
);

const Dashboard = ({ user, isEditModalOpen, closeEditModal, openEditModal, onBackToHome, activeDashboardView }) => {
  const displayMode = activeDashboardView || user.role;
  return (
    <div className="min-h-screen bg-theme-bg py-12">
      <div className="max-w-[1600px] mx-auto px-6 xl:px-12">
        {displayMode === 'worker' && <WorkerDashboard user={user} isEditModalOpen={isEditModalOpen} closeEditModal={closeEditModal} openEditModal={openEditModal} onBackToHome={onBackToHome} />}
        {displayMode === 'client' && <ClientDashboard user={user} isEditModalOpen={isEditModalOpen} closeEditModal={closeEditModal} openEditModal={openEditModal} onBackToHome={onBackToHome} />}
        {displayMode === 'admin' && <AdminDashboard />}
      </div>
    </div>
  );
};

export default Dashboard;
