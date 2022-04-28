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
  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
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
        <Button onClick={() => onClose(false)}>{cancelText}</Button>
        <Button onClick={() => onClose(true)} autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
