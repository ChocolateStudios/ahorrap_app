// context/NotificationContext.tsx
import React, { createContext, useContext, useState } from 'react';
import NotificationModal from '../components/NotificationModal';

interface NotificationContextType {
  showNotification: (type: 'success' | 'error' | 'warning', message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState<'success' | 'error' | 'warning'>('success');
  const [message, setMessage] = useState('');

  const showNotification = (notificationType: 'success' | 'error' | 'warning', msg: string) => {
    setType(notificationType);
    setMessage(msg);
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 3000); // Cierra después de 3 segundos
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <NotificationModal isVisible={isVisible} type={type} message={message} />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification debe usarse dentro de NotificationProvider');
  return context;
};