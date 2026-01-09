import React from 'react';
import { Skeleton } from '../ui/Skeleton';

export const DashboardSkeleton: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header Skeleton */}
            <div>
                <Skeleton variant="text" className="w-1/3 h-10 mb-2" />
                <Skeleton variant="text" className="w-1/2 h-5" />
            </div>

            {/* Profile Card Skeleton */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-100/80 shadow-sm">
                <div className="flex items-start gap-8">
                    <Skeleton variant="circular" className="w-28 h-28 flex-shrink-0" />
                    <div className="flex-1 space-y-6 pt-2">
                        <div className="flex items-center gap-4">
                            <Skeleton variant="text" className="w-48 h-8" />
                            <Skeleton variant="rectangular" className="w-24 h-6 rounded-full" />
                        </div>
                        <div className="space-y-3">
                            <Skeleton variant="rectangular" className="w-64 h-8" />
                            <Skeleton variant="rectangular" className="w-56 h-8" />
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Skeleton variant="rectangular" className="w-32 h-10" />
                            <Skeleton variant="rectangular" className="w-32 h-10" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-100/80">
                        <Skeleton variant="rectangular" className="w-10 h-10 mb-4" />
                        <Skeleton variant="text" className="w-12 h-8" />
                        <Skeleton variant="text" className="w-24 h-4" />
                    </div>
                ))}
            </div>
        </div>
    );
};
