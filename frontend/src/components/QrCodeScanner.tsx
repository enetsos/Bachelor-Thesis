import React, { useEffect, useRef, useState, useCallback } from 'react';
import QRScanner from 'qr-scanner';
import { Modal, Button } from 'antd';

interface QRCodeScannerProps {
    onScan: (data: string) => void;
    onError: (error: any) => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScan, onError }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [scanner, setScanner] = useState<QRScanner | null>(null);

    const stopScanning = useCallback(() => {
        if (scanner) {
            scanner.stop();
            setScanner(null);
        }
    }, [scanner]);

    useEffect(() => {
        const initScanner = async () => {
            try {
                if (videoRef.current) {
                    const qrScanner = new QRScanner(videoRef.current, (result) => {
                        onScan(result.data);
                        stopScanning();
                        setIsModalVisible(false);
                    }, {});
                    setScanner(qrScanner);
                    qrScanner.start();
                }
            } catch (err) {
                onError(err);
            }
        };

        if (isModalVisible) {
            initScanner();
        }

        return () => {
            stopScanning();
        };
    }, [isModalVisible, onScan, onError, stopScanning]);

    const handleCancel = () => {
        setIsModalVisible(false);
        stopScanning();
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
