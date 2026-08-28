import React from 'react';

const WorkerCardSkeleton = () => {
  return (
    <div className="bg-card p-6 rounded-2xl shadow-sm border border-theme-border flex flex-col h-full animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3 w-full">
          {/* Avatar Skeleton */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-theme-border via-theme-bg to-theme-border shrink-0 border border-theme-border/50"></div>
          
          <div className="space-y-2 w-full">
            {/* Title Skeleton */}
            <div className="h-5 w-1/2 bg-gradient-to-r from-theme-border via-theme-bg to-theme-border rounded-md"></div>
            <div className="h-4 w-1/3 bg-gradient-to-r from-theme-border via-theme-bg to-theme-border rounded-md"></div>
          </div>
        </div>
      </div>
      
      {/* Skills Skeletons */}
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-16 bg-gradient-to-r from-theme-border via-theme-bg to-theme-border rounded-md"></div>
        <div className="h-6 w-24 bg-gradient-to-r from-theme-border via-theme-bg to-theme-border rounded-md"></div>
        <div className="h-6 w-20 bg-gradient-to-r from-theme-border via-theme-bg to-theme-border rounded-md"></div>
      </div>
      
      {/* Bio Lines Skeletons */}
      <div className="space-y-2 mb-6 flex-1">
        <div className="h-4 w-full bg-gradient-to-r from-theme-border via-theme-bg to-theme-border rounded-md"></div>
        <div className="h-4 w-5/6 bg-gradient-to-r from-theme-border via-theme-bg to-theme-border rounded-md"></div>
      </div>
      
      {/* Buttons Skeletons */}
      <div className="flex gap-3 mt-auto">
        <div className="flex-1 h-10 bg-gradient-to-r from-theme-border via-theme-bg to-theme-border rounded-lg"></div>
        <div className="flex-1 h-10 bg-gradient-to-r from-theme-border via-theme-bg to-theme-border rounded-lg"></div>
      </div>
    </div>
  );
};

export default WorkerCardSkeleton;
