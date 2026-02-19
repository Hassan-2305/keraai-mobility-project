import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"
import { Loader2 } from "lucide-react"

const Button = React.forwardRef(({ className, variant = "default", size = "default", isLoading, children, ...props }, ref) => {
    const variants = {
        default: "bg-brand-blue hover:bg-cyan-600 text-white shadow-lg shadow-brand-blue/30 border border-transparent",
        destructive: "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 hover:border-red-300 shadow-sm",
        outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-sm",
        ghost: "hover:bg-slate-100 text-slate-500 hover:text-slate-900",
        link: "text-brand-blue underline-offset-4 hover:underline",
    }

    const sizes = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3 text-sm",
        lg: "h-12 rounded-xl px-8 text-base font-semibold",
        icon: "h-10 w-10 p-0",
    }

    return (
        <motion.button
            ref={ref}
            whileTap={{ scale: 0.97 }}
            className={cn(
                "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 disabled:pointer-events-none disabled:opacity-50 tracking-wide",
                variants[variant],
                sizes[size],
                className
            )}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {children}
        </motion.button>
    )
})
Button.displayName = "Button"

export { Button }
