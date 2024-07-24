// src/components/BackArrow.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const BackArrow: React.FC = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
            style={{ fontSize: '16px', padding: '0 20px', color: '#fff' }}
        >
            Indietro
        </Button>
    );
};

export default BackArrow;
