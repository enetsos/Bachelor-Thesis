// src/components/User/UserList.tsx

import React, { useState } from 'react';
import { Select, Spin } from 'antd';
import { useUser } from '../../context/UserContext';
import UserCard from './UserCard';

const { Option } = Select;

const UserList: React.FC = () => {
    const { users, loading, getByRole } = useUser();
    const [selectedRole, setSelectedRole] = useState<string>('admin');



    const handleRoleChange = (value: string) => {
        getByRole(value);
        setSelectedRole(value);
    };

    return (
        <div>
            <Select
                value={selectedRole}
                onChange={handleRoleChange}
                style={{ width: 200, marginBottom: 16 }}
            >
                <Option value="admin">Admin</Option>
                <Option value="employee">Employee</Option>
                <Option value="supervisor">Supervisor</Option>
                <Option value="client">Client</Option>
            </Select>
            {loading ? (
                <Spin />
            ) : (
                <div>
                    {users.map(user => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserList;
