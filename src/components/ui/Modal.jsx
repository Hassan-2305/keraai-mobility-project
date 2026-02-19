import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "../../lib/utils"

const Modal = ({ isOpen, onClose, title, children, className }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm transition-opacity"
                    />
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ scale: 0.96, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.96, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className={cn(
                                "w-full max-w-md overflow-hidden rounded-3xl border border-white/50 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl shadow-slate-900/20 dark:shadow-black/50 transition-colors",
                                className
                            )}
                        >
                            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-6 py-4 bg-slate-50/50 dark:bg-slate-900/50 transition-colors">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight transition-colors">{title}</h2>
                                <button
                                    onClick={onClose}
                                    className="rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="p-6">{children}</div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}

export { Modal }
