import ApiService from './ApiService';

const API_URL = 'http://localhost:3000/api';

interface LoginResponse {
    role: string;
    token: string;
}

interface RegisterResponse {
    role: string;
    token: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await ApiService.post<LoginResponse>(`${API_URL}/login`, { email, password });
    console.log(response.data);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', response.data.role);
    return response.data;
};

export const register = async (name: string, email: string, password: string): Promise<RegisterResponse> => {
    const response = await ApiService.post<RegisterResponse>(`${API_URL}/clients`, { name, email, password });
    return response.data;
};

export const logout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
};

export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

export const getRole = (): string | null => {
    return localStorage.getItem('role');
}
