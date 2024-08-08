// src/pages/ClientDashboard/ClientDashboard.tsx

import React from 'react';
import { Layout, Row, Col, Card } from 'antd';
import Header from '../components/Header';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';

const { Content } = Layout;

const ClientDashboard: React.FC = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header title="Client Dashboard" />
            <Content style={{ padding: '20px', background: '#fff' }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12} lg={12}>
                        <Card title="Create New Feedback" bordered={false}>
                            <FeedbackForm />
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12}>
                        <Card title="Your Feedbacks" bordered={false}>
                            <FeedbackList role='client' />
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default ClientDashboard;
