import UserForm from '../components/UserForm';
import UserList from '../components/UserList';

const AdminDashboard = () => {

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <UserForm />
            <div>
                <h2>Manage Users</h2>
                <UserList />
            </div>
        </div>
    );
};

export default AdminDashboard;