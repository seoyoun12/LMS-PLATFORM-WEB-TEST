import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogConfig } from '@hooks/useDialog';

export interface PromptDialogProps {
  open: boolean;
  title: string;
  content: string;
  confirmText?: string | '확인';
  cancelText?: string | '취소';
  onClose: (isConfirm: boolean) => void;
}

export function Prompt({ open, title, content, confirmText, cancelText, onClose }: any) {
  const handleClose = (isConfirm: boolean) => {
    onClose(isConfirm);
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {content}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>{cancelText}</Button>
        <Button onClick={() => handleClose(true)}>{confirmText}</Button>
      </DialogActions>
    </Dialog>
  );
}
