import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as serviceLogin, logout as serviceLogout, getUserInfo } from '../services/LoginService';

interface AuthContextProps {
    role: string | null;
    userId: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [role, setRole] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getUserInfo(); // Recupera le informazioni dell'utente usando il token
                setRole(userInfo.role);
                setUserId(userInfo.userId);
            } catch (error) {
                console.error('Error fetching user info:', error);
                setRole(null); // Nessun utente autenticato
            }
        };

        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const userInfo = await getUserInfo();
            setRole(userInfo.role);
            setUserId(userInfo.userId);
        } catch (error) {
            console.error('Error fetching user info:', error);
            setRole(null);
        }
    };

    const login = async (email: string, password: string) => {
        await serviceLogin(email, password);
        await fetchUserInfo();
    };


    const logout = async () => {
        await serviceLogout();
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ role, userId, login, logout }}>
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
