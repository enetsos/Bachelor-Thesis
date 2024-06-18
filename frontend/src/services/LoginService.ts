
import axios from 'axios';

const API_URL = 'http://localhost:3000';

interface LoginResponse {
    user: any;
    token: string;
}

interface RegisterResponse {
    user: any;
    token: string;
}

const login = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
};

const register = async (name: string, email: string, password: string): Promise<RegisterResponse> => {
    const response = await axios.post(`${API_URL}/clients`, { name, email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
};

const logout = (): void => {
    localStorage.removeItem('token');
};

const getToken = (): string | null => {
    return localStorage.getItem('token');
};

export default {
    login,
    register,
    logout,
    getToken,
};
