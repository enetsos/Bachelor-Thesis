import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Form, Input, Button, Space } from 'antd';
import { useLocation } from 'react-router-dom';
import { useTimeTracking } from '../context/TimeTrackingContext';
import { useAuth } from '../context/LoginContext'; // Assuming there is an Auth context
import Header from '../components/Header';
import BackArrow from '../components/BackArrow';
import { TimeTrackingAttributes } from '../types';

const { Content } = Layout;

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const NewService: React.FC = () => {
    const [submissionTime, setSubmissionTime] = useState<string | null>(null);
    const { createTimeTracking } = useTimeTracking();
    const { userId } = useAuth(); // Assuming there's a user object in Auth context
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const query = useQuery();

    useEffect(() => {
        // Initialize form fields with query parameters on component mount
        const nome = query.get('nome') || '';
        const email = query.get('email') || '';
        const clientId = query.get('id') || '';
        form.setFieldsValue({ nome, email, clientId });
    }, [query, form]);

    const handleSubmit = (values: any) => {
        const now = new Date();
        setSubmissionTime(now.toLocaleTimeString());
        setLoading(true);
        try {
            const timeTrackingData: Partial<TimeTrackingAttributes> = {
                employeeId: userId || '',
                clientId: values.clientId || '',
                startTime: now,
                status: 'active', // Change this to 'active' if that's the required status
            };
            createTimeTracking(timeTrackingData);
            form.resetFields();
        } catch (error) {
            console.log('Error creating time tracking:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header title="New Service" />
            <BackArrow />
            <Content style={{ padding: '20px 50px', position: 'relative' }}>
                {submissionTime && (
                    <div style={{ position: 'absolute', top: 20, right: 50, fontSize: '18px' }}>
                        Form submitted at: {submissionTime}
                    </div>
                )}
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12} offset={6}>
                        <Card title="New Service Form" bordered={false}>
                            <Form form={form} onFinish={handleSubmit}>
                                <Form.Item
                                    label="Nome"
                                    name="nome"
                                    rules={[{ required: true, message: 'Per favore inserisci il nome' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[{ required: true, message: 'Per favore inserisci l\'email' }, { type: 'email', message: 'Per favore inserisci un\'email valida' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Client ID"
                                    name="clientId"
                                    hidden
                                    rules={[{ required: true, message: 'Client ID is required' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item>
                                    <Space>
                                        <Button type="primary" htmlType="submit" loading={loading}>
                                            Start!
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default NewService;
