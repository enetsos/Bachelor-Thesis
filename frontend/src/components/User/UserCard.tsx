// src/components/User/UserCard.tsx

import React, { useState } from 'react';
import { Card, Button, Space, Input, Select, Popconfirm, message } from 'antd';
import { User } from '../../types';
import { useUser } from '../../context/UserContext';
import QRCodeDisplay from './QrCodeDisplay'; // Importa il nuovo componente

interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const { updateUser, deleteUser } = useUser();
    const [editing, setEditing] = useState<boolean>(false);
    const [showQRCode, setShowQRCode] = useState<boolean>(false); // Stato per gestire la visibilità del QR code
    const [editedUser, setEditedUser] = useState<Partial<User>>({
        name: user.name,
        email: user.email,
        role: user.role,
    });

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = async () => {
        try {
            await updateUser(user.id, editedUser);
            message.success('User updated successfully');
            setEditing(false);
        } catch (error) {
            console.error('Error updating user:', error);
            message.error('Failed to update user');
        }
    };

    const handleCancel = () => {
        setEditing(false);
        setEditedUser({
            name: user.name,
            email: user.email,
            role: user.role,
        });
    };

    const handleDelete = async () => {
        try {
            await deleteUser(user.id);
            message.success('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
            message.error('Failed to delete user');
        }
    };

    const handleChange = (key: keyof Partial<User>, value: any) => {
        setEditedUser(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const { name, email, role } = editedUser;

    // Genera una stringa di dati per il QR code
    const qrData = JSON.stringify({
        name: user.name,
        email: user.email,
        role: user.role,
    });

    return (
        <Card style={{ width: 300 }} bordered={true}>
            <div>
                <strong>Name: </strong>
                {editing ? (
                    <Input value={name} onChange={(e) => handleChange('name', e.target.value)} />
                ) : (
                    user.name
                )}
            </div>
            <div>
                <strong>Email: </strong>
                {editing ? (
                    <Input value={email} onChange={(e) => handleChange('email', e.target.value)} />
                ) : (
                    user.email
                )}
            </div>
            <div>
                <strong>Role: </strong>
                {editing ? (
                    <Select value={role} onChange={(value) => handleChange('role', value)}>
                        <Select.Option value="client">Client</Select.Option>
                        <Select.Option value="employee">Employee</Select.Option>
                        <Select.Option value="supervisor">Supervisor</Select.Option>
                        <Select.Option value="admin">Admin</Select.Option>
                    </Select>
                ) : (
                    user.role
                )}
            </div>
            <Space style={{ marginTop: 16 }}>
                {editing ? (
                    <>
                        <Button type="primary" onClick={handleSave}>Save</Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </>
                ) : (
                    <>
                        <Button type="primary" onClick={handleEdit}>Edit</Button>
                        <Popconfirm
                            title="Are you sure delete this user?"
                            onConfirm={handleDelete}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>
                        <Button style={{ marginLeft: 8 }} onClick={() => setShowQRCode(prev => !prev)}>
                            {showQRCode ? 'Hide QR Code' : 'Show QR Code'}
                        </Button>
                    </>
                )}
            </Space>
            {showQRCode && <QRCodeDisplay data={qrData} />} {/* Mostra il QR code se abilitato */}
        </Card>
    );
};

export default UserCard;
