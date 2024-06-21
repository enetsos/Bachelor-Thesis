import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import { User } from '../types';

const UserList: React.FC = () => {
    const [Users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const UsersData = await UserService.getAllUsers();
            console.log('Fetched Users data:', UsersData);
            if (Array.isArray(UsersData)) {
                setUsers(UsersData);
            } else {
                console.error('Expected an array but got:', UsersData);
            }
        } catch (error) {
            console.error('Error fetching Users:', error);
        }
    };

    return (
        <div>
            <h1>List of Users</h1>
            <ul>
                {Users.map(User => (
                    <li key={User.id}>
                        <strong>Name:</strong> {User.name}, <strong>Email:</strong> {User.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
