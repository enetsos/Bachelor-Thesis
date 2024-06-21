import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getToken } from './LoginService';

const baseURL = 'http://localhost:3000/';

const api: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});


api.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const ApiService = {
    async get<T>(url: string): Promise<AxiosResponse<T>> {
        return api.get<T>(url);
    },

    async post<T>(url: string, data: any): Promise<AxiosResponse<T>> {
        return api.post<T>(url, data);
    },

    async put<T>(url: string, data: any): Promise<AxiosResponse<T>> {
        return api.put<T>(url, data);
    },

    async delete<T>(url: string): Promise<AxiosResponse<T>> {
        return api.delete<T>(url);
    },
};

export default ApiService;
