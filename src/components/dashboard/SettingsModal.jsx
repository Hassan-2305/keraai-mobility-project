import React, { useState } from 'react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { useParking } from '../../context/ParkingContext'
import { Save, Bike, Car } from 'lucide-react'

export const SettingsModal = ({ isOpen, onClose }) => {
    const { rates, updateRates, resetData } = useParking()
    const [localRates, setLocalRates] = useState(rates)

    const handleChange = (type, field, value) => {
        setLocalRates(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [field]: Number(value)
            }
        }))
    }

    const handleSave = () => {
        updateRates(localRates)
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Rate Configuration">
            <div className="space-y-6">
                <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors">Configure base and hourly parking charges.</p>

                {/* 2W Settings */}
                <div className="p-4 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-900 transition-colors">
                    <div className="flex items-center gap-2 mb-4 text-slate-700 dark:text-slate-200 font-bold transition-colors">
                        <Bike className="h-5 w-5" />
                        <span>Two Wheeler (2W)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-1 transition-colors">Base Charge</label>
                            <div className="flex items-center bg-white dark:bg-slate-950 rounded-lg border border-stone-200 dark:border-slate-800 px-3 py-2 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/20 transition-all">
                                <span className="text-slate-400 dark:text-slate-500 mr-2">₹</span>
                                <input
                                    type="number"
                                    value={localRates['2W'].base}
                                    onChange={(e) => handleChange('2W', 'base', e.target.value)}
                                    className="w-full text-slate-900 dark:text-white font-bold outline-none bg-transparent transition-colors"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-1 transition-colors">Hourly Rate</label>
                            <div className="flex items-center bg-white dark:bg-slate-950 rounded-lg border border-stone-200 dark:border-slate-800 px-3 py-2 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/20 transition-all">
                                <span className="text-slate-400 dark:text-slate-500 mr-2">₹</span>
                                <input
                                    type="number"
                                    value={localRates['2W'].hourly}
                                    onChange={(e) => handleChange('2W', 'hourly', e.target.value)}
                                    className="w-full text-slate-900 dark:text-white font-bold outline-none bg-transparent transition-colors"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-1 transition-colors">Overstay Rate / hr</label>
                            <div className="flex items-center bg-white dark:bg-slate-950 rounded-lg border border-rose-100 dark:border-rose-900/40 px-3 py-2 focus-within:border-rose-400 focus-within:ring-2 focus-within:ring-rose-400/20 transition-all">
                                <span className="text-rose-400 dark:text-rose-500 mr-2">₹</span>
                                <input
                                    type="number"
                                    value={localRates['2W'].overstay ?? ''}
                                    onChange={(e) => handleChange('2W', 'overstay', e.target.value)}
                                    className="w-full text-slate-900 dark:text-white font-bold outline-none bg-transparent transition-colors"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-1 transition-colors">Total Slots</label>
                            <div className="flex items-center bg-white dark:bg-slate-950 rounded-lg border border-stone-200 dark:border-slate-800 px-3 py-2 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/20 transition-all">
                                <span className="text-slate-400 dark:text-slate-500 mr-2 text-xs">#</span>
                                <input
                                    type="number"
                                    value={localRates['2W'].capacity}
                                    onChange={(e) => handleChange('2W', 'capacity', e.target.value)}
                                    className="w-full text-slate-900 dark:text-white font-bold outline-none bg-transparent transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4W Settings */}
                <div className="p-4 rounded-xl border border-cyan-100 dark:border-cyan-900/50 bg-cyan-50/30 dark:bg-cyan-950/20 transition-colors">
                    <div className="flex items-center gap-2 mb-4 text-cyan-900 dark:text-cyan-400 font-bold transition-colors">
                        <Car className="h-5 w-5" />
                        <span>Four Wheeler (4W)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-1 transition-colors">Base Charge</label>
                            <div className="flex items-center bg-white dark:bg-slate-950 rounded-lg border border-cyan-100 dark:border-cyan-900/30 px-3 py-2 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/20 transition-all">
                                <span className="text-slate-400 dark:text-slate-500 mr-2">₹</span>
                                <input
                                    type="number"
                                    value={localRates['4W'].base}
                                    onChange={(e) => handleChange('4W', 'base', e.target.value)}
                                    className="w-full text-slate-900 dark:text-white font-bold outline-none bg-transparent transition-colors"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-1 transition-colors">Hourly Rate</label>
                            <div className="flex items-center bg-white dark:bg-slate-950 rounded-lg border border-cyan-100 dark:border-cyan-900/30 px-3 py-2 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/20 transition-all">
                                <span className="text-slate-400 dark:text-slate-500 mr-2">₹</span>
                                <input
                                    type="number"
                                    value={localRates['4W'].hourly}
                                    onChange={(e) => handleChange('4W', 'hourly', e.target.value)}
                                    className="w-full text-slate-900 dark:text-white font-bold outline-none bg-transparent transition-colors"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-1 transition-colors">Overstay Rate / hr</label>
                            <div className="flex items-center bg-white dark:bg-slate-950 rounded-lg border border-rose-100 dark:border-rose-900/40 px-3 py-2 focus-within:border-rose-400 focus-within:ring-2 focus-within:ring-rose-400/20 transition-all">
                                <span className="text-rose-400 dark:text-rose-500 mr-2">₹</span>
                                <input
                                    type="number"
                                    value={localRates['4W'].overstay ?? ''}
                                    onChange={(e) => handleChange('4W', 'overstay', e.target.value)}
                                    className="w-full text-slate-900 dark:text-white font-bold outline-none bg-transparent transition-colors"
                                    placeholder="0"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-1 transition-colors">Total Slots</label>
                            <div className="flex items-center bg-white dark:bg-slate-950 rounded-lg border border-cyan-100 dark:border-cyan-900/30 px-3 py-2 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/20 transition-all">
                                <span className="text-slate-400 dark:text-slate-500 mr-2 text-xs">#</span>
                                <input
                                    type="number"
                                    value={localRates['4W'].capacity}
                                    onChange={(e) => handleChange('4W', 'capacity', e.target.value)}
                                    className="w-full text-slate-900 dark:text-white font-bold outline-none bg-transparent transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-stone-100 dark:border-slate-800 transition-colors">
                    <Button onClick={handleSave} className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 transition-colors">
                        <Save className="h-4 w-4 mr-2" /> Save Configuration
                    </Button>
                </div>

                <div className="pt-2">
                    <p className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-2">Danger Zone</p>
                    <Button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to clear all history? This cannot be undone.')) {
                                resetData();
                                onClose();
                            }
                        }}
                        variant="outline"
                        className="w-full border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-900/30 dark:text-rose-400 dark:hover:bg-rose-900/20 transition-colors"
                    >
                        Clear History & Reset Revenue
                    </Button>
                </div>
            </div>
        </Modal >
    )
}
