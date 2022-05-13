import * as React from 'react';
import { Container, Box, Switch, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getMyUser, modifyMyUser } from '@common/api/user';
import { useRouter } from 'next/router';
import { PasswordChangeModal } from './PasswordChangeModal/PasswordChangeModal';
import { useDialog } from '@hooks/useDialog';

export function MeEdit() {
  const router = useRouter();
  const dialog = useDialog();
  const [ openPromptDialog, setOpenPromptDialog ] = useState(false);
  const [ nameInput, setNameInput ] = useState('');
  const [ emailChecked, setEmailChecked ] = useState(false);
  const [ smsChecked, setSmsChecked ] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await getMyUser();
      setEmailChecked(data.emailYn === 'Y');
      setSmsChecked(data.smsYn === 'Y');
      setNameInput(data.name);
    })();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dialogConfirmed = await dialog({
      title: '회원 정보 수정',
      description: '회원 정보를 수정하시겠습니까?',
      confirmText: '수정하기',
      cancelText: '취소하기'
    });
    await handleOnCloseConfirm(dialogConfirmed);
  };

  const handleOnCloseConfirm = async (isConfirm: boolean) => {
    if (isConfirm) {
      const emailYn = emailChecked ? 'Y' : 'N';
      const smsYn = smsChecked ? 'Y' : 'N';
      await modifyMyUser({ name: nameInput, emailYn, smsYn });
      return router.push('/me');
    }
  };

  return (
    <Container
      sx={{
        marginBottom: 8,
        padding: '72px 30px 48px',
        minWidth: '375px'
      }}
      maxWidth="sm"
    >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: 1
      }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="이름"
          name="name"
          autoComplete="name"
          autoFocus
          size="small"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          mt: '8px'
        }}
        >
          <Typography variant="body2">이메일 수신 여부</Typography>
          <Switch
            name="emailYn"
            sx={{ ml: 'auto' }}
            checked={emailChecked}
            onChange={(e, checked) => {
              setEmailChecked(checked);
            }}
          />
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          mt: '8px'
        }}
        >
          <Typography variant="body2">SMS 수신 여부</Typography>
          <Switch
            name="smsYn"
            sx={{ ml: 'auto' }}
            checked={smsChecked}
            onChange={(e, checked) => {
              setSmsChecked(checked);
            }}
          />
        </Box>
        <Button
          type="button"
          fullWidth
          variant="outlined"
          color="neutral"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => setOpenPromptDialog(true)}
        >
          비밀번호 변경
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          수정하기
        </Button>
      </Box>

      <PasswordChangeModal
        open={openPromptDialog}
        onClose={() => setOpenPromptDialog(false)}
      />
    </Container>
  );
}
