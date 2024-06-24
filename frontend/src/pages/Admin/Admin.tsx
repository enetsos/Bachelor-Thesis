// src/pages/AdminDashboard/AdminDashboard.tsx

import React from 'react';
import { Layout, Row, Col, Card } from 'antd';
import Header from './Header';
import UserForm from '../../components/User/UserForm';
import UserList from '../../components/User/UserList';

const { Content } = Layout;

const AdminDashboard: React.FC = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header />
            <Content style={{ padding: '20px 50px' }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Card title="Create New User" bordered={false}>
                            <UserForm />
                        </Card>
                    </Col>
                    <Col xs={24} md={12}>
                        <Card title="Manage Users" bordered={false}>
                            <UserList />
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default AdminDashboard;
