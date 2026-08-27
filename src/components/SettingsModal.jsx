import React, { useState } from 'react';
import { X, Lock, Bell, Mail, CheckCircle } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, user }) => {
  const [activeTab, setActiveTab] = useState('password');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  if (!isOpen) return null;

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Simulate password change
    triggerToast('Password updated successfully!');
    e.target.reset();
  };

  const handleNotificationsChange = () => {
    triggerToast('Notification preferences updated!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-2xl rounded-2xl shadow-2xl border border-theme-border overflow-hidden flex flex-col md:flex-row min-h-[400px]">
        
        {/* Sidebar */}
        <div className="w-full md:w-1/3 bg-theme-bg/30 border-b md:border-b-0 md:border-r border-theme-border p-4 flex flex-col gap-2">
          <div className="flex justify-between items-center mb-4 md:mb-8">
            <h2 className="text-xl font-bold text-espresso px-2">Settings</h2>
            <button onClick={onClose} className="md:hidden text-theme-muted hover:text-coral transition-colors p-1 rounded-full hover:bg-theme-border/30">
              <X size={24} />
            </button>
          </div>
          
          <button 
            onClick={() => setActiveTab('password')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === 'password' ? 'bg-theme-card text-coral shadow-sm border border-theme-border' : 'text-espresso hover:bg-theme-card/50'}`}
          >
            <Lock size={18} /> Password
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === 'notifications' ? 'bg-theme-card text-coral shadow-sm border border-theme-border' : 'text-espresso hover:bg-theme-card/50'}`}
          >
            <Bell size={18} /> Notifications
          </button>
          <button 
            onClick={() => setActiveTab('email')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${activeTab === 'email' ? 'bg-theme-card text-coral shadow-sm border border-theme-border' : 'text-espresso hover:bg-theme-card/50'}`}
          >
            <Mail size={18} /> Linked Email
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 sm:p-8 relative">
          
          {/* Desktop Close Button */}
          <button onClick={onClose} className="hidden md:block absolute top-6 right-6 text-theme-muted hover:text-coral transition-colors p-1 rounded-full hover:bg-theme-border/30">
            <X size={24} />
          </button>

          {/* Toast Notification */}
          {showToast && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm animate-in slide-in-from-top-4 fade-in duration-300 z-10 whitespace-nowrap">
              <CheckCircle size={16} /> <span className="text-sm font-semibold">{toastMessage}</span>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="animate-in fade-in duration-300 h-full flex flex-col justify-center">
              <h3 className="text-lg font-bold text-espresso mb-1">Change Password</h3>
              <p className="text-sm text-theme-muted mb-6">Ensure your account is using a long, random password to stay secure.</p>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-espresso mb-1">Current Password</label>
                  <input type="password" required className="w-full px-4 py-2.5 bg-theme-bg border border-theme-border rounded-xl focus:outline-none focus:border-peach focus:ring-2 focus:ring-peach/30 text-espresso transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-espresso mb-1">New Password</label>
                  <input type="password" required minLength={6} className="w-full px-4 py-2.5 bg-theme-bg border border-theme-border rounded-xl focus:outline-none focus:border-peach focus:ring-2 focus:ring-peach/30 text-espresso transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-espresso mb-1">Confirm New Password</label>
                  <input type="password" required minLength={6} className="w-full px-4 py-2.5 bg-theme-bg border border-theme-border rounded-xl focus:outline-none focus:border-peach focus:ring-2 focus:ring-peach/30 text-espresso transition-all" />
                </div>
                <div className="pt-2">
                  <button type="submit" className="bg-coral hover:opacity-90 text-white font-semibold py-2.5 px-6 rounded-xl shadow-sm transition-all active:scale-95">
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="animate-in fade-in duration-300 h-full flex flex-col justify-center">
              <h3 className="text-lg font-bold text-espresso mb-1">Notification Preferences</h3>
              <p className="text-sm text-theme-muted mb-6">Choose what you want to be notified about.</p>
              
              <div className="space-y-4">
                {[
                  { id: 'jobs', label: 'New Job Invitations', desc: 'When a client invites you to a job.' },
                  { id: 'messages', label: 'New Messages', desc: 'When you receive a direct message.' },
                  { id: 'bids', label: 'Bid Status Updates', desc: 'When your bid is accepted or rejected.' }
                ].map((item) => (
                  <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center pt-0.5">
                      <input type="checkbox" defaultChecked onChange={handleNotificationsChange} className="peer sr-only" />
                      <div className="w-10 h-5 bg-theme-border rounded-full peer-checked:bg-coral transition-colors"></div>
                      <div className="absolute left-1 top-1.5 w-3 h-3 bg-theme-card rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-espresso group-hover:text-coral transition-colors">{item.label}</p>
                      <p className="text-xs text-theme-muted">{item.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="animate-in fade-in duration-300 h-full flex flex-col justify-center">
              <h3 className="text-lg font-bold text-espresso mb-1">Linked Email</h3>
              <p className="text-sm text-theme-muted mb-6">Manage the email address associated with your account.</p>
              
              <div className="bg-theme-bg border border-theme-border rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-espresso">Primary Email</p>
                  <p className="text-sm text-theme-muted">{user?.email || 'user@example.com'}</p>
                </div>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-md border border-emerald-200">
                  Verified
                </span>
              </div>
              
              <p className="text-xs text-theme-muted mt-4">
                To change your primary email address, please contact support.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
