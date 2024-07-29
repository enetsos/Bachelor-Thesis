import React, { useEffect, useRef, useState } from 'react';
import QRScanner from 'qr-scanner';
import { Modal, Button } from 'antd';
import QrScanner from 'qr-scanner';

interface QRCodeScannerProps {
    onScan: (data: string) => void;
    onError: (error: any) => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScan, onError }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [scanner, setScanner] = useState<QRScanner | null>(null);

    useEffect(() => {
        if (!isModalVisible || scanner) return;

        const initScanner = async () => {
            try {
                if (videoRef.current) {
                    const qrScanner = new QRScanner(
                        videoRef.current,
                        (result) => {
                            onScan(result.data);
                            setIsModalVisible(false);
                        },
                        {}
                    );
                    setScanner(qrScanner);
                    qrScanner.start();
                }
            } catch (err) {
                onError(err);
            }
        };

        initScanner();

        return () => {
            if (scanner) {
                (scanner as QrScanner).stop();
                setScanner(null);
            }
        };
    }, [isModalVisible, onScan, onError, scanner]);

    useEffect(() => {
        return () => {
            if (scanner) {
                scanner.stop();
            }
        };
    }, [scanner]);

    const handleCancel = () => {
        setIsModalVisible(false);
        if (scanner) {
            scanner.stop();
            setScanner(null);
        }
    };

    return (
        <>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
                Scan QR Code
            </Button>
            <Modal title="Scan QR Code" open={isModalVisible} onCancel={handleCancel} footer={null}>
                <video ref={videoRef} style={{ width: '100%' }} autoPlay />
            </Modal>
        </>
    );
};

export default QRCodeScanner;
