import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Adjust import according to your project structure
import { UserSessionProvider } from './userSessionProvider'; // Adjust the import path accordingly
import './index.css'

// Ensure that the root element exists before attempting to render
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element with id 'root' not found in the document.");
}

// Create a root and render your application inside it
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserSessionProvider>
        <App />
      </UserSessionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
