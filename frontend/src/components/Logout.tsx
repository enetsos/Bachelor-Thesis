
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/LoginContext';

const LogoutButton = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
        >
            Logout
        </Button>
    );
};

export default LogoutButton;
