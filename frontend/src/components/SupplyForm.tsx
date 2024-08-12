// src/components/Supply/SupplyForm.tsx

import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useSupply } from '../context/SupplyContext';
import { SupplyAttributes } from '../types';

const SupplyForm: React.FC = () => {
    const [form] = Form.useForm();
    const { createSupply } = useSupply();
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = async (values: Partial<SupplyAttributes>) => {
        setLoading(true);
        try {
            await createSupply(values);
            form.resetFields();
        } catch (error) {
            console.error('Error creating supply:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                label="Nome"
                name="name"
                rules={[{ required: true, message: 'Inserisci il nome!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Crea Fornitura
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SupplyForm;
