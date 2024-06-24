import ApiService from './ApiService';
import { User } from '../types';

const UserService = {
    async getAllUsers(): Promise<User[]> {
        try {
            const response = await ApiService.get('/users/',);
            return response.data as User[];
        } catch (error) {
            console.error('Error fetching Users:', error);
            throw error;
        }
    },

    async getUserByRole(role: string): Promise<User[]> {
        try {
            const response = await ApiService.get(`/users/role/${role}`);
            return response.data as User[];
        } catch (error) {
            console.error('Error fetching Users by role:', error);
            throw error;
        }
    },

    async createUser(UserData: Partial<User>): Promise<User> {
        try {
            const response = await ApiService.post('/users', UserData);
            return response.data as User;
        } catch (error) {
            console.error('Error creating User:', error);
            throw error;
        }
    },

    async updateUser(id: string, UserData: Partial<User>): Promise<User> {
        try {
            const response = await ApiService.put(`/users/${id}`, UserData);
            return response.data as User;
        } catch (error) {
            console.error('Error updating User:', error);
            throw error;
        }
    },

    async deleteUser(id: string): Promise<void> {
        try {
            await ApiService.delete(`/users/${id}`);
        } catch (error) {
            console.error('Error deleting User:', error);
            throw error;
        }
    },


};

export default UserService;
