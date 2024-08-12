import { Modal, List, Button, Typography } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { SupplyAttributes } from '../types';

const { Text } = Typography;

interface CartPopupProps {
    visible: boolean;
    onClose: () => void;
    cart: Record<string, number>;
    setCart: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    supplies: SupplyAttributes[]; // Add supplies prop for getting supply details
}

const CartPopup: React.FC<CartPopupProps> = ({ visible, onClose, cart, setCart, supplies }) => {

    const handleAddToCart = (supplyId: string) => {
        setCart(prevCart => ({
            ...prevCart,
            [supplyId]: (prevCart[supplyId] || 0) + 1, // Increment quantity if item already exists
        }));
    };

    const handleRemoveFromCart = (supplyId: string) => {
        setCart(prevCart => {
            const newCart = { ...prevCart };
            if (newCart[supplyId]) {
                if (newCart[supplyId] > 1) {
                    newCart[supplyId] -= 1; // Decrement quantity if more than 1
                } else {
                    delete newCart[supplyId]; // Remove item if quantity is 1
                }
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
            title="Forniture"
        >
            <List
                dataSource={supplies}
                renderItem={(item: SupplyAttributes) => (
                    <List.Item
                        actions={[
                            <Button
                                icon={<MinusOutlined />}
                                onClick={() => handleRemoveFromCart(item.id)}
                                disabled={!cart[item.id]} // Disable remove button if no items
                            />,
                            <Text>{cart[item.id] || 0}</Text>,
                            <Button
                                icon={<PlusOutlined />}
                                onClick={() => handleAddToCart(item.id)}
                                disabled={!!cart[item.id]} // Disable add button if item is already in cart
                            />,
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
