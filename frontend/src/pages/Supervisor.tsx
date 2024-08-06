// src/pages/SupervisorDashboard/SupervisorDashboard.tsx

import React from 'react';
import { Card } from 'antd';
import BaseDashboard from '../components/BaseDashboard';

const SupervisorDashboard: React.FC = () => {
    return (
        <BaseDashboard title="Supervisor Dashboard" role="supervisor">

            <Card title="Supervisor Controls" bordered={false} style={{ marginTop: '20px' }}>
            </Card>
        </BaseDashboard>
    );
};

export default SupervisorDashboard;
