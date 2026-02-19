import React, { useState } from 'react'
import { useParking } from '../../context/ParkingContext'
import { ExitModal } from './ExitModal'
import { Car, Bike, Search, Clock, ArrowRight } from 'lucide-react'
import { cn } from '../../lib/utils'

// --- COMPONENT: Mobile Card (Light Mode) ---
const VehicleCard = ({ vehicle, onExit }) => {
    const now = new Date();
    const entry = new Date(vehicle.entryTime);
    const elapsedHrs = (now - entry) / 3600000;
    const isOverstaying = elapsedHrs > vehicle.declaredDuration;

    return (
        <div
            onClick={() => onExit(vehicle)}
            className={cn(
                "relative p-5 rounded-[2rem] border bg-white dark:bg-slate-900 shadow-[0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-none active:scale-[0.97] active:bg-stone-50 dark:active:bg-slate-800 transition-all duration-200 ease-out",
                isOverstaying ? "border-rose-100 dark:border-rose-900/30 shadow-rose-50/50 dark:shadow-none" : "border-stone-100 dark:border-slate-800"
            )}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                    <div className={cn(
                        "h-12 w-12 rounded-2xl flex items-center justify-center border border-stone-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none",
                        vehicle.type === '4W' ? "text-brand-blue" : "text-stone-500 dark:text-slate-400"
                    )}>
                        {vehicle.type === '4W' ? <Car className="h-6 w-6" /> : <Bike className="h-6 w-6" />}
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-900 dark:text-white tracking-tight font-mono">{vehicle.numberPlate || 'NO PLATE'}</div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                            <span>{vehicle.phone}</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                            <span>In: {entry.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </div>
                </div>
                {isOverstaying && (
                    <div className="animate-pulse-slow px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-900/30 text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wide">
                        Late
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-50 dark:border-slate-800/50">
                <div className={cn(
                    "flex items-center gap-2 text-sm font-semibold",
                    isOverstaying ? "text-rose-600 dark:text-rose-400" : "text-slate-500 dark:text-slate-400"
                )}>
                    <Clock className="h-4 w-4" />
                    <span>{elapsedHrs.toFixed(1)} <span className="text-slate-300 dark:text-slate-600 font-normal">/</span> {vehicle.declaredDuration}h</span>
                </div>
                <button className="h-10 w-10 flex items-center justify-center rounded-full bg-stone-50 dark:bg-slate-800 text-stone-400 dark:text-slate-500 active:bg-brand-blue active:text-white active:scale-90 transition-all duration-200 shadow-sm dark:shadow-none">
                    <ArrowRight className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}

// --- MAIN COMPONENT ---
export const LiveMonitor = () => {
    const { vehicles, checkoutVehicle, completeExit } = useParking()
    const [searchTerm, setSearchTerm] = useState('')
    const [exitModalCtx, setExitModalCtx] = useState(null)

    const activeVehicles = vehicles
        .filter(v => v.status === 'ACTIVE')
        .filter(v =>
            v.phone.includes(searchTerm) ||
            (v.numberPlate && v.numberPlate.includes(searchTerm.toUpperCase()))
        )
        .sort((a, b) => new Date(a.entryTime) - new Date(b.entryTime))

    const handleExitClick = (vehicle) => {
        const data = checkoutVehicle(vehicle.id)
        setExitModalCtx({ vehicle, exitData: data })
    }

    const handleConfirmExit = () => {
        if (exitModalCtx) {
            completeExit(exitModalCtx.vehicle.id, exitModalCtx.exitData.totalDue, exitModalCtx.exitData)
            setExitModalCtx(null)
        }
    }

    return (
        <div className="flex flex-col h-full">
            {/* Toolbar */}
            <div className="flex flex-col gap-4 mb-6">
                <div className="px-1">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Live Monitor</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Manage active sessions.</p>
                </div>
                <div className="relative group">
                    <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 dark:text-slate-500 group-focus-within:text-brand-blue transition-colors" />
                    <input
                        placeholder="Search vehicle..."
                        className="w-full bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800 rounded-[1.5rem] pl-12 pr-4 py-3 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all shadow-sm dark:shadow-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Active Vehicle List (Cards Only) */}
            <div className="space-y-3 pb-24">
                {activeVehicles.length === 0 ? (
                    <div className="py-12 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 transition-colors">
                        <div className="h-16 w-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 transition-colors">
                            <Car className="h-8 w-8 text-slate-300 dark:text-slate-600 transition-colors" />
                        </div>
                        <p className="font-medium">No active vehicles</p>
                    </div>
                ) : (
                    activeVehicles.map(v => (
                        <VehicleCard key={v.id} vehicle={v} onExit={handleExitClick} />
                    ))
                )}
            </div>

            <ExitModal
                isOpen={!!exitModalCtx}
                onClose={() => setExitModalCtx(null)}
                vehicle={exitModalCtx?.vehicle}
                exitData={exitModalCtx?.exitData}
                onConfirm={handleConfirmExit}
            />
        </div>
    )
}
