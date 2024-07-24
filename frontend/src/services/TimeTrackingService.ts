import ApiService from './ApiService'; // Assicurati di avere ApiService configurato
import { TimeTrackingAttributes } from '../types'; // Assicurati di avere un tipo TimeTrackingAttributes definito


const TimeTrackingService = {
    async createTimeTracking(data: TimeTrackingAttributes): Promise<TimeTrackingAttributes> {
        try {
            const response = await ApiService.post('/newTime', data);
            return response.data as TimeTrackingAttributes;
        } catch (error) {
            console.error('Error creating time tracking:', error);
            throw error;
        }
    },

    async getTimeTrackingByClient(clientId: string): Promise<TimeTrackingAttributes[]> {
        try {
            const response = await ApiService.get(`/getTime/${clientId}`);
            return response.data as TimeTrackingAttributes[];
        } catch (error) {
            console.error('Error fetching time tracking by client:', error);
            throw error;
        }
    }
};

export default TimeTrackingService;
