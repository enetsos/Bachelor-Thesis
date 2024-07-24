import React from 'react';
import { Card } from 'antd';
import QRCode from 'qrcode.react';

interface QRCodeDisplayProps {
    name: string;
    email: string;
}

const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ name, email }) => {
    const url = `${FRONTEND_URL}/employee/new-service?nome=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
    return (
        <Card title="User QR Code" style={{ width: 300, marginTop: 16 }}>
            <QRCode value={url} size={256} />
        </Card>
    );
};

export default QRCodeDisplay;