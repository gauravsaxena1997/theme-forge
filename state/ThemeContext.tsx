
import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ThemeTokens, Mode } from '../types/tokens';
import { applyTokensToCSS } from '../utils/applyTokens';
import { defaultPreset } from '../data/defaultPreset';

type ThemeCtx = {
  tokens: ThemeTokens;
  mode: Mode;
  setTokens: (updater: (t: ThemeTokens) => ThemeTokens) => void;
  setMode: (m: Mode) => void;
  activeModeTokens: ThemeTokens['light'] | ThemeTokens['dark'];
};

const Ctx = createContext<ThemeCtx>(null as any);

export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [tokens, setTokensState] = useState<ThemeTokens>(defaultPreset);
  const [mode, setMode] = useState<Mode>('light');

  const setTokens = (updater: (t: ThemeTokens) => ThemeTokens) => {
    setTokensState(updater);
  };
  
  useEffect(() => {
    const activeTokens = tokens[mode];
    applyTokensToCSS(activeTokens, mode);
    document.documentElement.className = mode;
  }, [tokens, mode]);

  const value = useMemo(() => ({
    tokens,
    mode,
    setTokens,
    setMode,
    activeModeTokens: tokens[mode],
  }), [tokens, mode]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useThemeForge = () => useContext(Ctx);
