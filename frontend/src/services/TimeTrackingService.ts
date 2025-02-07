import ApiService from './ApiService'; // Assicurati di avere ApiService configurato
import { TimeTrackingAttributes } from '../types'; // Assicurati di avere un tipo TimeTrackingAttributes definito


const TimeTrackingService = {
    async createTimeTracking(data: Partial<TimeTrackingAttributes>): Promise<TimeTrackingAttributes> {
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
            console.log(response.data);
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
    },

    async getTimeTrackingById(timeTrackingId: string): Promise<TimeTrackingAttributes> {
        try {
            const response = await ApiService.get(`/time-tracking/get-time/${timeTrackingId}`);
            return response.data as TimeTrackingAttributes;
        } catch (error) {
            console.error('Error fetching time tracking by id:', error);
            throw error;
        }
    },

    async updateTimeTracking(timeTrackingId: string, timeTrackingData: Partial<TimeTrackingAttributes>): Promise<TimeTrackingAttributes> {
        try {
            const response = await ApiService.put(`/time-tracking/stop-time/${timeTrackingId}`, timeTrackingData);
            return response.data as TimeTrackingAttributes;
        } catch (error) {
            console.error('Error stopping time tracking:', error);
            throw error;
        }
    },
};

export default TimeTrackingService;
