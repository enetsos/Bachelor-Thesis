import React, { useRef } from 'react';
import { Card, Button } from 'antd';
import QRCode from 'qrcode.react';

interface QRCodeDisplayProps {
    name: string;
    email: string;
    id: string;
}

const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ name, email, id }) => {
    const qrRef = useRef<HTMLDivElement | null>(null);

    const url = `${FRONTEND_URL}/new-service?nome=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&id=${encodeURIComponent(id)}`;

    const downloadQRCode = () => {
        const canvas = qrRef.current?.querySelector('canvas');
        if (canvas) {
            const url = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = url;
            a.download = 'qr-code.png';
            a.click();
        }
    };

    return (
        <Card title="User QR Code" style={{ width: 300, marginTop: 16 }}>
            <div ref={qrRef}>
                <QRCode value={url} size={256} renderAs="canvas" />
            </div>
            <Button type="primary" style={{ marginTop: 16 }} onClick={downloadQRCode}>
                Download QR Code
            </Button>
        </Card>
    );
};

export default QRCodeDisplay;
