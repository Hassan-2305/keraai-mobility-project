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
                                "w-full max-w-md overflow-hidden rounded-3xl border border-white/50 bg-white shadow-2xl shadow-slate-900/20",
                                className
                            )}
                        >
                            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/50">
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h2>
                                <button
                                    onClick={onClose}
                                    className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
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
