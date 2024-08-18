import React, { useEffect, useRef, useState } from 'react';
import QRScanner from 'qr-scanner';
import { Modal, Button, Alert, notification } from 'antd';

interface QRCodeScannerProps {
    onScan: (data: string) => void;
    onError: (error: any) => void;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScan, onError }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [scanner, setScanner] = useState<QRScanner | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Check for camera availability and permissions
    const checkCameraAvailability = async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            if (videoDevices.length === 0) {
                throw new Error('Camera non trovata');
            }
        } catch (err) {
            throw new Error('Accesso alla fotocamera negato');
        }
    };

    const checkCameraPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop());
        } catch (err) {
            throw new Error('Accesso alla fotocamera negato. Per favore abilita la fotocamera.');
        }
    };

    useEffect(() => {
        if (!isModalVisible || scanner) return;

        const initScanner = async () => {
            try {
                await checkCameraPermission();
                await checkCameraAvailability();

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
            } catch (err: any) {
                setErrorMessage(err.message);
                onError(err);
                notification.destroy();
                notification.error({
                    message: 'Errore',
                    description: errorMessage,
                });
            }
        };

        initScanner();


    }, [isModalVisible, onScan, onError, scanner, errorMessage]);

    useEffect(() => {
        return () => {
            if (scanner) {
                scanner.stop();
            }
        };
    }, [scanner]);

    const handleCancel = () => {
        setIsModalVisible(false);
        setErrorMessage(null);
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
                {errorMessage ? (
                    <Alert
                        message="Error"
                        description={errorMessage}
                        type="error"
                        showIcon
                    />
                ) : (
                    <video ref={videoRef} style={{ width: '100%' }} autoPlay />
                )}
            </Modal>
        </>
    );
};

export default QRCodeScanner;
