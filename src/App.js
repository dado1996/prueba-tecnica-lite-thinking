import './App.css';
import { AuthProvider } from './providers/AuthProvider';
import RoutesApp from './routes/routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <RoutesApp />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
