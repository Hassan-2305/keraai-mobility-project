import * as React from "react"
import { cn } from "../../lib/utils"

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
    const variants = {
        default: "border-transparent bg-blue-600 text-white hover:bg-blue-700",
        secondary: "border-transparent bg-slate-700 text-white hover:bg-slate-600",
        destructive: "border-transparent bg-red-600 text-white hover:bg-red-700",
        outline: "text-white border-glassBorder",
        success: "border-transparent bg-emerald-600 text-white hover:bg-emerald-700",
        warning: "border-transparent bg-amber-500 text-white hover:bg-amber-600"
    }

    return (
        <div
            ref={ref}
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                variants[variant],
                className
            )}
            {...props}
        />
    )
})
Badge.displayName = "Badge"

export { Badge }
