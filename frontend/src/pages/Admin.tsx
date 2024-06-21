import React, { useState, useEffect } from 'react';
// Assuming UserForm is in the same directory
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
// Import any additional components or services needed for user management

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