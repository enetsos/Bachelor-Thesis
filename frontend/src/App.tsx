// src/App.tsx
import React from 'react';
import ClientList from './components/ClientList';
import ClientForm from './components/ClientForm';
import LoginForm from './components/LoginForm';

const App: React.FC = () => {
  return (
    <LoginForm>
      <div>
        <h1>Welcome to the App</h1>
        <LoginForm />
        <ClientList />
      </div>
    </LoginForm>
  );
};

export default App;
