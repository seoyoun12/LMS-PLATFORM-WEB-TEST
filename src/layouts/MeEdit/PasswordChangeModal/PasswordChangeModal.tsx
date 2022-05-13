import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ChangeEvent, useCallback, useReducer } from 'react';
import { modifyMyUserPassword } from '@common/api/user';
import { useSnackbar } from '@hooks/useSnackbar';

export interface Props {
  open: boolean;
  onClose: (isConfirm: boolean) => void;
}

interface State {
  currentPassword: string;
  newPassword: string;
  newPasswordValid: string;
}

const reducer = (state: State, newState: State) => ({ ...state, ...newState });

export function PasswordChangeModal({ open, onClose }: Props) {
  const snackbar = useSnackbar();

  const [ state, dispatch ] = useReducer(reducer, {
    currentPassword: '',
    newPassword: '',
    newPasswordValid: ''
  });

  const handleClose = (isConfirm: boolean) => {
    onClose(isConfirm);
  };

  const handleOnChange = useCallback((e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch({ ...state, [e.target.name]: e.target.value });
  }, [ state ]);

  const handleOnSubmit = async () => {
    const { currentPassword, newPassword, newPasswordValid } = state;
    try {
      if (validatePassword(newPassword, newPasswordValid)) {
        await modifyMyUserPassword({ currentPassword, newPassword });
        handleClose(true);
      } else {
        snackbar({ variant: 'error', message: '새로운 비밀번호가 동일하지 않습니다.' });
      }
    } catch (e: any) {
      switch (e.data.status) {
        case 400:
          snackbar({ variant: 'error', message: '현재 비밀번호가 일치하지 않습니다.' });
          break;

        default:
          snackbar({ variant: 'error', message: e.data.message });
      }
      return Promise.reject(e);
    }
  };

  const validatePassword = (newPassword: string, newPasswordValid: string) => {
    return newPassword === newPasswordValid;
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
    >
      <DialogTitle>비밀번호 변경</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="현재 비밀번호"
          type="password"
          fullWidth
          variant="standard"
          name="currentPassword"
          value={state.currentPassword}
          onChange={handleOnChange}
        />
        <TextField
          margin="dense"
          label="새로운 비밀번호"
          type="password"
          fullWidth
          variant="standard"
          name="newPassword"
          value={state.newPassword}
          onChange={handleOnChange}
        />
        <TextField
          margin="dense"
          label="새로운 비밀번호 확인"
          type="password"
          fullWidth
          variant="standard"
          name="newPasswordValid"
          value={state.newPasswordValid}
          onChange={handleOnChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>취소</Button>
        <Button onClick={handleOnSubmit}>변경하기</Button>
      </DialogActions>
    </Dialog>
  );
}
