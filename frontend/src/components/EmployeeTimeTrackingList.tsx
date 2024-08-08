// src/components/EmployeeTimeTrackingList.tsx

import React, { useEffect, useState, useRef } from 'react';
import { Table, Spin, Typography, Tag, Card } from 'antd';
import { TimeTrackingAttributes, User } from '../types';
import { useTimeTracking } from '../context/TimeTrackingContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import MapView from './MapView'; // Import the MapView component

const { Text } = Typography;



// Define a type for possible status values
type Status = 'concluded' | 'inactive' | 'active';

const EmployeeTimeTrackingList: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [employees, setEmployees] = useState<User[]>([]);
    const [timeTrackingData, setTimeTrackingData] = useState<TimeTrackingAttributes[]>([]);
    const { fetchTimeTrackingByEmployee } = useTimeTracking();
    const { getByRole } = useUser();
    const isFetched = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (isFetched.current) return;
            isFetched.current = true;
            setLoading(true);
            try {
                // Fetch employees based on role
                const users = await getByRole('employee');
                setEmployees(users);

                // Fetch time tracking data for each employee
                const trackingData = await Promise.all(users.map(user => fetchTimeTrackingByEmployee(user.id)));
                setTimeTrackingData(trackingData.flat());
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [getByRole, fetchTimeTrackingByEmployee]);

    // Define status colors
    const statusColors: Record<Status, string> = {
        concluded: 'green',
        inactive: 'blue',
        active: 'orange',
    };

    const columns = [
        {
            title: 'Employee Name',
            dataIndex: 'employeeName',
            key: 'employeeName',
            render: (text: string) => <Text>{text}</Text>,
            sorter: (a: any, b: any) => a.employeeName.localeCompare(b.employeeName),
        },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
            render: (text: string) => <Text>{new Date(text).toLocaleString()}</Text>,
            sorter: (a: TimeTrackingAttributes, b: TimeTrackingAttributes) =>
                new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
        },
        {
            title: 'End Time',
            dataIndex: 'endTime',
            key: 'endTime',
            render: (text: string) => text ? <Text>{new Date(text).toLocaleString()}</Text> : 'In progress...',
            sorter: (a: TimeTrackingAttributes, b: TimeTrackingAttributes) =>
                (a.endTime ? new Date(a.endTime).getTime() : 0) - (b.endTime ? new Date(b.endTime).getTime() : 0),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: Status) => {
                const color = statusColors[status] || 'gray';
                return <Tag color={color}>{status}</Tag>;
            },
            sorter: (a: TimeTrackingAttributes, b: TimeTrackingAttributes) => a.status.localeCompare(b.status),
        },
        {
            title: 'Map',
            key: 'map',
            render: (record: TimeTrackingAttributes) => (
                <MapView
                    startCoords={
                        record.latStartTime && record.longStartTime
                            ? { lat: record.latStartTime, lng: record.longStartTime }
                            : undefined
                    }
                    endCoords={
                        record.latEndTime && record.longEndTime
                            ? { lat: record.latEndTime, lng: record.longEndTime }
                            : undefined
                    }
                />
            ),
        },
    ];

    return (
        <Card>
            <Spin spinning={loading}>
                <Table
                    dataSource={timeTrackingData.map(item => ({
                        ...item,
                        employeeName: employees.find(emp => emp.id === item.employeeId)?.name || 'Unknown',
                    }))}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                    onRow={(record) => ({
                        onClick: () => navigate(`/service?id=${record.id}`),
                        style: { cursor: 'pointer' },
                    })}
                />
            </Spin>
        </Card>
    );
};

export default EmployeeTimeTrackingList;
