import React, { useState, useEffect } from 'react';
import { Table, Select } from 'antd';
import { User } from '../../types';
import { useUser } from '../../context/UserContext';
import UserRow from './UserCard'; // Corrected import

const { Option } = Select;

const UserList: React.FC = () => {
    const { users, loading, getByRole } = useUser();
    const [selectedRole, setSelectedRole] = useState<string>('all');

    useEffect(() => {

        // Fetch users by selected role
        getByRole(selectedRole);

    }, [selectedRole, getByRole]);

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
                <UserRow
                    user={user}
                />
            ),
        },
    ];

    return (
        <div>
            <Select
                value={selectedRole}
                onChange={(value) => setSelectedRole(value)}
                style={{ width: 200, marginBottom: 16 }}
            >
                <Option value="all">All</Option>
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
