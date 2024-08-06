// src/pages/SupervisorDashboard/SupervisorDashboard.tsx

import React from 'react';
import BaseDashboard from '../components/BaseDashboard';
import EmployeeTimeTrackingList from '../components/EmployeeTimeTrackingList';

const SupervisorDashboard: React.FC = () => {
    return (
        <BaseDashboard title="Supervisor Dashboard" role="supervisor">
            <EmployeeTimeTrackingList title="Employee Time Tracking" />
        </BaseDashboard>
    );
};

export default SupervisorDashboard;
