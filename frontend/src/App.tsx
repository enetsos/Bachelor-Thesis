// src/App.tsx
import React from 'react';
import Dashboard from './pages/Dashboard';
import LoginForm from './components/LoginForm';
import { Role } from './types';
import { ConfigProvider } from 'antd';


import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/Admin';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute requiredRole={Role.ADMIN}>
        <Dashboard />
      </ProtectedRoute>)
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRole={Role.ADMIN}>
        <AdminDashboard />
      </ProtectedRoute>)
  }
]);


const App: React.FC = () => {


  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#309674',
          borderRadius: 2,

          // Alias Token
          colorBgContainer: '#f6ffed',
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
