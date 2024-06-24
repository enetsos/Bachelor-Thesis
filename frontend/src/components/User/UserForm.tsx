// src/components/User/UserForm.tsx

import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useUser } from '../../context/UserContext';
import { User } from '../../types';

const UserForm: React.FC = () => {
    const [form] = Form.useForm();
    const { createUser, getByRole } = useUser();
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = async (values: Partial<User>) => {
        setLoading(true);
        try {
            await createUser(values);
            form.resetFields();
            await getByRole('admin');
        } catch (error) {
            console.error('Error creating user:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input the name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input the email!' }]}
            >
                <Input type="email" />
            </Form.Item>
            <Form.Item
                label="Password"
                name="pw"
                rules={[{ required: true, message: 'Please input the password!' }]}
            >
                <Input type="password" />
            </Form.Item>
            <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: 'Please select the role!' }]}
            >
                <Select>
                    <Select.Option value="client">Client</Select.Option>
                    <Select.Option value="employee">Employee</Select.Option>
                    <Select.Option value="supervisor">Supervisor</Select.Option>
                    <Select.Option value="admin">Admin</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Create User
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UserForm;
