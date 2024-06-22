// src/components/User/UserList.tsx

import React from 'react';
import { Table } from 'antd';
import { User } from '../../types';
import { useUser } from '../../context/UserContext';
import UserRow from './UserCard'; // Corrected import

const UserList: React.FC = () => {
    const { users, loading } = useUser();



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
        <Table
            loading={loading}
            dataSource={users}
            rowKey="id"
            columns={columns}
        />
    );
};

export default UserList;
