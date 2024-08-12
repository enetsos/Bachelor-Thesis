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
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <Text>{text}</Text>,
            sorter: (a: SupplyAttributes, b: SupplyAttributes) => a.name.localeCompare(b.name),
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
