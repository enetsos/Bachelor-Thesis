import React, { useEffect, useRef } from 'react';
import { Table, Spin, Typography } from 'antd';
import { useSupply } from '../context/SupplyContext';
import { SupplyAttributes } from '../types';

const { Text } = Typography;

const SupplyList: React.FC = () => {
    const { supplies, loading, fetchSupplies } = useSupply();
    const isFetched = useRef(false);

    useEffect(() => {
        if (isFetched.current) return;
        isFetched.current = true;
        fetchSupplies();
    }, [fetchSupplies]);

    // Define columns for the Ant Design table
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <Text>{text}</Text>,
            sorter: (a: SupplyAttributes, b: SupplyAttributes) => a.name.localeCompare(b.name),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: number | null) => price !== null ? <Text>{price.toFixed(2)}</Text> : 'N/A',
            sorter: (a: SupplyAttributes, b: SupplyAttributes) => (a.price || 0) - (b.price || 0),
        },
    ];

    return (
        <Spin spinning={loading}>
            <Table
                dataSource={supplies}
                columns={columns}
                rowKey="id"
                pagination={false}

            />
        </Spin>
    );
};

export default SupplyList;
