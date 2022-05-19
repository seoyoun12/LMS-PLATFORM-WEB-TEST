import * as React from 'react';
import MuiAlert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

interface AlertProps {
  variant: 'error' | 'success' | 'warning' | 'info';
  children: React.ReactNode;
}

export function Alert({ variant = 'success', children }: AlertProps) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      {
        {
          'error':
            <MuiAlert severity="error">
              <AlertTitle>Error</AlertTitle>
              {children}
            </MuiAlert>,
          'warning':
            <MuiAlert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              {children}
            </MuiAlert>,
          'info':
            <MuiAlert severity="info">
              <AlertTitle>Info</AlertTitle>
              {children}
            </MuiAlert>,
          'success':
            <MuiAlert severity="success">
              <AlertTitle>Success</AlertTitle>
              {children}
            </MuiAlert>
        }[variant]
      }
    </Stack>
  );
}
