// src/components/Feedback/FeedbackList.tsx

import React, { useEffect, useRef } from 'react';
import { Table, Spin, Typography } from 'antd';
import { useFeedback } from '../context/FeedbackContext';
import { useAuth } from '../context/LoginContext';
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
