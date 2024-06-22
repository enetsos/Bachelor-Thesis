// src/App.tsx
import React from 'react';
import AdminDashboard from './pages/Admin';
import LoginForm from './components/LoginForm';
import { Role } from './types';
import { ConfigProvider } from 'antd';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute requiredRole={Role.ADMIN}>
        <AdminDashboard />
      </ProtectedRoute>)
  },
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
