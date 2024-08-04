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
                    Cancel
                </Button>,
                <Button key="confirm" type="primary" onClick={onConfirm}>
                    Stop
                </Button>,
            ]}
            title="Confirm Stop"
        >
            <p>Please check your cart before stopping the service. Do you want to proceed?</p>
        </Modal>
    );
};

export default StopConfirmationModal;
