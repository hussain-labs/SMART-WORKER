import React from 'react';
import { Bell, Briefcase, MessageSquare, Star, CheckCircle, XCircle, FileText } from 'lucide-react';

const NotificationDropdown = ({ isOpen, notifications, markAsRead, markAllAsRead, onClose }) => {
  if (!isOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'offer': return <Briefcase size={16} className="text-white" />;
      case 'message': return <MessageSquare size={16} className="text-white" />;
      case 'bid': return <FileText size={16} className="text-white" />;
      case 'accept': return <CheckCircle size={16} className="text-white" />;
      case 'decline': return <XCircle size={16} className="text-white" />;
      case 'review': return <Star size={16} className="text-white" />;
      default: return <Bell size={16} className="text-white" />;
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case 'offer': return 'bg-blue-500';
      case 'message': return 'bg-purple-500';
      case 'bid': return 'bg-coral';
      case 'accept': return 'bg-emerald-500';
      case 'decline': return 'bg-red-500';
      default: return 'bg-theme-border text-espresso';
    }
  };

  const formatTime = (isoString) => {
    const diff = new Date() - new Date(isoString);
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-theme-card rounded-2xl shadow-xl border border-theme-border overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="p-4 border-b border-theme-border bg-theme-bg/50 flex items-center justify-between">
        <h3 className="font-bold text-espresso flex items-center gap-2">
          <Bell className="text-coral" size={18} /> Notifications
        </h3>
        {notifications.some(n => !n.isRead) && (
          <button 
            onClick={(e) => { e.stopPropagation(); markAllAsRead(); }}
            className="text-xs font-semibold text-coral hover:text-coral/80 transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
        {notifications.length === 0 ? (
          <div className="p-8 text-center flex flex-col items-center">
            <Bell size={40} className="text-warm mb-3" />
            <p className="text-espresso font-semibold">You're all caught up!</p>
            <p className="text-sm text-theme-muted">No new alerts at the moment.</p>
          </div>
        ) : (
          <div className="divide-y divide-warm">
            {notifications.map(notification => (
              <div 
                key={notification.id}
                onClick={() => {
                  markAsRead(notification.id);
                  onClose();
                }}
                className={`p-4 hover:bg-theme-bg transition-colors cursor-pointer flex items-start gap-3 relative ${!notification.isRead ? 'bg-peach/5' : 'bg-theme-card'}`}
              >
                {!notification.isRead && (
                  <span className="absolute top-1/2 -translate-y-1/2 left-2 w-1.5 h-1.5 bg-coral rounded-full"></span>
                )}
                
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ml-2 ${getIconBg(notification.iconType)}`}>
                  {getIcon(notification.iconType)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <p className={`text-sm text-espresso font-bold truncate ${!notification.isRead ? 'text-espresso' : 'text-espresso/80'}`}>
                      {notification.title}
                    </p>
                    <span className="text-[10px] font-semibold text-theme-muted shrink-0 whitespace-nowrap">
                      {formatTime(notification.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-theme-muted line-clamp-2">
                    {notification.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
