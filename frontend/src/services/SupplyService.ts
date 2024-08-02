// src/services/SupplyService.ts

import ApiService from './ApiService'; // Assicurati di avere ApiService configurato
import { SupplyAttributes } from '../types'; // Assicurati di avere un tipo SupplyAttributes definito

const SupplyService = {
    async createSupply(data: Partial<SupplyAttributes>): Promise<SupplyAttributes> {
        try {
            const response = await ApiService.post('/supply/new-supply', data);
            return response.data as SupplyAttributes;
        } catch (error) {
            console.error('Error creating supply:', error);
            throw error;
        }
    },

    async getAllSupplies(): Promise<SupplyAttributes[]> {
        try {
            const response = await ApiService.get('/supply/get-all-supply');
            return response.data as SupplyAttributes[];
        } catch (error) {
            console.error('Error fetching all supplies:', error);
            throw error;
        }
    },

    async getSupplyById(supplyId: string): Promise<SupplyAttributes> {
        try {
            const response = await ApiService.get(`/supplies/${supplyId}`);
            return response.data as SupplyAttributes;
        } catch (error) {
            console.error('Error fetching supply by id:', error);
            throw error;
        }
    },

    async updateSupply(supplyId: string, supplyData: Partial<SupplyAttributes>): Promise<SupplyAttributes> {
        try {
            const response = await ApiService.put(`/supplies/${supplyId}`, supplyData);
            return response.data as SupplyAttributes;
        } catch (error) {
            console.error('Error updating supply:', error);
            throw error;
        }
    },

    async deleteSupply(supplyId: string): Promise<void> {
        try {
            await ApiService.delete(`/supplies/${supplyId}`);
        } catch (error) {
            console.error('Error deleting supply:', error);
            throw error;
        }
    },
};

export default SupplyService;
