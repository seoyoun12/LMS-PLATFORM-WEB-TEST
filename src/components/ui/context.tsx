import React, { FC } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import theme from '@styles/Theme';


export const ManagedUIContext: FC = ({ children }) => (
  <EmotionThemeProvider theme={theme}>
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  </EmotionThemeProvider>
);
