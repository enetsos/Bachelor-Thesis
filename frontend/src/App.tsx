// src/App.tsx
import React from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import LoginForm from './components/LoginForm';


const App: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <LoginForm />
      <UserForm />
      <UserList />
    </div>
  );
};

export default App;
