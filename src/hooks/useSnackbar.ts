import { createContext, useContext } from 'react';

export interface SnackbarConfig {
  variant?: 'success' | 'warning' | 'info' | 'error';
  message: string;
}

// @ts-ignore
export const SnackbarContext = createContext<(config: SnackbarConfig) => void>(null);

export const useSnackbar = () => useContext(SnackbarContext);

