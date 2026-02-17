
import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> { }

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
    return (
        <div
            className={`animate-pulse bg-slate-200 rounded-md ${className}`}
            {...props}
        />
    );
};

export const DashboardSkeleton: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-32 bg-white rounded-xl border border-slate-200 p-4">
                        <div className="flex justify-between items-start mb-4">
                            <Skeleton className="h-10 w-10 rounded-lg" />
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                        <Skeleton className="h-8 w-24 mb-2" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    <Skeleton className="h-[400px] w-full rounded-xl" /> {/* Terminal */}
                    <Skeleton className="h-[200px] w-full rounded-xl" /> {/* Insights */}
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <Skeleton className="h-[600px] w-full rounded-xl" /> {/* Strategy */}
                </div>
            </div>
        </div>
    )
}

export const TableSkeleton: React.FC = () => {
    return (
        <div className="space-y-4 p-4">
            <div className="flex justify-between mb-4">
                <Skeleton className="h-10 w-1/4 rounded-xl" />
                <Skeleton className="h-10 w-1/4 rounded-xl" />
            </div>
            <div className="border rounded-2xl p-4 space-y-4 bg-white/50 backdrop-blur-sm">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                        <div className="flex items-center gap-4 w-1/2">
                            <Skeleton className="h-10 w-10 rounded-xl" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-3 w-1/2" />
                            </div>
                        </div>
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-lg" />
                    </div>
                ))}
            </div>
        </div>
    );
};
