import Button from '@mui/material/Button';
import MuiDialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { forwardRef, ReactNode, useRef, useState } from 'react';
import { DialogConfig, DialogContext } from '@hooks/useDialog';

const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
    props,
    ref,
  ) {
    return <MuiDialog ref={ref} {...props} />;
  }
);

export function DialogProvider({ children }: { children: ReactNode | undefined }) {
  const [ config, setConfig ] = useState<DialogConfig | null>(null);
  const promiseRef = useRef<{
    resolve: (isConfirm: boolean) => void;
    reject: () => void;
  }>();

  const openDialog = (config: DialogConfig) => {
    setConfig({
      variant: 'alert',
      confirmText: '확인',
      cancelText: '취소',
      ...config,
    });

    return new Promise<boolean>((resolve, reject) => {
      promiseRef.current = { resolve, reject };
    });
  };

  const onClose = () => {
    if (promiseRef.current) {
      promiseRef.current.resolve(false);
    }
    setConfig(null);
  };

  const onSubmit = () => {
    if (promiseRef.current) {
      promiseRef.current.resolve(true);
    }
    setConfig(null);
  };

  return (
    <DialogContext.Provider value={openDialog}>
      {children}
      <Dialog
        open={Boolean(config)}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {config?.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {config?.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="neutral" onClick={onClose}>{config?.cancelText}</Button>
          <Button onClick={onSubmit} autoFocus>
            {config?.confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </DialogContext.Provider>
  );
}
