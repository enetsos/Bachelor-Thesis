// src/App.tsx
import React from 'react';
import Dashboard from './pages/Dashboard';
import LoginForm from './components/LoginForm';
import { Role } from './types';
import { ConfigProvider } from 'antd';


import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/Admin';
import EmployeeDashboard from './pages/Employee';
import NewService from './pages/NewService';
import ServiceEmployee from './pages/ServiceEmployee';
import SupervisorDashboard from './pages/Supervisor';
import ClientDashboard from './pages/Client';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/',
    element: (
      <Dashboard />)
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRoles={[Role.ADMIN]}>
        <AdminDashboard />
      </ProtectedRoute>)
  },
  {
    path: '/employee',
    element: (
      <ProtectedRoute requiredRoles={[Role.EMPLOYEE]}>
        <EmployeeDashboard />
      </ProtectedRoute>)
  },
  {
    path: '/new-service',
    element: (
      <ProtectedRoute requiredRoles={[Role.EMPLOYEE, Role.SUPERVISOR]}>
        <NewService />
      </ProtectedRoute>)
  },
  {
    path: '/service',
    element: (
      <ProtectedRoute requiredRoles={[Role.ADMIN, Role.EMPLOYEE, Role.SUPERVISOR]}>
        <ServiceEmployee />
      </ProtectedRoute>
    )
  },

  {
    path: '/supervisor',
    element: (
      <ProtectedRoute requiredRoles={[Role.SUPERVISOR]}>
        <SupervisorDashboard />
      </ProtectedRoute>)
  },

  {
    path: '/client',
    element: (
      <ProtectedRoute requiredRoles={[Role.CLIENT]}>
        <ClientDashboard />
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
