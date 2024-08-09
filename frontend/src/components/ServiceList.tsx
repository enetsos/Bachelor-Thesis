import React, { useEffect, useState, useRef } from 'react';
import { Table, Spin, Typography, Tag, Card } from 'antd';
import { useTimeTracking } from '../context/TimeTrackingContext';
import { TimeTrackingAttributes, User } from '../types';
import { useAuth } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';
import MapView from '../components/MapView'; // Importa il componente MapView

const { Text } = Typography;

// Definisci un tipo per i possibili valori di stato
type Status = 'concluded' | 'inactive' | 'active';

interface ServiceListProps {
    role: 'employee' | 'supervisor';
}

const ServiceList: React.FC<ServiceListProps> = ({ role }) => {
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
                    const trackingData = role === 'employee' || 'supervisor'
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

    // Definisci i colori per lo stato
    const statusColors: Record<Status, string> = {
        concluded: 'green',
        inactive: 'blue',
        active: 'orange',
    };

    const columns = [
        {
            title: 'Client Name',
            dataIndex: 'client',
            key: 'clientName',
            render: (client: User | null) => <Text>{client?.name || 'Unknown'}</Text>,
            sorter: (a: TimeTrackingAttributes, b: TimeTrackingAttributes) => (a.client?.name || '').localeCompare(b.client?.name || ''),
        },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
            render: (text: Date) => <Text>{new Date(text).toLocaleString()}</Text>,
            sorter: (a: TimeTrackingAttributes, b: TimeTrackingAttributes) =>
                new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
            defaultSortOrder: 'descend' as 'ascend' | 'descend',
        },
        {
            title: 'End Time',
            dataIndex: 'endTime',
            key: 'endTime',
            render: (text: Date | undefined) => text ? <Text>{new Date(text).toLocaleString()}</Text> : 'In progress...',
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

    const handleRowClick = (record: TimeTrackingAttributes) => {
        navigate(`/service?id=${record.id}`);
    };

    return (
        <Card>
            <Spin spinning={loading}>
                <Table
                    dataSource={performanceData}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                    onRow={(record) => ({
                        onClick: () => handleRowClick(record),
                        style: { cursor: 'pointer' },
                    })}
                />
            </Spin>
        </Card>
    );
};

export default ServiceList;
