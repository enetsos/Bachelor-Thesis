// src/components/PrivacyDisclaimer.tsx

import React from 'react';
import { Alert } from 'antd';

const PrivacyDisclaimer: React.FC = () => {
    return (
        <Alert
            message="Privacy Disclaimer"
            description="Questa applicazione richiede l'accesso alla tua fotocamera e alla tua posizione. L'accesso alla posizione è necessario per rilevare la tua posizione al momento dell'inizio e della fine di un servizio, prevenendo frodi. La posizione viene rilevata solo una volta per ogni servizio e non è tracciata costantemente. L'accesso alla fotocamera è utilizzato solo per la scansione del codice QR. Grazie per la tua comprensione."
            type="info"
            showIcon
            style={{ marginBottom: '20px' }}
        />
    );
};

export default PrivacyDisclaimer;
