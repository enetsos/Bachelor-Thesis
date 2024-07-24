// src/pages/EmployeeDashboard/EmployeeDashboard.tsx

import React from 'react';
import { Layout, Row, Col, Card } from 'antd';
import Header from '../components/Header';
import QRCodeScanner from '../components/QrCodeScanner';

const { Content } = Layout;

const EmployeeDashboard: React.FC = () => {
    const handleScan = (data: string) => {
        console.log('Scanned data:', data);
        window.location.href = data;
    };

    const handleError = (err: any) => {
        console.error(err);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header title="Employee Dashboard" />
            <Content style={{ padding: '20px 50px' }}>
                <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                    <Col xs={24} md={24} style={{ textAlign: 'center' }}>
                        <QRCodeScanner onScan={handleScan} onError={handleError} />
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={24}>
                        <Card title="Your Performance" bordered={false}>
                            {/* Performance chart or content */}
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default EmployeeDashboard;
