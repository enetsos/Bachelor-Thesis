// src/components/BackArrow.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Content } from 'antd/es/layout/layout';

const BackArrow: React.FC = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        console.log('Navigating back');
        navigate('/');
    };

    return (
        <Content style={{ position: 'relative' }} >
            <Button
                type="primary"
                shape="circle"
                icon={<ArrowLeftOutlined />}
                onClick={handleBack}
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    fontSize: '16px',
                    color: '#fff',
                    border: 'none',
                    zIndex: 1000,
                }}
            />
        </Content>
    );
};

export default BackArrow;
