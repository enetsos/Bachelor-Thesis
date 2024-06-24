import React, { useState, useEffect, useCallback } from 'react';
import { Table, Select } from 'antd';
import { User } from '../../types';
import { useUser } from '../../context/UserContext';
import UserCard from './UserCard';

const { Option } = Select;

const UserList: React.FC = () => {
    const { users, loading, getByRole } = useUser();
    const [selectedRole, setSelectedRole] = useState<string>('admin');

    const handleOnChange = (value: string) => {
        setSelectedRole(value);
        getByRole(value);
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_text: any, user: User) => (
                <UserCard user={user} />
            ),
        },
    ];

    return (
        <div>
            <Select
                value={selectedRole}
                onChange={handleOnChange}
                style={{ width: 200, marginBottom: 16 }}
            >
                <Option value="admin">Admin</Option>
                <Option value="employee">Employee</Option>
                <Option value="supervisor">Supervisor</Option>
                <Option value="client">Client</Option>
            </Select>
            <Table
                loading={loading}
                dataSource={users}
                rowKey="id"
                columns={columns}
            />
        </div>
    );
};

export default UserList;
