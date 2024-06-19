// src/controllers/ClientController.ts

import ApiService from './ApiService';

const ClientService = {
    async getAllClients(): Promise<Client[]> {
        try {
            const response = await ApiService.get('/clients/',);
            return response.data as Client[];
        } catch (error) {
            console.error('Error fetching clients:', error);
            throw error;
        }
    },

    async createClient(clientData: Partial<Client>): Promise<Client> {
        try {
            const response = await ApiService.post('/clients', clientData);
            return response.data as Client;
        } catch (error) {
            console.error('Error creating client:', error);
            throw error;
        }
    },

    async updateClient(id: string, clientData: Partial<Client>): Promise<Client> {
        try {
            const response = await ApiService.put(`/clients/${id}`, clientData);
            return response.data as Client;
        } catch (error) {
            console.error('Error updating client:', error);
            throw error;
        }
    },

    async deleteClient(id: string): Promise<void> {
        try {
            await ApiService.delete(`/clients/${id}`);
        } catch (error) {
            console.error('Error deleting client:', error);
            throw error;
        }
    },
};

export default ClientService;
