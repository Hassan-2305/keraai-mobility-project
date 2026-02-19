import React, { useState, useEffect } from "react"
import { MobileLayout } from "./MobileLayout" // We'll keep using this for mobile logic but renamed/refactored
import { DesktopLayout } from "./DesktopLayout"

export const ResponsiveLayout = ({ children, activeTab, onTabChange }) => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if (isDesktop) {
        return <DesktopLayout activeTab={activeTab} onTabChange={onTabChange}>{children}</DesktopLayout>
    }

    return <MobileLayout activeTab={activeTab} onTabChange={onTabChange}>{children}</MobileLayout>
}
