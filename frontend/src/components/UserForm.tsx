// src/components/UserForm.tsx
import React, { useState } from 'react';
import UserService from '../services/UserService';

const UserForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pw, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const newUser = await UserService.createUser({ name, email, pw, role });
            console.log('Created User:', newUser);
            // Optionally reset form state or perform other actions after successful creation
        } catch (error) {
            console.error('Error creating User:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={pw} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <label>
                Role:
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="User">User</option>
                    <option value="employee">Employee</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="admin">Admin</option>
                </select>
            </label>
            <button type="submit">Create User</button>
        </form>
    );
};

export default UserForm;
