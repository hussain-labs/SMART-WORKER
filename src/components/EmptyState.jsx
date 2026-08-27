import React from 'react';

const EmptyState = ({ title, message, icon: Icon, actionLabel, onAction }) => {
  return (
    <div className="col-span-full py-16 flex flex-col items-center text-center bg-card rounded-2xl border border-theme-border border-dashed shadow-sm animate-in fade-in duration-300">
      <div className="w-20 h-20 bg-theme-accent/10 rounded-full flex items-center justify-center mb-4 text-theme-accent">
        {Icon && <Icon size={40} />}
      </div>
      <h3 className="text-xl font-bold text-theme-primary mb-2">{title}</h3>
      <p className="max-w-md mx-auto text-gray-500 mb-6">{message}</p>
      {actionLabel && onAction && (
        <button 
          onClick={onAction}
          className="px-6 py-2.5 rounded-xl border border-theme-border text-theme-primary font-semibold hover:bg-theme-bg transition-all active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
