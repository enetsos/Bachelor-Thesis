import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import TimeTrackingService from '../services/TimeTrackingService';
import TimeTrackingSupplyService from '../services/TimeTrackingSupplyService';
import { SupplyAttributes, TimeTrackingAttributes, TimeTrackingSupplyAttributes } from '../types';

interface TimeTrackingContextProps {
    supplies: TimeTrackingSupplyAttributes[];
    timeTracking: TimeTrackingAttributes[];
    currentTimeTracking: TimeTrackingAttributes | null;
    fetchTimeTracking: () => Promise<void>;
    fetchTimeTrackingByClient: (clientId: string) => Promise<TimeTrackingAttributes[]>;
    fetchTimeTrackingByEmployee: (employeeId: string) => Promise<TimeTrackingAttributes[]>;
    getTimeTrackingById: (timeTrackingId: string) => Promise<TimeTrackingAttributes>;
    createTimeTracking: (data: Partial<TimeTrackingAttributes>) => Promise<TimeTrackingAttributes>;
    updateTimeTracking: (timeTrackingId: string, timeTracking: Partial<TimeTrackingAttributes>) => Promise<TimeTrackingAttributes>;
    fetchSuppliesByTimeTrackingId: (timeTrackingId: string) => Promise<TimeTrackingSupplyAttributes[]>;
    fetchTimeTrackingsBySupplyId: (supplyId: string) => Promise<void>;
    addSuppliesToTimeTracking: (timeTrackingId: string, supplies: TimeTrackingSupplyAttributes[]) => Promise<void>;
    loading: boolean;
}

const TimeTrackingContext = createContext<TimeTrackingContextProps | undefined>(undefined);

export const useTimeTracking = (): TimeTrackingContextProps => {
    const context = useContext(TimeTrackingContext);
    if (!context) {
        throw new Error('useTimeTrackingSupply must be used within a TimeTrackingSupplyProvider');
    }
    return context;
};

export const TimeTrackingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [supplies, setSupplies] = useState<TimeTrackingSupplyAttributes[]>([]);
    const [timeTracking, setTimeTracking] = useState<TimeTrackingAttributes[]>([]);
    const [currentTimeTracking, setCurrentTimeTracking] = useState<TimeTrackingAttributes | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Functions for TimeTracking
    const fetchTimeTracking = async () => {
        setLoading(true);
        try {
            const trackingData = await TimeTrackingService.getAllTimeTracking();
            setTimeTracking(trackingData);
        } catch (error) {
            console.error('Error fetching current time tracking:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTimeTrackingByClient = async (clientId: string): Promise<TimeTrackingAttributes[]> => {
        setLoading(true);
        try {
            const trackingData = await TimeTrackingService.getTimeTrackingByClient(clientId);
            return trackingData;
        } catch (error) {
            console.error('Error fetching time tracking by client:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const fetchTimeTrackingByEmployee = async (employeeId: string): Promise<TimeTrackingAttributes[]> => {
        setLoading(true);
        try {
            const trackingData = await TimeTrackingService.getTimeTrackingByEmployee(employeeId);
            return trackingData;
        } catch (error) {
            console.error('Error fetching time tracking by employee:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const getTimeTrackingById = async (timeTrackingId: string): Promise<TimeTrackingAttributes> => {
        setLoading(true);
        try {
            const trackingData = await TimeTrackingService.getTimeTrackingById(timeTrackingId);
            setCurrentTimeTracking(trackingData);
            return trackingData;
        } catch (error) {
            console.error('Error fetching time tracking by id:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const createTimeTracking = async (data: Partial<TimeTrackingAttributes>): Promise<TimeTrackingAttributes> => {
        setLoading(true);
        try {
            const newTimeTracking = await TimeTrackingService.createTimeTracking(data);
            setCurrentTimeTracking(newTimeTracking);
            await fetchTimeTracking();
            return newTimeTracking;
        } catch (error) {
            console.error('Error creating time tracking:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const updateTimeTracking = async (timeTrackingId: string, timeTracking: Partial<TimeTrackingAttributes>): Promise<TimeTrackingAttributes> => {
        setLoading(true);
        try {
            const updatedTimeTracking = await TimeTrackingService.updateTimeTracking(timeTrackingId, timeTracking);
            setCurrentTimeTracking(updatedTimeTracking);
            await fetchTimeTracking();
            return updatedTimeTracking;
        } catch (error) {
            console.error('Error updating time tracking:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    // Functions for TimeTrackingSupply
    const fetchSuppliesByTimeTrackingId = async (timeTrackingId: string): Promise<TimeTrackingSupplyAttributes[]> => {
        setLoading(true);
        try {
            const suppliesData = await TimeTrackingSupplyService.getSuppliesByTimeTrackingId(timeTrackingId);
            setSupplies(suppliesData);
            return suppliesData;
        } catch (error) {
            console.error('Error fetching supplies by time tracking id:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const fetchTimeTrackingsBySupplyId = async (supplyId: string) => {
        setLoading(true);
        try {
            const timeTrackingsData = await TimeTrackingSupplyService.getTimeTrackingsBySupplyId(supplyId);
            setTimeTracking(timeTrackingsData);
        } catch (error) {
            console.error('Error fetching time trackings by supply id:', error);
        } finally {
            setLoading(false);
        }
    };

    const addSuppliesToTimeTracking = async (timeTrackingId: string, supplies: TimeTrackingSupplyAttributes[]) => {
        setLoading(true);
        try {
            await TimeTrackingSupplyService.addSuppliesToTimeTracking(timeTrackingId, supplies);
            await fetchSuppliesByTimeTrackingId(timeTrackingId);
        } catch (error) {
            console.error('Error adding supplies to time tracking:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTimeTracking();
    }, []);

    return (
        <TimeTrackingContext.Provider value={{
            supplies,
            timeTracking,
            currentTimeTracking,
            fetchTimeTracking,
            fetchTimeTrackingByClient,
            fetchTimeTrackingByEmployee,
            getTimeTrackingById,
            createTimeTracking,
            updateTimeTracking,
            fetchSuppliesByTimeTrackingId,
            fetchTimeTrackingsBySupplyId,
            addSuppliesToTimeTracking,
            loading
        }}>
            {children}
        </TimeTrackingContext.Provider>
    );
};
