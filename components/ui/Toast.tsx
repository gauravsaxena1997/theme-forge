import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { generateId } from '../../lib/utils';
import { CheckCircleIcon, AlertCircleIcon, InfoIcon, XIcon } from '../icons';

type ToastType = 'success' | 'danger' | 'info';

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = useCallback((message: string, type: ToastType = 'info') => {
    const id = generateId();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] w-full max-w-xs space-y-2">
        {toasts.map((t) => (
          <Toast key={t.id} {...t} onDismiss={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ICONS: Record<ToastType, React.FC<any>> = {
  success: CheckCircleIcon,
  danger: AlertCircleIcon,
  info: InfoIcon,
};

const COLORS: Record<ToastType, string> = {
    success: 'var(--color-success)',
    danger: 'var(--color-danger)',
    info: 'var(--color-primary)',
}

interface ToastProps extends ToastMessage {
  onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onDismiss }) => {
  const Icon = ICONS[type];
  const color = COLORS[type];

  return (
    <div
      className="pointer-events-auto w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-card-foreground)] shadow-[var(--shadow-lg)]"
      role="alert"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6" style={{color}} />
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              className="inline-flex rounded-md bg-transparent text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              onClick={onDismiss}
            >
              <span className="sr-only">Close</span>
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};