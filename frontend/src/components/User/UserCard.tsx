// src/components/User/UserRow.tsx

import React, { useState } from 'react';
import { Button, Space, Input, Select, Popconfirm, message } from 'antd';
import { User } from '../../types';
import { useUser } from '../../context/UserContext';

interface UserRowProps {
    user: User;
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
    const { updateUser, deleteUser } = useUser();
    const [editing, setEditing] = useState<boolean>(false);
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
        // Reset editedUser state if needed
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

    return (
        <tr>
            <td>
                {editing ? (
                    <Input value={name} onChange={(e) => handleChange('name', e.target.value)} />
                ) : (
                    user.name
                )}
            </td>
            <td>
                {editing ? (
                    <Input value={email} onChange={(e) => handleChange('email', e.target.value)} />
                ) : (
                    user.email
                )}
            </td>
            <td>
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
            </td>
            <td>
                <Space>
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
                        </>
                    )}
                </Space>
            </td>
        </tr>
    );
};

export default UserRow;
