import React, { useState } from 'react';
import { ToastContext } from './ToastContext';
import type { Toast, ToastType } from '../types/toast';
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { X, Check, TriangleAlert, Info } from 'lucide-react';

type Props = {
  children: React.ReactNode;
};

export const ToastProvider: React.FC<Props> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])


  const addToast = (toast: { type: ToastType, title: string, description?: string, duration?: number }) => {
    const id = Date.now();
    const duration = toast.duration || 5000

    setToasts([...toasts, {
      id: id,
      type: toast.type,
      title: toast.title,
      description: toast.description || '',
    }]);

    setTimeout(() => removeToast(id), duration);
  }

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  return (
    <ToastContext value={{ addToast }}>
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2 w-full max-w-md">
        {toasts.map((toast) => (
          <Alert key={toast.id} className={
            toast.type === 'info' ? 'bg-blue-100 border-blue-300 text-blue-400 text-green-500'
              :
              toast.type === 'success' ? 'bg-green-100 border-green-300 text-green-500'
                :
                'bg-red-100 border-red-300 text-red-500' 
          }
          >
            {
              toast.type === 'info' ? <Info color='blue' />
                :
                toast.type === 'success' ? <Check color='green' />
                  :
                  <TriangleAlert color='red' />
            }
            <AlertTitle className='flex justify-between'>
              <p className='font-semibold'>{toast.title}</p>
              <X size={16} onClick={() => removeToast(toast.id)}></X>
            </AlertTitle>
            <AlertDescription>
              {toast.description}
            </AlertDescription>
          </Alert>
        ))}
      </div>
      {children}
    </ToastContext>
  );
};