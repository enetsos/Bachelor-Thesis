// src/context/SupplyContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import SupplyService from '../services/SupplyService';
import { SupplyAttributes } from '../types';

interface SupplyContextProps {
    supplies: SupplyAttributes[];
    currentSupply: SupplyAttributes | null;
    fetchSupplies: () => Promise<void>;
    getSupplyById: (supplyId: string) => Promise<SupplyAttributes>;
    createSupply: (data: Partial<SupplyAttributes>) => Promise<void>;
    updateSupply: (supplyId: string, supply: Partial<SupplyAttributes>) => Promise<SupplyAttributes>;
    deleteSupply: (supplyId: string) => Promise<void>;
    loading: boolean;
}

const SupplyContext = createContext<SupplyContextProps | undefined>(undefined);

export const useSupply = (): SupplyContextProps => {
    const context = useContext(SupplyContext);
    if (!context) {
        throw new Error('useSupply must be used within a SupplyProvider');
    }
    return context;
};

export const SupplyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [supplies, setSupplies] = useState<SupplyAttributes[]>([]);
    const [currentSupply, setCurrentSupply] = useState<SupplyAttributes | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchSupplies = async () => {
        setLoading(true);
        try {
            const suppliesData = await SupplyService.getAllSupplies();
            setSupplies(suppliesData);
        } catch (error) {
            console.error('Error fetching supplies:', error);
        } finally {
            setLoading(false);
        }
    };

    const getSupplyById = async (supplyId: string): Promise<SupplyAttributes> => {
        setLoading(true);
        try {
            const supplyData = await SupplyService.getSupplyById(supplyId);
            return supplyData;
        } catch (error) {
            console.error('Error fetching supply by id:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const createSupply = async (data: Partial<SupplyAttributes>) => {
        setLoading(true);
        try {
            const newSupply = await SupplyService.createSupply(data);
            setCurrentSupply(newSupply);
            await fetchSupplies();
        } catch (error) {
            console.error('Error creating supply:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateSupply = async (supplyId: string, supply: Partial<SupplyAttributes>): Promise<SupplyAttributes> => {
        setLoading(true);
        try {
            const updatedSupply = await SupplyService.updateSupply(supplyId, supply);
            setCurrentSupply(updatedSupply);
            await fetchSupplies();
            return updatedSupply;
        } catch (error) {
            console.error('Error updating supply:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteSupply = async (supplyId: string): Promise<void> => {
        setLoading(true);
        try {
            await SupplyService.deleteSupply(supplyId);
            await fetchSupplies();
        } catch (error) {
            console.error('Error deleting supply:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSupplies();
    }, []);

    return (
        <SupplyContext.Provider value={{
            supplies,
            currentSupply,
            fetchSupplies,
            getSupplyById,
            createSupply,
            updateSupply,
            deleteSupply,
            loading
        }}>
            {children}
        </SupplyContext.Provider>
    );
};
