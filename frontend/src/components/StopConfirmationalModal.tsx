// src/components/StopConfirmationModal.tsx

import React from 'react';
import { Modal, Button } from 'antd';

interface StopConfirmationModalProps {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const StopConfirmationModal: React.FC<StopConfirmationModalProps> = ({ visible, onConfirm, onCancel }) => {
    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancella
                </Button>,
                <Button key="confirm" type="primary" onClick={onConfirm}>
                    Stop
                </Button>,
            ]}
            title="Conferma Stop"
        >
            <p>Controlla il carrello prima di procedere. Vuoi continuare?</p>
        </Modal>
    );
};

export default StopConfirmationModal;
