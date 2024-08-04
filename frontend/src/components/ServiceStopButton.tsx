import React from 'react';
import { Button } from 'antd';

interface StopButtonProps {
    handleStop: () => void;
    loading: boolean;
    isConcluded: boolean;
}

const StopButton: React.FC<StopButtonProps> = ({ handleStop, loading, isConcluded }) => {
    return (
        <Button
            type="default"
            onClick={handleStop}
            loading={loading}
            disabled={isConcluded}
        >
            Stop
        </Button>
    );
};

export default StopButton;
