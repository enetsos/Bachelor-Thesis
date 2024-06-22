// src/context/LoginContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as serviceLogin, register as serviceRegister, logout as serviceLogout, getToken, getRole } from '../services/LoginService';

interface AuthContextProps {
    role: string | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [role, setRole] = useState<string | null>(getRole());
    const [token, setToken] = useState<string | null>(getToken());

    useEffect(() => {
        const storedToken = getToken();
        const storedRole = getRole();
        if (storedToken && storedRole) {
            setToken(storedToken);
            setRole(storedRole);
        }
    }, []);

    const login = async (email: string, password: string) => {
        const { role: loggedInRole, token: loggedInToken } = await serviceLogin(email, password);
        console.log('Logged in as:', loggedInRole);
        setRole(loggedInRole);
        setToken(loggedInToken);
        localStorage.setItem('token', loggedInToken);
    };

    const register = async (name: string, email: string, password: string) => {
        const { role: registeredRole, token: registeredToken } = await serviceRegister(name, email, password);
        setRole(registeredRole);
        setToken(registeredToken);
    };

    const logout = () => {
        serviceLogout();
        setRole(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ role, token, login, register, logout }}>
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
