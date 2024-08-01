import React, { useEffect, useState, useRef } from 'react';
import { Table, Spin, Typography, Tag } from 'antd';
import { useTimeTracking } from '../context/TimeTrackingContext';
import { TimeTrackingAttributes } from '../types';
import { useAuth } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

interface PerformanceListProps {
    role: 'employee' | 'client';
}

// Define a type for possible status values
type Status = 'concluded' | 'inactive' | 'active';

const ServiceList: React.FC<PerformanceListProps> = ({ role }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [performanceData, setPerformanceData] = useState<TimeTrackingAttributes[]>([]);
    const { fetchTimeTrackingByEmployee, fetchTimeTrackingByClient } = useTimeTracking();
    const { userId } = useAuth();
    const isFetched = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                if (isFetched.current) return;
                isFetched.current = true;
                setLoading(true);
                try {
                    const trackingData = role === 'employee'
                        ? await fetchTimeTrackingByEmployee(userId)
                        : await fetchTimeTrackingByClient(userId);
                    setPerformanceData(trackingData);
                } catch (error) {
                    console.error('Error fetching performance data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [userId, role, fetchTimeTrackingByEmployee, fetchTimeTrackingByClient]);

    // Define status colors
    const statusColors: Record<Status, string> = {
        concluded: 'green',
        inactive: 'blue',
        active: 'orange',
    };

    const columns = [
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
            render: (text: string) => <Text>{new Date(text).toLocaleString()}</Text>,
            sorter: (a: TimeTrackingAttributes, b: TimeTrackingAttributes) =>
                new Date(a.startTime!).getTime() - new Date(b.startTime!).getTime(),
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
    ];

    const handleRowClick = (record: TimeTrackingAttributes) => {
        navigate(`/employee/service?id=${record.id}`);
    };

    return (
        <Spin spinning={loading}>
            <Table
                dataSource={performanceData}
                columns={columns}
                rowKey="id"
                pagination={false}
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                    style: { cursor: 'pointer' }, // Change cursor to pointer on row hover
                })}
            />
        </Spin>
    );
};

export default ServiceList;
