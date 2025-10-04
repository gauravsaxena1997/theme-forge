import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TabsContextProps {
  activeValue: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a Tabs component');
  }
  return context;
};

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ defaultValue, value, onValueChange, children, className }) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const activeValue = value !== undefined ? value : internalValue;

  const handleValueChange = (newValue: string) => {
    if (!value) {
      setInternalValue(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <TabsContext.Provider value={{ activeValue, onValueChange: handleValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`inline-flex h-10 items-center justify-center rounded-md bg-zinc-100 p-1 text-zinc-500 ${className}`}>
    {children}
  </div>
);

const TabsTrigger: React.FC<{ value: string; children: ReactNode; className?: string }> = ({ value, children, className }) => {
  const { activeValue, onValueChange } = useTabs();
  const isActive = activeValue === value;
  return (
    <button
      onClick={() => onValueChange(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isActive ? 'bg-white text-zinc-900 shadow-sm' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

const TabsContent: React.FC<{ value: string; children: ReactNode; className?: string }> = ({ value, children, className }) => {
  const { activeValue } = useTabs();
  return activeValue === value ? <div className={`mt-2 ${className}`}>{children}</div> : null;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
