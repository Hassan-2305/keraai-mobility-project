import React, { createContext, useContext, useState, useEffect } from 'react';

const ParkingContext = createContext();

export const useParking = () => {
    const context = useContext(ParkingContext);
    if (!context) {
        throw new Error('useParking must be used within a ParkingProvider');
    }
    return context;
};

export const ParkingProvider = ({ children }) => {
    const [rates, setRates] = useState({
        '2W': { hourly: 10, capacity: 50, base: 0 },
        '4W': { hourly: 20, capacity: 50, base: 0 },
    });

    const [history, setHistory] = useState([
        // Mock history for demo
        { id: 'h1', numberPlate: 'KL-07-CC-1234', type: '4W', entryTime: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), exitTime: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), totalDue: 100, status: 'COMPLETED', actualDuration: 3, overstayHours: 0 },
        { id: 'h2', numberPlate: 'KL-07-BB-5678', type: '2W', entryTime: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), exitTime: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), totalDue: 40, status: 'COMPLETED', actualDuration: 1, overstayHours: 0 },
    ]);

    // Initial mock data
    const [vehicles, setVehicles] = useState([
        { id: '1', type: '4W', phone: '9876543210', numberPlate: 'KL-07-AB-1234', declaredDuration: 2, initialFee: 40, entryTime: new Date(Date.now() - 1000 * 60 * 90).toISOString(), status: 'ACTIVE' },
        { id: '2', type: '2W', phone: '9123456780', numberPlate: 'KL-07-CD-5678', declaredDuration: 1, initialFee: 10, entryTime: new Date(Date.now() - 1000 * 60 * 70).toISOString(), status: 'ACTIVE' },
        // A vehicle that has overstayed
        { id: '3', type: '4W', phone: '9988776655', numberPlate: 'KL-07-EF-9012', declaredDuration: 1, initialFee: 20, entryTime: new Date(Date.now() - 1000 * 60 * 130).toISOString(), status: 'ACTIVE' },
    ]);

    const [stats, setStats] = useState({
        totalRevenue: 0,
        activeCount: 0,
        overstayCount: 0,
        overstayRevenue: 0,
    });

    // Calculate initial revenue from history and active vehicles
    useEffect(() => {
        const historyRevenue = history.reduce((acc, curr) => acc + (curr.totalDue || 0), 0);
        const activeUpfrontRevenue = vehicles.reduce((acc, curr) => acc + (curr.initialFee || 0), 0);

        // Calculate overstay revenue (simplified: assuming balanceDue in history comes from overstay)
        // In a real app, we'd store overstay fee separately in history
        // For now, we'll just track new overstay revenue in the session

        setStats(prev => ({
            ...prev,
            totalRevenue: historyRevenue + activeUpfrontRevenue
        }));
    }, []); // Run once on mount to set initial correct revenue

    useEffect(() => {
        // Update stats and check for overstays periodically
        const interval = setInterval(() => {
            const now = new Date();
            let active = 0;
            let overstay = 0;

            vehicles.forEach(v => {
                if (v.status === 'ACTIVE') {
                    active++;
                    const entry = new Date(v.entryTime);
                    const elapsedHours = (now - entry) / (1000 * 60 * 60);
                    if (elapsedHours > v.declaredDuration) {
                        overstay++;
                    }
                }
            });

            setStats(prev => ({
                ...prev,
                activeCount: active,
                overstayCount: overstay
            }));
        }, 1000); // Check every second for demo purposes

        return () => clearInterval(interval);
    }, [vehicles]);

    const updateRates = (newRates) => {
        setRates(newRates);
    };

    const addVehicle = (vehicleData) => {
        const rate = rates[vehicleData.type].hourly;
        const upfrontCost = rate * vehicleData.declaredDuration;

        const newVehicle = {
            id: Math.random().toString(36).substr(2, 9),
            entryTime: new Date().toISOString(),
            status: 'ACTIVE',
            initialFee: upfrontCost, // Store upfront payment (Hours * Rate)
            ...vehicleData,
        };
        setVehicles(prev => [newVehicle, ...prev]);

        // Add upfront fee to revenue immediately
        setStats(prev => ({
            ...prev,
            totalRevenue: prev.totalRevenue + upfrontCost
        }));
    };

    const checkoutVehicle = (vehicleId) => {
        // Calculate fees
        const vehicle = vehicles.find(v => v.id === vehicleId);
        if (!vehicle) return null;

        const now = new Date();
        const entry = new Date(vehicle.entryTime);
        const durationHours = (now - entry) / (1000 * 60 * 60);
        const actualDuration = Math.ceil(durationHours); // Round up to next hour

        const rateConfig = rates[vehicle.type];
        const totalCost = actualDuration * rateConfig.hourly;
        const paidUpfront = vehicle.initialFee || 0;

        // Calculate balance directly
        const balanceDue = Math.max(0, totalCost - paidUpfront);
        const overstayHours = Math.max(0, actualDuration - vehicle.declaredDuration);

        return {
            ...vehicle,
            actualDuration,
            overstayHours,
            totalCost,
            balanceDue,
            exitTime: now.toISOString(),
            totalDue: balanceDue // Only balance is due at exit
        };
    };

    const completeExit = (vehicleId, collectedAmount, exitDetails) => {
        const vehicle = vehicles.find(v => v.id === vehicleId);
        setVehicles(prev => prev.filter(v => v.id !== vehicleId));

        if (vehicle) {
            const alreadyPaid = vehicle.initialFee || rates[vehicle.type].base;
            const totalSessionCost = alreadyPaid + collectedAmount;

            const historyItem = {
                ...vehicle,
                exitTime: new Date().toISOString(),
                totalDue: totalSessionCost,
                status: 'COMPLETED',
                actualDuration: exitDetails?.actualDuration || 0,
                overstayHours: exitDetails?.overstayHours || 0
            };
            setHistory(prev => [historyItem, ...prev]);
        }

        setStats(prev => ({
            ...prev,
            totalRevenue: prev.totalRevenue + collectedAmount,
            overstayRevenue: (prev.overstayRevenue || 0) + (collectedAmount > 0 ? collectedAmount : 0) // Track overstay collection
        }));
    };

    const resetData = () => {
        setHistory([]);
        // Recalculate revenue to only include active vehicles (upfront)
        const activeUpfront = vehicles.reduce((acc, curr) => acc + (curr.initialFee || 0), 0);
        setStats(prev => ({
            ...prev,
            totalRevenue: activeUpfront,
            overstayRevenue: 0
        }));
    };

    return (
        <ParkingContext.Provider value={{ vehicles, stats, history, rates, updateRates, addVehicle, checkoutVehicle, completeExit, resetData }}>
            {children}
        </ParkingContext.Provider>
    );
};
