// src/services/TimeTrackingSupplyService.ts

import ApiService from './ApiService'; // Assicurati di avere ApiService configurato
import { SupplyAttributes, TimeTrackingAttributes, TimeTrackingSupplyAttributes } from '../types'; // Assicurati di avere i tipi definiti

const TimeTrackingSupplyService = {
    async addSuppliesToTimeTracking(timeTrackingId: string, data: TimeTrackingSupplyAttributes[]): Promise<TimeTrackingSupplyAttributes[]> {
        try {
            const response = await ApiService.post(`/time-tracking-supply/timetracking/${timeTrackingId}/supplies`, data);
            return response.data as TimeTrackingSupplyAttributes[];
        } catch (error) {
            console.error('Error adding supplies to time tracking:', error);
            throw error;
        }
    },

    async getSuppliesByTimeTrackingId(timeTrackingId: string): Promise<SupplyAttributes[]> {
        try {
            const response = await ApiService.get(`/time-tracking-supply/timetracking/${timeTrackingId}/supplies`);
            return response.data as SupplyAttributes[];
        } catch (error) {
            console.error('Error fetching supplies by time tracking id:', error);
            throw error;
        }
    },

    async getTimeTrackingsBySupplyId(supplyId: string): Promise<TimeTrackingAttributes[]> {
        try {
            const response = await ApiService.get(`/time-tracking-supply/supply/${supplyId}/timetrackings`);
            return response.data as TimeTrackingAttributes[];
        } catch (error) {
            console.error('Error fetching time trackings by supply id:', error);
            throw error;
        }
    }
};

export default TimeTrackingSupplyService;
