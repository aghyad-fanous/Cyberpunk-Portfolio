import React from 'react';

// مكون يمثل بطاقة سكيليتون لـ TimelineItem
interface ExperienceSkeletonProps {
  isLeft: boolean;
}

export const ExperienceSkeleton: React.FC<ExperienceSkeletonProps> = ({ isLeft }) => {
  return (
    <div
      className={`flex items-center gap-8 mb-12 ${
        isLeft ? "flex-row" : "flex-row-reverse"
      } max-md:flex-col max-md:items-start animate-pulse`} // إضافة animate-pulse
    >
      {/* Content Area (محاكاة GlassCard) */}
      <div
        className={`flex-1 p-6 rounded-lg backdrop-blur-md bg-[rgba(0,31,63,0.3)] border-2 border-gray-700/50 shadow-md ${
          isLeft ? "text-right" : "text-left"
        } max-md:text-left`}
      >
        {/* Year String */}
        <div className="h-4 w-24 bg-gray-700 rounded mb-3"></div>
        {/* Title */}
        <div className="h-6 w-3/4 bg-gray-700 rounded mb-2"></div>
        {/* Company */}
        <div className="h-5 w-1/2 bg-gray-700 rounded mb-4"></div>
        {/* Description Lines */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-700 rounded"></div>
          <div className="h-3 w-11/12 bg-gray-700 rounded"></div>
          <div className="h-3 w-5/6 bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Timeline Marker (النقطة) */}
      <div className="relative shrink-0">
        {/* محاكاة النقطة */}
        <div className="w-6 h-6 rounded-full border-4 border-transparent bg-gray-700 shadow-lg"></div>
      </div>

      {/* Spacer for alignment */}
      <div className="flex-1 max-md:hidden"></div>
    </div>
  );
};