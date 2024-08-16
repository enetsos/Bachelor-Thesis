import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Form, Input, Button, Space, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTimeTracking } from '../context/TimeTrackingContext';
import { useAuth } from '../context/LoginContext';
import Header from '../components/Header';
import BackArrow from '../components/BackArrow';
import PrivacyDisclaimer from '../components/PrivacyDisclaimer';
import { TimeTrackingAttributes } from '../types';
import { getCoordinates } from '../utils/getCoordinates'; // Assuming this handles geolocation

const { Content } = Layout;

const useQuery = () => new URLSearchParams(useLocation().search);

const NewService: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { createTimeTracking } = useTimeTracking();
    const { userId } = useAuth();
    const [form] = Form.useForm();
    const query = useQuery();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const nome = query.get('nome') || '';
        const email = query.get('email') || '';
        const clientId = query.get('id') || '';
        form.setFieldsValue({ nome, email, clientId });
    }, [query, form]);

    const handleStart = async (values: any) => {
        setLoading(true);
        setErrorMessage(null);
        try {
            const position = await getCoordinates();
            const { latitude, longitude } = position.coords;
            const now = new Date();

            const timeTrackingData: Partial<TimeTrackingAttributes> = {
                employeeId: userId || '',
                clientId: values.clientId || '',
                startTime: now,
                status: 'active',
                latStartTime: latitude,
                longStartTime: longitude,
            };

            const newTimeTracking = await createTimeTracking(timeTrackingData);
            form.resetFields();
            navigate(`/service?id=${newTimeTracking.id}`);
        } catch (error: any) {
            if (error.code === error.PERMISSION_DENIED) {
                setErrorMessage('Permessi di localizzazione negati. Per favore abilita la localizzazione.');
            } else {
                setErrorMessage('Posizione non disponibile. Per favore riprova.');
            }
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header title="Nuovo Servizio" />
            <BackArrow />
            <Content style={{ padding: '20px 50px', position: 'relative' }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12} offset={6}>
                        <Card title="Crea nuovo Servizio" bordered={false}>
                            <Form form={form} onFinish={handleStart}>
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
                                    rules={[
                                        { required: true, message: "Per favore inserisci l'email" },
                                        { type: 'email', message: "Per favore inserisci un'email valida" }
                                    ]}
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
                <PrivacyDisclaimer />
            </Content>
        </Layout>
    );
};

export default NewService;
