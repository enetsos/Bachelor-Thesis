// src/components/Feedback/FeedbackForm.tsx

import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useFeedback } from '../context/FeedbackContext';
import { useAuth } from '../context/LoginContext'; // Assumi che ci sia un LoginContext per l'autenticazione
import { FeedbackAttributes } from '../types';

const FeedbackForm: React.FC = () => {
    const [form] = Form.useForm();
    const { createFeedback } = useFeedback();
    const { userId } = useAuth(); // Assumi che userId sia l'ID del client loggato
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = async (values: Partial<FeedbackAttributes>) => {
        setLoading(true);
        try {
            const feedbackData: Partial<FeedbackAttributes> = {
                ...values,
                clientId: userId || '', // Associa l'ID del client al feedback
            };
            await createFeedback(feedbackData);
            form.resetFields();
        } catch (error) {
            console.error('Error creating feedback:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ clientId: userId }} // Pre-popola clientId dal contesto di autenticazione
        >
            <Form.Item
                label="Message"
                name="notes"
                rules={[{ required: true, message: 'Please input the feedback message!' }]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item
                name="clientId"
                hidden
                rules={[{ required: true, message: 'Client ID is required' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Create Feedback
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FeedbackForm;
