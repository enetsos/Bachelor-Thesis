// src/pages/AdminDashboard/AdminDashboard.tsx

import React from 'react';
import { Layout, Row, Col, Card } from 'antd';
import Header from '../components/Header';
import UserForm from '../components/User/UserForm';
import UserList from '../components/User/UserList';
import SupplyForm from '../components/SupplyForm';
import { SupplyProvider } from '../context/SupplyContext';
import SupplyList from '../components/SupplyList';

const { Content } = Layout;

const AdminDashboard: React.FC = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header title="Admin Dashboard" />
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
                    <Col xs={24} md={12}>
                        <SupplyProvider>
                            <Card title="Create New Supply" bordered={false}>
                                <SupplyForm />
                            </Card>
                        </SupplyProvider>
                    </Col>
                    <Col xs={24} md={12}>
                        <Card title="Manage Supplies" bordered={false}>
                            <SupplyList />
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default AdminDashboard;
