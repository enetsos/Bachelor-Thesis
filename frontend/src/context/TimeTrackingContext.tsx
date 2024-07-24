import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import TimeTrackingService from '../services/TimeTrackingService';
import { TimeTrackingAttributes } from '../types';

interface TimeTrackingContextProps {
    currentTimeTracking: TimeTrackingAttributes | null;
    timeTrackingByClient: TimeTrackingAttributes[] | null;
    fetchCurrentTimeTracking: () => Promise<void>;
    fetchTimeTrackingByClient: (clientId: string) => Promise<void>;
    createTimeTracking: (data: TimeTrackingAttributes) => Promise<void>;
    loading: boolean;
}

const TimeTrackingContext = createContext<TimeTrackingContextProps | undefined>(undefined);

export const useTimeTracking = (): TimeTrackingContextProps => {
    const context = useContext(TimeTrackingContext);
    if (!context) {
        throw new Error('useTimeTracking must be used within a TimeTrackingProvider');
    }
    return context;
};

export const TimeTrackingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentTimeTracking] = useState<TimeTrackingAttributes | null>(null);
    const [timeTrackingByClient, setTimeTrackingByClient] = useState<TimeTrackingAttributes[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Function to fetch the current time tracking record
    const fetchCurrentTimeTracking = async () => {
        setLoading(true);
        try {
            // const trackingData = await TimeTrackingService.getTimeTrackingByClient('current'); // Pass a suitable client ID or other identifier
            // setCurrentTimeTracking(trackingData[0] || null); // Assuming the first record is the current one
        } catch (error) {
            console.error('Error fetching current time tracking:', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch time tracking records by client ID
    const fetchTimeTrackingByClient = async (clientId: string) => {
        setLoading(true);
        try {
            const trackingData = await TimeTrackingService.getTimeTrackingByClient(clientId);
            setTimeTrackingByClient(trackingData);
        } catch (error) {
            console.error('Error fetching time tracking by client:', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to create a new time tracking record
    const createTimeTracking = async (data: TimeTrackingAttributes) => {
        setLoading(true);
        try {
            await TimeTrackingService.createTimeTracking(data);
            await fetchCurrentTimeTracking(); // Refresh current time tracking data
        } catch (error) {
            console.error('Error creating time tracking:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchCurrentTimeTracking(); // Fetch current time tracking data on mount
    }, []);

    return (
        <TimeTrackingContext.Provider value={{
            currentTimeTracking,
            timeTrackingByClient,
            fetchCurrentTimeTracking,
            fetchTimeTrackingByClient,
            createTimeTracking,
            loading
        }}>
            {children}
        </TimeTrackingContext.Provider>
    );
};
