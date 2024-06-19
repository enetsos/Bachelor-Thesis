import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as serviceLogin, register as serviceRegister, logout as serviceLogout, getToken } from '../services/LoginService'; // Rename imported functions to avoid conflict

interface AuthContextProps {
    user: any;
    token: string | null;
    login: (email: string, password: string) => Promise<void>; // Rename login function
    register: (name: string, email: string, password: string) => Promise<void>; // Rename register function
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(getToken());

    useEffect(() => {
        const storedToken = getToken();
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = async (email: string, password: string) => {
        const { user: loggedInUser, token: loggedInToken } = await serviceLogin(email, password); // Use serviceLogin from LoginService
        setUser(loggedInUser);
        setToken(loggedInToken);
    };

    const register = async (name: string, email: string, password: string) => {
        const { user: registeredUser, token: registeredToken } = await serviceRegister(name, email, password); // Use serviceRegister from LoginService
        setUser(registeredUser);
        setToken(registeredToken);
    };

    const logout = () => {
        serviceLogout(); // Use serviceLogout from LoginService
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
