import React, { useState, useEffect } from 'react';
import { Alert, Button } from 'antd';

const PrivacyDisclaimer: React.FC = () => {
    const [disclaimerAccepted, setDisclaimerAccepted] = useState<boolean>(false);

    useEffect(() => {
        // Check localStorage for disclaimer acceptance
        const accepted = localStorage.getItem('disclaimerAccepted');
        if (accepted === 'true') {
            setDisclaimerAccepted(true);
        }
    }, []);

    const handleAccept = () => {
        setDisclaimerAccepted(true);
        localStorage.setItem('disclaimerAccepted', 'true');
    };

    // If the disclaimer has been accepted, don't render anything
    if (disclaimerAccepted) {
        return null;
    }

    return (
        <Alert
            message="Privacy Disclaimer"
            description={
                <>
                    <p>
                        Questa applicazione richiede l'accesso alla tua fotocamera e alla tua posizione.
                        L'accesso alla posizione è necessario per rilevare la tua posizione al momento dell'inizio e della fine di un servizio, prevenendo frodi.
                        La posizione viene rilevata solo una volta per ogni servizio e non è tracciata costantemente.
                        L'accesso alla fotocamera è utilizzato solo per la scansione del codice QR.
                        Grazie per la tua comprensione.
                    </p>
                    <Button type="primary" onClick={handleAccept}>
                        Accetto
                    </Button>
                </>
            }
            type="info"
            showIcon
            style={{ marginBottom: '20px' }}
        />
    );
};

export default PrivacyDisclaimer;
