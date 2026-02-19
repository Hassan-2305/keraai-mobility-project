import React, { useMemo } from 'react'
import { BentoCard } from './BentoCard'
import { Activity, IndianRupee, Car, Warehouse, AlertCircle, Timer, TrendingUp } from 'lucide-react'
import { useParking } from '../../context/ParkingContext'
import { cn } from '../../lib/utils'

const RevenueChart = ({ total }) => (
    <div className="h-32 w-full mt-4 relative flex items-end">
        {/* Professional trend graph */}
        <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible preserve-3d">
            <path
                d="M0 35 C 20 35, 20 20, 40 20 S 60 28, 80 15 S 100 5, 100 5"
                fill="none"
                strokeWidth="2.5"
                className="drop-shadow-sm stroke-slate-900 dark:stroke-slate-50 transition-colors"
                strokeLinecap="round"
            />
            <path
                d="M0 35 C 20 35, 20 20, 40 20 S 60 28, 80 15 S 100 5, 100 5 V 40 H 0 Z"
                fill="url(#gradient-rev)"
                opacity="0.1"
            />
            <defs>
                <linearGradient id="gradient-rev" x1="0" y1="0" x2="0" y2="1" className="text-slate-900 dark:text-slate-50">
                    <stop offset="0%" stopColor="currentColor" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>
        <div className="absolute top-0 left-0">
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight flex items-baseline transition-colors">
                <span className="text-lg mr-1 text-slate-500 dark:text-slate-400">₹</span>{total.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-1">
                <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 transition-colors">
                    <TrendingUp className="h-3 w-3" /> +12.5%
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium transition-colors">vs yesterday</span>
            </div>
        </div>
    </div>
)

const VehicleTypes = ({ vehicles }) => {
    const counts = useMemo(() => {
        return vehicles.reduce((acc, v) => {
            acc[v.type] = (acc[v.type] || 0) + 1;
            return acc;
        }, { '2W': 0, '4W': 0 });
    }, [vehicles]);

    const maxVal = Math.max(counts['2W'], counts['4W'], 1);

    if (vehicles.length === 0) {
        return (
            <div className="mt-4 h-32 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 transition-colors">
                <Warehouse className="h-6 w-6 mb-2 opacity-50" />
                <span className="text-xs font-medium">No vehicle data available</span>
            </div>
        )
    }

    return (
        <div className="mt-4 flex flex-col gap-4">
            <div className="flex justify-around items-end h-24 px-4 pb-2 border-b border-slate-50 dark:border-slate-800 transition-colors">
                {/* 2W Bar */}
                <div className="flex flex-col items-center gap-2 group w-full">
                    <div className="relative w-10 bg-slate-100 dark:bg-slate-800 rounded-t-lg overflow-hidden flex items-end transition-colors">
                        <div
                            style={{ height: `${(counts['2W'] / maxVal) * 100}%`, minHeight: '4px' }}
                            className={cn(
                                "w-full rounded-t-lg transition-all duration-500",
                                counts['2W'] > 0 ? "bg-slate-800 dark:bg-slate-600" : "bg-transparent"
                            )}
                        ></div>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 transition-colors">2W</span>
                </div>

                {/* 4W Bar */}
                <div className="flex flex-col items-center gap-2 group w-full">
                    <div className="relative w-10 bg-slate-100 dark:bg-slate-800 rounded-t-lg overflow-hidden flex items-end transition-colors">
                        <div
                            style={{ height: `${(counts['4W'] / maxVal) * 100}%`, minHeight: '4px' }}
                            className={cn(
                                "w-full rounded-t-lg transition-all duration-500",
                                counts['4W'] > 0 ? "bg-slate-600 dark:bg-slate-400" : "bg-transparent"
                            )}
                        ></div>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 transition-colors">4W</span>
                </div>
            </div>
            <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400 px-2 transition-colors">
                <div>Total: {vehicles.length}</div>
                <div>Capacity: 50</div>
            </div>
        </div>
    )
}

const OverstayStats = ({ count, revenue }) => (
    <div className="flex items-center justify-between p-2 mt-2">
        <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 transition-colors">Total Overstays</span>
            <div className="flex items-baseline gap-1">
                <span className={cn("text-3xl font-bold font-mono transition-colors", count > 0 ? "text-rose-600 dark:text-rose-500" : "text-slate-900 dark:text-slate-200")}>
                    {count}
                </span>
                <span className="text-sm font-medium text-slate-400 dark:text-slate-600 transition-colors">vehicles</span>
            </div>
        </div>

        <div className="h-12 w-px bg-slate-100 dark:bg-slate-800 mx-4 transition-colors"></div>

        <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1 transition-colors">Overstay Revenue</span>
            <div className="flex items-baseline gap-1">
                <span className="text-sm font-medium text-slate-400 dark:text-slate-600 transition-colors">₹</span>
                <span className="text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-500 transition-colors">
                    {revenue.toLocaleString()}
                </span>
            </div>
        </div>
    </div>
)

const OccupancyRing = ({ current, total = 50 }) => {
    const percentage = Math.min((current / total) * 100, 100);
    const circumference = 2 * Math.PI * 28; // r=28
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative h-16 w-16 flex items-center justify-center">
            <svg className="h-full w-full -rotate-90">
                <circle cx="32" cy="32" r="28" strokeWidth="5" fill="none" className="stroke-slate-100 dark:stroke-slate-800 transition-colors" />
                <circle
                    cx="32" cy="32" r="28"
                    strokeWidth="5"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="stroke-slate-900 dark:stroke-slate-50 transition-all duration-1000 ease-out"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors">
                {Math.round(percentage)}%
            </div>
        </div>
    )
}

export const ActivityGrid = () => {
    const { stats, vehicles, history } = useParking();

    return (
        <div className="p-1 grid grid-cols-2 gap-4 auto-rows-min">

            {/* Revenue - Large Card */}
            <BentoCard className="col-span-1 row-span-2" title="Revenue" icon={Activity}>
                <RevenueChart total={stats.totalRevenue} />
            </BentoCard>

            {/* Occupancy & Active - Split Column */}
            <div className="col-span-1 grid grid-rows-2 gap-4">
                <BentoCard className="flex flex-row items-center justify-between !p-5">
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Occupancy</div>
                        <div className="text-xl font-bold text-slate-900 dark:text-slate-200 mt-1 transition-colors">{stats.activeCount}/50</div>
                    </div>
                    <OccupancyRing current={stats.activeCount} />
                </BentoCard>

                <BentoCard className="flex flex-row items-center justify-between !p-5">
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Active</div>
                        <div className="text-xl font-bold text-slate-900 dark:text-slate-200 mt-1 transition-colors">{stats.activeCount}</div>
                    </div>
                    <div className="h-10 w-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center border border-slate-100 dark:border-slate-700 transition-colors">
                        <Car className="h-5 w-5 text-slate-700 dark:text-slate-400 transition-colors" />
                    </div>
                </BentoCard>
            </div>

            {/* Vehicle Types - Full Width */}
            <BentoCard className="col-span-2" title="Vehicle Distribution" icon={Warehouse}>
                <VehicleTypes vehicles={[...vehicles, ...history]} />
            </BentoCard>

            {/* Overstays - Full Width */}
            <BentoCard className="col-span-2" title="Overstay Monitor" icon={Timer}>
                <OverstayStats count={stats.overstayCount} revenue={stats.overstayRevenue || 0} />
            </BentoCard>

        </div>
    )
}
