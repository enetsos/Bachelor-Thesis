// src/pages/AdminDashboard/Header.tsx

import React from 'react';
import { Layout, Typography } from 'antd';
import LogoutButton from '../../components/Logout';

const { Header: AntdHeader } = Layout;
const { Title } = Typography;

const Header: React.FC = () => {
    return (
        <AntdHeader style={{ background: '#309674', color: '#fff', padding: '0 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={3} style={{ color: '#fff', margin: 0 }}>Admin Dashboard</Title>
                <LogoutButton />
            </div>
        </AntdHeader>
    );
};

export default Header;
