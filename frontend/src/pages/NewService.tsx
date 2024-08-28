import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Form, Input, Button, Space, notification } from 'antd';
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

    useEffect(() => {
        const nome = query.get('nome') || '';
        const email = query.get('email') || '';
        const clientId = query.get('id') || '';
        form.setFieldsValue({ nome, email, clientId });
    }, [query, form]);

    const handleStart = async (values: any) => {
        setLoading(true);
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
            let messageToDisplay = 'Posizione non disponibile. Per favore riprova.';

            if (error.code === 'ERR_BAD_REQUEST') {
                messageToDisplay = 'La posizione di partenza non è entro 500 metri dalla posizione del cliente.';
            } else if (error.code === error.PERMISSION_DENIED) {
                messageToDisplay = 'Permessi di localizzazione negati. Per favore abilita la localizzazione.';
            }

            notification.error({
                message: 'Errore',
                description: messageToDisplay,
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header title="Nuovo Servizio" />
            <BackArrow />
            <Content style={{ padding: '20px', maxWidth: '100%', margin: '0 auto' }}>
                <Row justify="center" style={{ margin: 0 }}>
                    <Col xs={24} sm={20} md={16} lg={12}>
                        <Card title="Crea nuovo Servizio" bordered={false}>
                            <Form form={form} onFinish={handleStart} layout="vertical">
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
