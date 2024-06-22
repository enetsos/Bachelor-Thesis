// src/components/LoginForm.jsx

import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useAuth } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div style={{ maxWidth: 300, margin: '0 auto', padding: '20px' }}>
            <Form
                name="loginForm"
                onFinish={handleSubmit}
                initialValues={{ email, password }}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;
