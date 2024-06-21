import React, { useState } from 'react';
import { useAuth } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, logout, role } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="button" onClick={logout}>Logout</button>
                <button type="submit">Login</button>
            </form>

        </div>
    );
};

export default LoginForm;
