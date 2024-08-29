import React, { useEffect, useState, useRef } from 'react';
import { Layout, Row, Col, Card, Button, Modal, Input, Form, List } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTimeTracking } from '../context/TimeTrackingContext';
import Header from '../components/Header';
import BackArrow from '../components/BackArrow';
import { TimeTrackingAttributes, TimeTrackingSupplyAttributes } from '../types';
import ServiceInfo from '../components/ServiceInfo';
import ClientInfo from '../components/ServiceClientInfo';
import StopButton from '../components/ServiceStopButton';
import CartPopup from '../components/CartPopup';
import StopConfirmationModal from '../components/StopConfirmationalModal';
import PrivacyDisclaimer from '../components/PrivacyDisclaimer';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { getCoordinates } from '../utils/getCoordinates';
import { useSupply } from '../context/SupplyContext';

const { Content } = Layout;
const { TextArea } = Input;

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const ServiceEmployee: React.FC = () => {
    const [timeTracking, setTimeTracking] = useState<TimeTrackingAttributes | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { getTimeTrackingById, updateTimeTracking, addSuppliesToTimeTracking } = useTimeTracking();
    const { supplies } = useSupply();
    const query = useQuery();
    const navigate = useNavigate();
    const serviceId = query.get('id') || '';
    const isFetched = useRef(false);

    const [cartVisible, setCartVisible] = useState<boolean>(false);
    const [confirmPurchaseVisible, setConfirmPurchaseVisible] = useState<boolean>(false);
    const [cart, setCart] = useState<Record<string, number>>({});
    const [stopConfirmationVisible, setStopConfirmationVisible] = useState<boolean>(false);
    const [notes, setNotes] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            if (isFetched.current) return;
            isFetched.current = true;
            setLoading(true);
            try {
                const timeTrackingData = await getTimeTrackingById(serviceId);
                setTimeTracking(timeTrackingData);
            } catch (error) {
                console.log('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (serviceId) {
            fetchData();
        }
    }, [serviceId, getTimeTrackingById]);

    const handleStop = async () => {
        setStopConfirmationVisible(false);
        if (serviceId && timeTracking?.status !== 'concluded' && timeTracking?.id) {
            setLoading(true);
            const now = new Date();

            try {
                const position = await getCoordinates();
                const { latitude, longitude } = position.coords;

                const suppliesData: TimeTrackingSupplyAttributes[] = Object.keys(cart).map(supplyId => ({
                    supplyId: supplyId,
                    quantity: cart[supplyId]
                }));

                const updatedTimeTracking = await updateTimeTracking(timeTracking.id, {
                    endTime: now,
                    status: 'concluded',
                    latEndTime: latitude,
                    longEndTime: longitude,
                    notes: notes,
                });
                setTimeTracking(updatedTimeTracking);

                await addSuppliesToTimeTracking(timeTracking.id, suppliesData);
                window.location.reload();
            } catch (error) {
                console.log('Error stopping time tracking:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleStopConfirmationClose = () => {
        setStopConfirmationVisible(false);
    };

    const handleStopButtonClick = () => {
        setStopConfirmationVisible(true);
    };

    const handleConfirmPurchaseClose = () => {
        setConfirmPurchaseVisible(false);
    };

    const getSupplyName = (id: string) => {
        const supply = supplies.find(s => s.id === id);
        return supply ? supply.name : 'Unknown';
    };

    if (!serviceId) {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Header title="Service" />
                <BackArrow />
                <Content style={{ padding: '20px', maxWidth: '100%', margin: '0 auto' }}>
                    <Row justify="center">
                        <Col xs={24} sm={20} md={16} lg={12} xl={12}>
                            <Card title="Error" bordered={false}>
                                <p>Service ID is required to fetch service details.</p>
                                <Button onClick={() => navigate(-1)}>Go Back</Button>
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header title="Service Details" />
            <BackArrow />
            <Content style={{ padding: '20px', maxWidth: '100%' }}>
                {timeTracking?.status === 'active' && (
                    <>
                        <Button
                            icon={<ShoppingCartOutlined />}
                            style={{ position: 'absolute', top: '100px', right: '50px', zIndex: 1000 }}
                            onClick={() => setCartVisible(true)}
                        />
                        <CartPopup
                            visible={cartVisible}
                            onClose={() => setCartVisible(false)}
                            cart={cart}
                            setCart={setCart}
                            supplies={supplies}
                        />

                        <Row justify="center" gutter={[16, 16]}>
                            <Col xs={24} sm={20} md={16} lg={12} xl={12}>
                                <Card title="Informazioni sul Servizio" bordered={false}>
                                    {timeTracking ? (
                                        <>
                                            <ClientInfo client={timeTracking.client} />
                                            <ServiceInfo timeTracking={timeTracking} />
                                            <Form layout="vertical">
                                                <Form.Item label="Note">
                                                    <TextArea
                                                        rows={4}
                                                        value={notes}
                                                        onChange={e => setNotes(e.target.value)}
                                                    />
                                                </Form.Item>
                                            </Form>
                                            <StopButton
                                                handleStop={handleStopButtonClick}
                                                loading={loading}
                                                isConcluded={timeTracking.status !== 'active'}
                                            />
                                        </>
                                    ) : (
                                        <p>Loading service data...</p>
                                    )}
                                </Card>
                            </Col>
                        </Row>
                        <Row justify="center" gutter={[16, 16]} style={{ marginTop: '70px' }}>
                            <Col xs={24} sm={20} md={16} lg={12} xl={12}>
                                <Card title="Carrello" bordered={false}>
                                    <List
                                        dataSource={Object.keys(cart)}
                                        renderItem={supplyId => (
                                            <List.Item>
                                                {getSupplyName(supplyId)}
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </>
                )}

                {timeTracking?.status === 'concluded' && (
                    <>
                        <Row justify="center" gutter={[16, 16]}>
                            <Col xs={24} sm={20} md={16} lg={12} xl={12}>
                                <Card title="Informazioni sul Servizio" bordered={false}>
                                    {timeTracking ? (
                                        <>
                                            <ClientInfo client={timeTracking.client} />
                                            <ServiceInfo timeTracking={timeTracking} />
                                        </>
                                    ) : (
                                        <p>Loading service data...</p>
                                    )}
                                </Card>
                            </Col>
                        </Row>
                        <Row justify="center" gutter={[16, 16]} style={{ marginTop: '70px' }}>
                            <Col xs={24} sm={20} md={16} lg={12} xl={12}>
                                <Card title="Carrello" bordered={false}>
                                    <List
                                        dataSource={timeTracking.supplies}
                                        renderItem={supply => (
                                            <List.Item>
                                                {supply.name}
                                            </List.Item>
                                        )}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </>
                )}
                <StopConfirmationModal
                    visible={stopConfirmationVisible}
                    onConfirm={handleStop}
                    onCancel={handleStopConfirmationClose}
                />
                {confirmPurchaseVisible && (
                    <Modal
                        open={confirmPurchaseVisible}
                        onCancel={handleConfirmPurchaseClose}
                        footer={[
                            <Button key="confirm" type="primary" onClick={handleConfirmPurchaseClose}>
                                Conferma Acquisto
                            </Button>,
                        ]}
                        title="Conferma Acquisto"
                    >
                        <p>Conferma Acquisto</p>
                    </Modal>
                )}
            </Content>
            <PrivacyDisclaimer />
        </Layout>
    );
};

export default ServiceEmployee;
