import React from 'react';
import { Card, Typography } from 'antd';
import { TimeTrackingAttributes } from '../types';

const { Text } = Typography;

interface PerformanceItemProps {
    item: TimeTrackingAttributes;
}

const ServiceItem: React.FC<PerformanceItemProps> = ({ item }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'concluded':
                return 'green';
            case 'in-progress':
                return 'blue';
            case 'pending':
                return 'orange';
            default:
                return 'gray';
        }
    };

    return (
        <Card style={{ marginBottom: '16px', border: '1px solid #e8e8e8', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Text strong>{new Date(item.startTime!).toLocaleString()}</Text>
                    <br />
                    <Text>Status: <span style={{ color: getStatusColor(item.status) }}>{item.status}</span></Text>
                    <br />
                    {item.endTime && (
                        <Text>End Time: {new Date(item.endTime).toLocaleString()}</Text>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default ServiceItem;
