import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export type ConfirmDialogProps = {
  open: boolean;
  title: string;
  content: string;
  confirmText?: string | '확인';
  cancelText?: string | '취소';
  onClose: (isConfirm: boolean) => void;
}

export function Confirm({ open, title, content, confirmText, cancelText, onClose }: ConfirmDialogProps) {
  const handleClose = (isConfirm: boolean) => {
    onClose(isConfirm);
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>{cancelText}</Button>
        <Button onClick={() => handleClose(true)} autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
