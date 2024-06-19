import ApiService from './ApiService';

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
    const response = await ApiService.post<LoginResponse>(`${API_URL}/login`, { email, password });
    console.log(response.data);
    localStorage.setItem('token', response.data.token);
    return response.data;
};

const register = async (name: string, email: string, password: string): Promise<RegisterResponse> => {
    const response = await ApiService.post<RegisterResponse>(`${API_URL}/clients`, { name, email, password });
    localStorage.setItem('token', response.data.token); // Ensure you store the token correctly
    return response.data;
};

const logout = (): void => {
    console.log('Logging out' + localStorage.getItem('token'));
    localStorage.removeItem('token');
    console.log('Logged out' + localStorage.getItem('token'));
};

const getToken = (): string | null => {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
};

export default {
    login,
    register,
    logout,
    getToken,
};
