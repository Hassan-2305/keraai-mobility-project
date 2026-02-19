import React from 'react'
import { ActivityGrid } from './ActivityGrid'

export const StatsPanel = () => {
    return (
        <div className="space-y-4">
            <div className="px-1">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Today's Overview</h2>
            </div>
            <ActivityGrid />
        </div>
    )
}
