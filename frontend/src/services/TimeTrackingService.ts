import ApiService from './ApiService'; // Assicurati di avere ApiService configurato
import { TimeTrackingAttributes } from '../types'; // Assicurati di avere un tipo TimeTrackingAttributes definito


const TimeTrackingService = {
    async createTimeTracking(data: TimeTrackingAttributes): Promise<TimeTrackingAttributes> {
        try {
            const response = await ApiService.post('/time-tracking/new-time', data);
            return response.data as TimeTrackingAttributes;
        } catch (error) {
            console.error('Error creating time tracking:', error);
            throw error;
        }
    },

    async getAllTimeTracking(): Promise<TimeTrackingAttributes[]> {
        try {
            const response = await ApiService.get('/time-tracking/get-all-time');
            return response.data as TimeTrackingAttributes[];
        } catch (error) {
            console.error('Error fetching all time tracking:', error);
            throw error;
        }
    },

    async getTimeTrackingByClient(clientId: string): Promise<TimeTrackingAttributes[]> {
        try {
            const response = await ApiService.get(`/time-tracking/get-client-time/${clientId}`);
            return response.data as TimeTrackingAttributes[];
        } catch (error) {
            console.error('Error fetching time tracking by client:', error);
            throw error;
        }
    },

    async getTimeTrackingByEmployee(employeeId: string): Promise<TimeTrackingAttributes[]> {
        try {
            const response = await ApiService.get(`/time-tracking/get-employee-time/${employeeId}`);
            return response.data as TimeTrackingAttributes[];
        } catch (error) {
            console.error('Error fetching time tracking by employee:', error);
            throw error;
        }
    }
};

export default TimeTrackingService;
