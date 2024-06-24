// src/context/UserContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import UserService from '../services/UserService';
import { User } from '../types';

interface UserContextProps {
    users: User[];
    fetchUsers: () => Promise<void>;
    createUser: (user: Partial<User>) => Promise<User>;
    updateUser: (id: string, user: Partial<User>) => Promise<User>;
    deleteUser: (id: string) => Promise<void>;
    getByRole: (role: string) => Promise<void>;
    loading: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = (): UserContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const usersData = await UserService.getAllUsers();
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const getByRole = async (role: string) => {
        setLoading(true);
        try {
            const usersData = await UserService.getUserByRole(role);
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching users by role:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const createUser = async (user: Partial<User>): Promise<User> => {
        try {
            const newUser = await UserService.createUser(user);
            setUsers(prevUsers => [...prevUsers, newUser]);
            return newUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    };

    const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
        try {
            const updatedUser = await UserService.updateUser(id, user);
            setUsers(prevUsers => prevUsers.map(u => (u.id === id ? updatedUser : u)));
            return updatedUser;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    };

    const deleteUser = async (id: string): Promise<void> => {
        try {
            await UserService.deleteUser(id);
            setUsers(prevUsers => prevUsers.filter(u => u.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    };




    useEffect(() => {
    }, []);

    return (
        <UserContext.Provider value={{ users, fetchUsers, createUser, updateUser, deleteUser, getByRole, loading }}>
            {children}
        </UserContext.Provider>
    );
};
