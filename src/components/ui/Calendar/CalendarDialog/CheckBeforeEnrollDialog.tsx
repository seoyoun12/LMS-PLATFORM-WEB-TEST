import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
  message: string;
  cancelAction?: () => void;
  confirmAction?: () => void;
  duplicated?: boolean;
}

export function CheckBeforeEnrollDialog({
  open,
  onClose,
  message,
  confirmAction,
  cancelAction,
  duplicated,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText sx={{ whiteSpace: 'pre-wrap' }}>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {duplicated ? (
          <>
            <Button onClick={cancelAction || onClose}>취소</Button>
            <Button
              onClick={
                confirmAction
                //   () => {
                //   router.push(`/me/enroll-history`);
                //   return setDeplecateEnrollOpen(false);
                // }
              }
            >
              확인
            </Button>
          </>
        ) : (
          <Button onClick={onClose}>확인</Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
