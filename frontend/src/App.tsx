// src/App.tsx
import React from 'react';
import ClientList from './components/ClientList';
import ClientForm from './components/ClientForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>My React Application</h1>
      <ClientList />
      <ClientForm />
    </div>
  );
};

export default App;
