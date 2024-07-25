// src/pages/AdminDashboard/Header.tsx

import React from 'react';
import { Layout, Typography } from 'antd';
import LogoutButton from './Logout';

const { Header: AntdHeader } = Layout;
const { Title } = Typography;

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <>
            <AntdHeader style={{ background: '#309674', color: '#fff', padding: '0 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title level={3} style={{ color: '#fff', margin: 0 }}>{title}</Title>
                    <LogoutButton />
                </div>
            </AntdHeader>
        </>
    );
};

export default Header;
