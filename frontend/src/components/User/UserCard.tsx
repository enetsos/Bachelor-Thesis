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
            message.success('Utente aggiornato con successo');
            setEditing(false);
        } catch (error) {
            console.error('Error updating user:', error);
            message.error('Utente non aggiornato');
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
            message.success('Utente eliminato con successo');
        } catch (error) {
            console.error('Error deleting user:', error);
            message.error('Utente non eliminato');
        }
    };

    const handleChange = (key: keyof Partial<User>, value: any) => {
        setEditedUser(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const { name, email, role } = editedUser;



    // Solo i clienti possono visualizzare il QR code
    const canShowQRCode = user.role === 'client';

    return (
        <Card style={{ width: 300 }} bordered={true}>
            <div>
                <strong>Nome: </strong>
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
                <strong>Ruolo: </strong>
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
                        <Button type="primary" onClick={handleSave}>Salva</Button>
                        <Button onClick={handleCancel}>Cancella</Button>
                    </>
                ) : (
                    <>
                        <Button type="primary" onClick={handleEdit}>Modifica</Button>
                        <Popconfirm
                            title="Sei sicuro di eliminare l'utente?"
                            onConfirm={handleDelete}
                            okText="Si"
                            cancelText="No"
                        >
                            <Button danger>Elimina</Button>
                        </Popconfirm>
                        {canShowQRCode && (
                            <Button style={{ marginLeft: 8 }} onClick={() => setShowQRCode(prev => !prev)}>
                                {showQRCode ? 'Mostra QR Code' : 'Nascondi QR Code'}
                            </Button>
                        )}
                    </>
                )}
            </Space>
            {showQRCode && canShowQRCode && <QRCodeDisplay name={user.name} email={user.email} id={user.id} />} {/* Mostra il QR code solo per i clienti */}
        </Card>
    );
};

export default UserCard;
