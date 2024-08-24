import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useUser } from '../../context/UserContext';
import { User } from '../../types';
import MapView from '../MapView';

const UserForm: React.FC = () => {
    const [form] = Form.useForm();
    const { createUser, getByRole } = useUser();
    const [loading, setLoading] = useState<boolean>(false);
    const [userRole, setUserRole] = useState<string>('');
    const [clientLAT, setClientLAT] = useState<number | null>(null);
    const [clientLONG, setClientLONG] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

    const onFinish = async (values: Partial<User>) => {
        setLoading(true);
        try {
            const userData = { ...values, clientLAT, clientLONG };
            await createUser(userData);
            form.resetFields();
            await getByRole('admin');
            setUserRole('');
            setClientLAT(null);
            setClientLONG(null);
        } catch (error) {
            console.error('Error creating user:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = (value: string) => {
        setUserRole(value);
    };

    // Debounced search location function
    const searchLocation = async (query: string) => {
        if (!query) return;

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
            );
            const data = await response.json();

            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                setClientLAT(parseFloat(lat));
                setClientLONG(parseFloat(lon));
            }
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Clear the previous debounce timeout if it exists
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        // Set a new debounce timeout
        const timeout = setTimeout(() => {
            searchLocation(query);  // Make the API call after the user has stopped typing
        }, 500);  // 500ms delay

        setDebounceTimeout(timeout);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                label="Nome"
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
                label="Ruolo"
                name="role"
                rules={[{ required: true, message: 'Please select the role!' }]}
            >
                <Select onChange={handleRoleChange}>
                    <Select.Option value="client">Client</Select.Option>
                    <Select.Option value="employee">Employee</Select.Option>
                    <Select.Option value="supervisor">Supervisor</Select.Option>
                    <Select.Option value="admin">Admin</Select.Option>
                </Select>
            </Form.Item>

            {userRole === 'client' && (
                <>
                    <Form.Item
                        label="Indirizzo"
                        rules={[{ required: true, message: 'Please input the address!' }]}
                    >
                        <Input
                            value={searchQuery}
                            onChange={handleAddressChange}  // Call handleAddressChange on input change
                        />
                    </Form.Item>

                    {(clientLAT !== null && clientLONG !== null) && (
                        <MapView startCoords={{ lat: clientLAT, lng: clientLONG }} />
                    )}
                </>
            )}

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Crea Utente
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UserForm;
