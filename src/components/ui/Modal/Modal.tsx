import * as React from 'react';
import { LoadingButton } from '@mui/lab';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Spinner } from '@components/ui';
import styled from '@emotion/styled';

type ModalProps = {
  open: boolean;
  onCloseModal: () => void;
  title?: React.ReactNode;
  onSubmit?: () => void;
  actionLoading?: boolean;
  actionDisabled?: boolean;
  loading?: boolean;
  action?: string | React.ReactNode;
} & Omit<DialogProps, 'title'>;

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
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export function Modal({
  open,
  children,
  title,
  action,
  onCloseModal,
  onSubmit,
  actionLoading,
  actionDisabled,
  loading = false,
  ...dialogProps
}: ModalProps) {
  return (
    <DialogBox
      className="제발"
      onClose={onCloseModal}
      aria-labelledby="modal-title"
      open={open}
      {...dialogProps}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <BootstrapDialogTitle id="modal-title" onClose={onCloseModal}>
            {title}
          </BootstrapDialogTitle>
          <DialogContent>{children}</DialogContent>
          {action ? (
            <DialogActions>
              {typeof action !== 'string' ? (
                action
              ) : (
                <LoadingButton
                  autoFocus
                  onClick={onSubmit}
                  disabled={actionDisabled}
                  loading={actionLoading || false}
                  variant="contained"
                >
                  {action}
                </LoadingButton>
              )}
            </DialogActions>
          ) : null}
        </>
      )}
    </DialogBox>
  );
}

const DialogBox = styled(Dialog)`
  @media (max-width: 500px) {
    .MuiPaper-root {
      margin: 0;
      width: 100%;
    }
    .MuiDialog-container {
      justify-content: none;
      width: 100%;
    }
    .MuiDialogContent-root {
      padding: 0;
    }
  }
`;
