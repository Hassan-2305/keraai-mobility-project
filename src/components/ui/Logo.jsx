import React from 'react'
import { cn } from "../../lib/utils"

export const Logo = ({ className, forceDark = false }) => {
    return (
        <div className={cn("flex flex-col select-none", className)}>
            <div className="flex items-center gap-1">
                {/* Kera Text */}
                <span className={cn(
                    "text-3xl font-bold tracking-tight",
                    forceDark ? "text-slate-900" : "text-brand-blue dark:text-white"
                )}>
                    Kera
                </span>

                {/* AI Box */}
                <div className="relative flex items-center justify-center ml-0.5">
                    {/* Box Border */}
                    <div className={cn(
                        "absolute inset-0 rounded-lg border-[2.5px]",
                        forceDark ? "border-brand-blue" : "border-brand-blue dark:border-white"
                    )}></div>

                    {/* Star/Spark */}
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className={cn(
                            "absolute -top-2 -right-2 h-5 w-5",
                            forceDark ? "text-cyan-600" : "text-cyan-600 dark:text-cyan-400"
                        )}
                    >
                        <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
                    </svg>

                    {/* AI Text */}
                    <span className={cn(
                        "text-xl font-bold px-2 py-0.5 relative z-10",
                        forceDark ? "text-brand-blue" : "text-brand-blue dark:text-white"
                    )}>
                        AI
                    </span>
                </div>
            </div>

            {/* Subtitle */}
            <span className={cn(
                "text-[0.55rem] font-medium tracking-[0.2em] uppercase text-center -mt-0.5 ml-1",
                forceDark ? "text-slate-600" : "text-slate-600 dark:text-slate-400"
            )}>
                Urban Technologies
            </span>
        </div>
    )
}
