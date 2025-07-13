import { useState, useCallback } from 'react';

export interface ToastMessage {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

export const useToast = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');

  const showToastMessage = useCallback(({ message, type = 'info', duration = 3000 }: ToastMessage) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    
    setTimeout(() => {
      setShowToast(false);
    }, duration);
  }, []);

  const hideToast = useCallback(() => {
    setShowToast(false);
  }, []);

  return {
    showToast,
    toastMessage,
    toastType,
    showToastMessage,
    hideToast
  };
}; 