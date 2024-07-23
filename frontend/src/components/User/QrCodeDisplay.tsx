import React from 'react';
import { Card } from 'antd';
import QRCode from 'qrcode.react';

interface QRCodeDisplayProps {
    data: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ data }) => {
    return (
        <Card title="User QR Code" style={{ width: 300, marginTop: 16 }}>
            <QRCode value={data} size={256} />
        </Card>
    );
};

export default QRCodeDisplay;