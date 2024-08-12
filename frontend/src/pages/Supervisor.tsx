// src/pages/SupervisorDashboard/SupervisorDashboard.tsx

import React from 'react';
import BaseDashboard from '../components/BaseDashboard';
import EmployeeTimeTrackingList from '../components/EmployeeTimeTrackingList';
import FeedbackList from '../components/FeedbackList';
import { Row, Col, Card } from 'antd';


const SupervisorDashboard: React.FC = () => {
    return (
        <BaseDashboard title="Supervisor Dashboard" role="supervisor">
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12} lg={24}>
                    <Card title="Servizi dei lavoratori" bordered={false}>
                        <EmployeeTimeTrackingList />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={24}>
                    <Card title="Feedbacks" bordered={false}>
                        <FeedbackList role="supervisor" />
                    </Card>
                </Col>
            </Row>
        </BaseDashboard>
    );
};

export default SupervisorDashboard;
