import React, { useState } from 'react';
import { useAuth } from '../context/LoginContext';

const LoginForm: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, logout, user } = useAuth(); // Access the logout function and user info

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const handleLogout = () => {
        logout(); // Call the logout function from useAuth
    };

    return (
        <div>
            {user ? (
                <>
                    <p>Welcome, {user.name}!</p>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
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
            )}
        </div>
    );
};

export default LoginForm;
