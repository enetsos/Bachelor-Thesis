import axios, { AxiosInstance, AxiosResponse } from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const api: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});


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
