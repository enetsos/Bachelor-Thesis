import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { AuthProvider } from './context/LoginContext';
import { UserProvider } from './context/UserContext';
import { TimeTrackingProvider } from './context/TimeTrackingContext';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <TimeTrackingProvider>
          <App />
        </TimeTrackingProvider>

      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);

// Register the service worker
serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    // Notify user about the update, e.g., using a custom modal or toast
    console.log('New content is available and will be used when all tabs for this page are closed.');
  },
  onSuccess: (registration) => {
    console.log('Content is cached for offline use.');
  },
});

reportWebVitals();
