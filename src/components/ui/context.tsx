import React, { FC } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import theme from '@styles/Theme';
import { SnackbarProvider } from '@components/common';
import { DialogProvider } from '@components/common/Dialog/DialogProvider';

export const ManagedUIContext: FC = ({ children }) => (
  <EmotionThemeProvider theme={theme}>
    <MuiThemeProvider theme={theme}>
      <DialogProvider>
        <SnackbarProvider>
          {children}
        </SnackbarProvider>
      </DialogProvider>
    </MuiThemeProvider>
  </EmotionThemeProvider>
);
