import React from 'react'
import { useParking } from '../../context/ParkingContext'
import { Car, Bike, History } from 'lucide-react'
import { cn } from '../../lib/utils'

export const HistoryPanel = () => {
    const { history } = useParking()

    return (
        <div className="flex flex-col h-full">
            <div className="px-1 mb-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight transition-colors">Transaction History</h2>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium transition-colors">Recorded sessions.</p>
            </div>

            <div className="space-y-4 pb-20">
                {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center opacity-70">
                        <div className="bg-stone-100 dark:bg-slate-800 p-4 rounded-full mb-3 transition-colors">
                            <History className="h-8 w-8 text-stone-400 dark:text-slate-500 transition-colors" />
                        </div>
                        <h3 className="text-slate-900 dark:text-white font-bold transition-colors">No History</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[150px] transition-colors">Completed sessions will appear here.</p>
                    </div>
                ) : (
                    history.map((record) => (
                        <div key={record.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-stone-100 dark:border-slate-800 shadow-sm flex items-center justify-between transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "h-10 w-10 rounded-xl flex items-center justify-center border border-stone-100 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 shadow-[0_2px_6px_rgba(0,0,0,0.03)] dark:shadow-none transition-colors",
                                    record.type === '4W' ? "text-brand-blue dark:text-sky-400" : "text-purple-500 dark:text-purple-400"
                                )}>
                                    {record.type === '4W' ? <Car className="h-5 w-5" /> : <Bike className="h-5 w-5" />}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white font-mono transition-colors">{record.numberPlate || record.phone}</p>
                                    <div className="flex flex-col gap-0.5 mt-0.5">
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1 transition-colors">
                                            <span className="w-12">Entry:</span>
                                            <span className="text-slate-600 dark:text-slate-300">
                                                {new Date(record.entryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </p>
                                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1 transition-colors">
                                            <span className="w-12">Exit:</span>
                                            <span className="text-slate-600 dark:text-slate-300">
                                                {new Date(record.exitTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right flex flex-col items-end gap-1">
                                <p className="text-lg font-bold text-slate-900 dark:text-white transition-colors">₹{record.totalDue}</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded transition-colors">
                                        {record.actualDuration || 0}h
                                    </span>
                                    {record.overstayHours > 0 && (
                                        <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 px-1.5 py-0.5 rounded transition-colors">
                                            +{record.overstayHours}h Late
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
