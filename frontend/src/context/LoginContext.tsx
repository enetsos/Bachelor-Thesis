import React, { createContext, useState, useContext, useEffect } from 'react';
import AuthService from '../services/LoginService';

interface AuthContextProps {
    user: any;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(AuthService.getToken());

    useEffect(() => {
        const storedToken = AuthService.getToken();
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = async (email: string, password: string) => {
        const { user, token } = await AuthService.login(email, password);
        setUser(user);
        setToken(token);
    };

    const register = async (name: string, email: string, password: string) => {
        const { user, token } = await AuthService.register(name, email, password);
        setUser(user);
        setToken(token);
    };

    const logout = () => {
        AuthService.logout();
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
