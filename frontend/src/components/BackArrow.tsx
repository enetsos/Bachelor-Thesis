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
        navigate(-1);
    };

    return (
        <Content style={{ position: 'relative', padding: '0 20px' }} >
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
                }}
            />
        </Content>
    );
};

export default BackArrow;
