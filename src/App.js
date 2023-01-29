import React from 'react';
import './App.css';
import { AuthProvider } from './providers/AuthProvider';
import RoutesApp from './routes/routes';
import { Toaster } from 'react-hot-toast';

/**
 * The main app component
 * @author Diego Delgado
 * @returns The app component
 */
function App() {
  return (
    <AuthProvider>
      <RoutesApp />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
