import ApiService from './ApiService';

interface LoginResponse {
    role: string;
}

interface UserInfoResponse {
    role: string;
    userId: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await ApiService.post<LoginResponse>('/auth/login', { email, password });
    console.log(response.data);
    return response.data;
};


export const logout = async (): Promise<void> => {
    await ApiService.post('/auth/logout', {}); // Chiama il logout sul server
};

export const getUserInfo = async (): Promise<UserInfoResponse> => {
    const response = await ApiService.get<UserInfoResponse>('/auth/user-info');
    return response.data;
};