import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import TimeTrackingService from '../services/TimeTrackingService';
import { TimeTrackingAttributes } from '../types';

interface TimeTrackingContextProps {
    timeTracking: TimeTrackingAttributes[];
    fetchTimeTracking: () => Promise<void>;
    fetchTimeTrackingByClient: (clientId: string) => Promise<void>;
    fetchTimeTrackingByEmployee: (employeeId: string) => Promise<void>;
    createTimeTracking: (data: Partial<TimeTrackingAttributes>) => Promise<void>;
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
    const [timeTracking, setTimeTracking] = useState<TimeTrackingAttributes[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Function to fetch the current time tracking record
    const fetchTimeTracking = async () => {
        setLoading(true);
        try {
            const trackingData = await TimeTrackingService.getAllTimeTracking();
            setTimeTracking(trackingData); // Assuming the first record is the current one
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
            setTimeTracking(trackingData);
        } catch (error) {
            console.error('Error fetching time tracking by client:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTimeTrackingByEmployee = async (employeeId: string) => {
        setLoading(true);
        try {
            const trackingData = await TimeTrackingService.getTimeTrackingByEmployee(employeeId);
            setTimeTracking(trackingData);
        } catch (error) {
            console.error('Error fetching time tracking by employee:', error);
        } finally {
            setLoading(false);
        }
    }

    // Function to create a new time tracking record
    const createTimeTracking = async (data: Partial<TimeTrackingAttributes>) => {
        setLoading(true);
        try {
            await TimeTrackingService.createTimeTracking(data);
            await fetchTimeTracking();
        } catch (error) {
            console.error('Error creating time tracking:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
    }, []);

    return (
        <TimeTrackingContext.Provider value={{
            timeTracking,
            fetchTimeTracking,
            fetchTimeTrackingByClient,
            fetchTimeTrackingByEmployee,
            createTimeTracking,
            loading
        }}>
            {children}
        </TimeTrackingContext.Provider>
    );
};
