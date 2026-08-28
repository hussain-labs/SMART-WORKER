import React from 'react';
import { Star, MapPin, Mail, Calendar, CheckCircle, Clock, ExternalLink, Image as ImageIcon, Code, ArrowLeft } from 'lucide-react';

const WorkerProfilePage = ({ worker, onBack, onHireWorker }) => {
  if (!worker) return null;

  const getInitials = (name) => {
    if (!name) return 'W';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const defaultSkills = ["JavaScript", "React", "Node.js", "CSS", "UI/UX"];
  const skillsToDisplay = (worker.skills && worker.skills.length > 0) ? worker.skills : defaultSkills;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium text-theme-primary bg-theme-card/70 hover:bg-theme-card border border-theme-border hover:border-theme-accent hover:text-theme-accent shadow-sm transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Talent Feed
        </button>
        
        <div className="flex gap-3">
          <button 
            onClick={() => {
              window.dispatchEvent(new CustomEvent('open-chat', { detail: worker }));
            }}
            className="px-5 py-2 rounded-xl border border-theme-accent text-theme-accent bg-theme-card font-semibold hover:bg-theme-primary/5 transition-all active:scale-95 shadow-sm text-sm"
          >
            Direct Message
          </button>
          <button 
            onClick={() => onHireWorker(worker)}
            className="px-5 py-2 rounded-xl bg-theme-primary text-white font-semibold hover:opacity-90 transition-all active:scale-95 shadow-sm text-sm"
          >
            Send Job Offer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Profile & Stats */}
        <div className="lg:col-span-4 space-y-6">
          {/* Avatar and Basic Info */}
          <div className="bg-theme-card p-6 rounded-2xl shadow-sm border border-theme-border text-center flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full bg-theme-primary text-white flex items-center justify-center font-bold text-4xl shadow-md border-4 border-white overflow-hidden">
                {worker.avatarBase64 ? (
                  <img src={worker.avatarBase64} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  getInitials(worker.name)
                )}
              </div>
              {worker.isAvailable && (
                <span className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></span>
              )}
            </div>
            
            <h2 className="text-2xl font-extrabold text-theme-primary mb-1">{worker.name}</h2>
            <p className="text-theme-accent font-medium mb-4">{worker.title || 'Professional Freelancer'}</p>
            
            <div className="flex items-center justify-center gap-2 mb-4">
               <span className={`text-xs font-semibold px-3 py-1 rounded-full ${worker.isAvailable ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-theme-border/50 text-theme-muted border border-theme-border'}`}>
                {worker.isAvailable ? 'Available for hire' : 'Busy right now'}
              </span>
            </div>

            <div className="w-full flex justify-around border-t border-theme-border pt-4 mt-2 text-theme-primary">
              <div className="text-center">
                <p className="text-2xl font-bold">${worker.rate || 0}</p>
                <p className="text-xs text-theme-muted font-medium uppercase tracking-wider">Hourly Rate</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold flex items-center justify-center gap-1">
                  <Star size={20} className="text-theme-accent fill-current" /> {worker.rating || '5.0'}
                </p>
                <p className="text-xs text-theme-muted font-medium uppercase tracking-wider">Rating</p>
              </div>
            </div>
          </div>

          {/* Stats & Quick Info */}
          <div className="bg-theme-card p-6 rounded-2xl shadow-sm border border-theme-border space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-theme-border">
                <span className="text-theme-muted text-sm font-medium flex items-center gap-2"><CheckCircle size={16} className="text-theme-accent" /> Jobs Completed</span>
                <span className="font-bold text-theme-primary">{(worker.jobsCompleted || 12)}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-theme-border">
                <span className="text-theme-muted text-sm font-medium flex items-center gap-2"><Clock size={16} className="text-theme-accent" /> Response Time</span>
                <span className="font-bold text-theme-primary">&lt; 2 hrs</span>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-theme-muted">Contact Info</h4>
              <div className="flex items-center gap-3 text-theme-primary w-full">
                <div className="bg-theme-accent/20 p-2.5 rounded-xl text-theme-accent shrink-0">
                  <Mail size={18} />
                </div>
                <span className="text-sm font-medium break-words truncate">{worker.email || 'contact@worker.com'}</span>
              </div>
              <div className="flex items-center gap-3 text-theme-primary">
                <div className="bg-theme-accent/20 p-2.5 rounded-xl text-theme-accent">
                  <Calendar size={18} />
                </div>
                <span className="text-sm font-medium">Member since 2023</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Main Content */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Bio & Skills */}
          <div className="bg-theme-card p-8 rounded-2xl shadow-sm border border-theme-border space-y-8">
            <section>
              <h3 className="text-xl font-bold text-theme-primary mb-4">About Me</h3>
              <p className="text-theme-primary/80 leading-relaxed whitespace-pre-line text-lg">
                {worker.bio || "Passionate professional ready to collaborate on your projects."}
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-theme-primary mb-4">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2.5">
                {skillsToDisplay.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="bg-theme-accent/20 text-theme-primary border border-theme-accent font-semibold text-sm px-4 py-2 rounded-xl shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Featured Portfolio Section */}
          <div className="bg-theme-card p-8 rounded-2xl shadow-sm border border-theme-border">
            <h3 className="text-xl font-bold text-theme-primary mb-6 flex items-center gap-2">
              <ImageIcon className="text-theme-accent" size={24} /> Featured Portfolio
            </h3>
            
            {(!worker.portfolio || worker.portfolio.length === 0) ? (
              <div className="bg-theme-bg/50 border border-dashed border-theme-border rounded-2xl p-10 text-center flex flex-col items-center">
                <ImageIcon size={40} className="text-theme-muted/50 mb-3" />
                <p className="text-theme-primary font-semibold text-lg">No portfolio projects added yet.</p>
                <p className="text-sm text-theme-muted mt-1">This worker hasn't showcased any past work.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {worker.portfolio.map((proj, idx) => (
                  <div key={idx} className="bg-theme-card border border-theme-border rounded-xl overflow-hidden hover:shadow-md hover:border-theme-accent transition-all group flex flex-col">
                    <div className="h-48 overflow-hidden bg-theme-bg border-b border-theme-border relative">
                      {proj.coverImage ? (
                        <img src={proj.coverImage} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><ImageIcon className="text-theme-muted/50" size={32} /></div>
                      )}
                      <span className="absolute top-3 right-3 bg-theme-card/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-theme-primary uppercase tracking-wider shadow-sm">{proj.category}</span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h4 className="font-bold text-theme-primary text-lg mb-2 line-clamp-1">{proj.title}</h4>
                      <p className="text-sm text-theme-muted line-clamp-2 mb-4 flex-1 leading-relaxed">{proj.description}</p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-theme-border">
                        <div className="flex gap-4">
                          {proj.liveUrl && (
                            <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-theme-accent hover:opacity-80 text-xs font-bold flex items-center gap-1.5 transition-colors">
                              <ExternalLink size={16} /> Live Demo
                            </a>
                          )}
                          {proj.githubUrl && (
                            <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-theme-primary hover:opacity-70 text-xs font-bold flex items-center gap-1.5 transition-colors">
                              <Code size={16} /> Source
                            </a>
                          )}
                        </div>
                        {proj.tags?.[0] && <span className="text-xs text-theme-primary font-semibold bg-theme-bg px-2.5 py-1 rounded-md border border-theme-border">{proj.tags[0]}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default WorkerProfilePage;
