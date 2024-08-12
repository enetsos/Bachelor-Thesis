// src/components/BaseDashboard.tsx

import React from 'react';
import { Layout, Row, Col, Card } from 'antd';
import Header from './Header';
import QRCodeScanner from './QrCodeScanner';
import ServiceList from './ServiceList';

const { Content } = Layout;

interface BaseDashboardProps {
    title: string;
    role: 'employee' | 'supervisor';
    children?: React.ReactNode;
}

const BaseDashboard: React.FC<BaseDashboardProps> = ({ title, role, children }) => {
    const handleScan = (data: string) => {
        console.log('Scanned data:', data);
        window.location.href = data;
    };

    const handleError = (err: any) => {
        console.error(err);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header title={title} />
            <Content style={{ padding: '20px 50px' }}>
                <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                    <Col xs={24} md={24} style={{ textAlign: 'center' }}>
                        <QRCodeScanner onScan={handleScan} onError={handleError} />
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={24}>
                        <Card title="I tuoi Servizi" bordered={false}>
                            <ServiceList role={role} />
                        </Card>
                    </Col>
                </Row>
                {children && (
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={24}>
                            {children}
                        </Col>
                    </Row>
                )}
            </Content>
        </Layout>
    );
};

export default BaseDashboard;
