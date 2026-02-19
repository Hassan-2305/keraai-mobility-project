import React from "react"
import { Car, LayoutDashboard, LogOut, Settings } from "lucide-react"
import { cn } from "../../lib/utils"

const SidebarItem = ({ icon: Icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={cn(
            "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
            isActive
                ? "bg-cyan-600 text-white shadow-lg shadow-cyan-900/20"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
        )}
    >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
    </button>
)

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen w-full flex-col md:flex-row bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
            {/* Sidebar */}
            <aside className="hidden w-64 flex-col border-r border-glassBorder bg-glass backdrop-blur-xl md:flex">
                <div className="flex h-16 items-center border-b border-glassBorder px-6">
                    <Car className="mr-2 h-6 w-6 text-cyan-500" />
                    <span className="text-lg font-bold tracking-tight">ParkOps</span>
                </div>
                <div className="flex-1 space-y-1 p-4">
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" isActive={true} />
                    <SidebarItem icon={Settings} label="Settings" />
                </div>
                <div className="border-t border-glassBorder p-4">
                    <SidebarItem icon={LogOut} label="Logout" />
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="flex h-16 items-center border-b border-glassBorder bg-glass px-4 backdrop-blur-xl md:hidden">
                <Car className="mr-2 h-6 w-6 text-cyan-500" />
                <span className="text-lg font-bold">ParkOps</span>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="mx-auto max-w-7xl space-y-8">
                    {children}
                </div>
            </main>
        </div>
    )
}

export { DashboardLayout }
