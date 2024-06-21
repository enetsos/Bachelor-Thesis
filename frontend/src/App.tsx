// src/App.tsx
import React from 'react';
import AdminDashboard from './pages/Admin';
import LoginForm from './components/LoginForm';
import { Role } from './types';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute requiredRole={Role.ADMIN}>
        <AdminDashboard />
      </ProtectedRoute>)
  },
]);


const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
