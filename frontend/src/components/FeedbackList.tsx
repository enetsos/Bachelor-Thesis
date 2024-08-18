// src/components/Feedback/FeedbackList.tsx

import React, { useEffect, useRef } from 'react';
import { Table, Spin, Typography } from 'antd';
import { useFeedback } from '../context/FeedbackContext';
import { useAuth } from '../context/LoginContext';
import { FeedbackAttributes, User } from '../types';
const { Text } = Typography;

interface FeedbackListProps {
    role: string;
}

const FeedbackList: React.FC<FeedbackListProps> = ({ role }) => {
    const { feedbacks, loading, fetchFeedbacks, getFeedbackByClientId } = useFeedback();
    const isFetched = useRef(false);
    const { userId } = useAuth();

    useEffect(() => {
        if (isFetched.current) return;
        isFetched.current = true;

        const fetchFeedbacksData = async () => {
            if (role === 'client' && userId) {
                await getFeedbackByClientId(userId);
            } else {
                await fetchFeedbacks();
            }
        };

        fetchFeedbacksData();
    }, [fetchFeedbacks, getFeedbackByClientId, role, userId]);

    const columns = [
        {
            title: 'Nome cliente',
            dataIndex: 'client',
            key: 'clientName',
            render: (client: User | null) => <Text>{client?.name || 'Unknown'}</Text>,
            sorter: (a: FeedbackAttributes, b: FeedbackAttributes) => (a.client?.name || '').localeCompare(b.client?.name || ''),
        },
        {
            title: 'Messaggio',
            dataIndex: 'notes',
            key: 'notes',
            render: (text: string) => <Text>{text}</Text>,
        },
    ];

    return (
        <Spin spinning={loading}>
            <Table
                dataSource={feedbacks}
                columns={columns}
                rowKey="id"
                pagination={false}
            />
        </Spin>
    );
};

export default FeedbackList;
