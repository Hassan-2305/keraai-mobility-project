import React from 'react'
import { cn } from '../../lib/utils'

export const BentoCard = ({ children, className, title, icon: Icon, titleColor = "text-slate-900 dark:text-white" }) => {
    return (
        <div className={cn(
            "bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800 relative overflow-hidden transition-all duration-300",
            className
        )}>
            {/* Optional Header if title/icon provided */}
            {(title || Icon) && (
                <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-2">
                        {Icon && <Icon className="h-5 w-5 text-slate-900 dark:text-slate-200" />}
                        {title && <h3 className={cn("font-bold text-lg tracking-tight", titleColor)}>{title}</h3>}
                    </div>
                </div>
            )}

            <div className="relative z-10 h-full">
                {children}
            </div>

            {/* Subtle noise or gradient overlay can be added here if needed for texture */}
        </div>
    )
}
