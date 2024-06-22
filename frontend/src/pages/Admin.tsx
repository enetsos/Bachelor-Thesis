// src/pages/AdminDashboard.tsx

import React from 'react';
import { Layout, Card, Typography, Space } from 'antd';
import LogoutButton from '../components/Logout';
import UserForm from '../components/User/UserForm';
import UserList from '../components/User/UserList';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const AdminDashboard: React.FC = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ background: '#309674', color: '#fff', padding: '0 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Title level={3} style={{ color: '#fff', margin: 0 }}>Admin Dashboard</Title>
                    <LogoutButton />
                </div>
            </Header>
            <Content style={{ padding: '20px 50px' }}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Card title="Create New User" bordered={false}>
                        <UserForm />
                    </Card>
                    <Card title="Manage Users" bordered={false}>
                        <UserList />
                    </Card>
                </Space>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Admin Dashboard ©2023 Created by Your Company</Footer>
        </Layout>
    );
};

export default AdminDashboard;
