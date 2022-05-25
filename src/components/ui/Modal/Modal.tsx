import * as React from 'react';
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type ModalProps = {
  open: boolean,
  handleClose: () => void;
  onSubmit?: () => void;
  submitLoading?: boolean;
  action?: string | React.ReactNode;
} & DialogProps

interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export function Modal(
  {
    open,
    children,
    title,
    action,
    handleClose,
    onSubmit,
    submitLoading,
    ...dialogProps
  }: ModalProps
) {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="modal-title"
      open={open}
      {...dialogProps}
    >
      <BootstrapDialogTitle id="modal-title" onClose={handleClose}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
      <DialogActions>
        {
          typeof action !== 'string' ? action :
            <LoadingButton
              autoFocus
              onClick={onSubmit}
              loading={submitLoading || false}
            >
              {action}
            </LoadingButton>
        }
      </DialogActions>
    </Dialog>
  );
}

