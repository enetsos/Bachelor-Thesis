// src/components/CartPopup.tsx

import { Modal, List, Button, Typography } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { SupplyAttributes } from '../types';
import { useSupply } from '../context/SupplyContext';

const { Text } = Typography;

interface CartPopupProps {
    visible: boolean;
    onClose: () => void;
    cart: Record<string, number>;
    setCart: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

const CartPopup: React.FC<CartPopupProps> = ({ visible, onClose, cart, setCart }) => {
    const { supplies } = useSupply();

    const handleAddToCart = (supplyId: string) => {
        setCart(prevCart => ({
            ...prevCart,
            [supplyId]: (prevCart[supplyId] || 0) + 1,
        }));
    };

    const handleRemoveFromCart = (supplyId: string) => {
        setCart(prevCart => {
            const newCart = { ...prevCart };
            if (newCart[supplyId] > 1) {
                newCart[supplyId] -= 1;
            } else {
                delete newCart[supplyId];
            }
            return newCart;
        });
    };

    const handleConfirmPurchase = () => {
        console.log('Products confirmed:', cart);
        onClose();
    };

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="confirm" type="primary" onClick={handleConfirmPurchase}>
                    Conferma acquisto
                </Button>,
            ]}
            title="Supplies"
        >
            <List
                dataSource={supplies}
                renderItem={(item: SupplyAttributes) => (
                    <List.Item
                        actions={[
                            <Button icon={<MinusOutlined />} onClick={() => handleRemoveFromCart(item.id)} />,
                            <Text>{cart[item.id] || 0}</Text>,
                            <Button icon={<PlusOutlined />} onClick={() => handleAddToCart(item.id)} />,
                        ]}
                    >
                        <List.Item.Meta title={item.name} />
                    </List.Item>
                )}
            />
        </Modal>
    );
};

export default CartPopup;
