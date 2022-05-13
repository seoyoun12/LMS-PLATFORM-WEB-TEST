import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { SnackbarConfig, SnackbarContext } from '@hooks/useSnackbar';
import { forwardRef, ReactNode, useState } from 'react';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const initialConfig: SnackbarConfig = {
  message: '',
  variant: 'success'
};

export function SnackbarProvider({ children }: { children: ReactNode | undefined }) {
  const [ open, setOpen ] = useState(false);
  const [ config, setConfig ] = useState<SnackbarConfig>(initialConfig);

  const openSnackbar = (config: SnackbarConfig) => {
    setConfig({ ...config });
    setOpen(true);
  };

  const closeSnackbar = () => setOpen(false);

  return (
    <SnackbarContext.Provider value={openSnackbar}>
      {children}
      <Snackbar open={open} autoHideDuration={3000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity={config.variant} sx={{ width: '100%' }}>
          {config.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
