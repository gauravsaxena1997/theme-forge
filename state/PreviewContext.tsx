import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface PreviewContextType {
  isPreviewFullScreen: boolean;
  toggleFullScreen: () => void;
}

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

export const usePreview = () => {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error('usePreview must be used within a PreviewProvider');
  }
  return context;
};

export const PreviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPreviewFullScreen, setIsPreviewFullScreen] = useState(false);

  const toggleFullScreen = useCallback(() => {
    setIsPreviewFullScreen((prev) => !prev);
  }, []);

  return (
    <PreviewContext.Provider value={{ isPreviewFullScreen, toggleFullScreen }}>
      {children}
    </PreviewContext.Provider>
  );
};