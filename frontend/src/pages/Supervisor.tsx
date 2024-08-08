// src/pages/SupervisorDashboard/SupervisorDashboard.tsx

import React from 'react';
import { Layout, Row, Col, Card } from 'antd';
import Header from '../components/Header';
import EmployeeTimeTrackingList from '../components/EmployeeTimeTrackingList';
import FeedbackList from '../components/FeedbackList';

const { Content } = Layout;

const SupervisorDashboard: React.FC = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header title="Supervisor Dashboard" />
            <Content style={{ padding: '20px', background: '#fff' }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={12} lg={24}>
                        <Card title="Employee Time Tracking" bordered={false}>
                            <EmployeeTimeTrackingList />
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={24}>
                        <Card title="Feedbacks" bordered={false}>
                            <FeedbackList role="supervisor" />
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default SupervisorDashboard;
