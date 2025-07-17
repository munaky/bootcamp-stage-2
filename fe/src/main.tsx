import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './contexts/CartProvider.tsx';
import { AuthProvider } from './contexts/AuthProvider.tsx';
import { ToastProvider } from './contexts/ToastProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
          <App />
      </AuthProvider>
    </ToastProvider>
  </StrictMode>
)
