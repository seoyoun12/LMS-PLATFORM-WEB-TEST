import { logout } from '@common/api';
import { checkingSignin, loginType, SignInResponse } from '@common/api/auth/signIn';
import { existsUserId, findUserPw } from '@common/api/user';
import { Spinner } from '@components/ui';
import styled from '@emotion/styled';
import { useSnackbar } from '@hooks/useSnackbar';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Props {
  handleStepChange: (stepNumber: number) => void;
  handleUsernameChange: (username: string) => void;
}

export function Step1({ handleStepChange, handleUsernameChange }: Props) {
  const snackbar = useSnackbar();
  const [username, setUsername] = useState<string>('');
  const [usernameErr, setUsernameErr] = useState(false);
  const [password, setPassword] = useState<string>('');
  const [passwordErr, setPasswordErr] = useState(false);
  const [loading, setLoading] = useState(false);

  //api가 바뀌었습니다. 작동하지 않습니다.
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (usernameErr) return window.alert('올바른 아이디를 입력해 주세요!');
    try {
      setLoading(true);
      const userData = await findUserPw({ username });
      if (!userData || !userData.data) return window.alert('오류가 발생했습니다.');

      handleUsernameChange(userData.data.username);
      handleStepChange(2);
      setLoading(false);
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
      setLoading(false);
    }
  };

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameErr(false);
    setUsername(e.target.value);
    if (e.target.value === '') return setUsernameErr(true);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordErr(false);
    setPassword(e.target.value);
    if (e.target.value === '') return setPasswordErr(true);
  };

  return (
    <Step1Wrap>
      <Typo>ID 입력</Typo>
      <Typography fontWeight="bold">아이디의 존재여부를 확인합니다</Typography>
      <Box className="find-form" component="form" onSubmit={handleSubmit}>
        <FormControl>
          <TextField
            placeholder="아이디를 입력해 주세요"
            onChange={handleUsername}
            error={usernameErr}
            value={username}
          />
          <FormHelperText sx={{ color: 'red' }}>
            {usernameErr && `올바른 형식으로 입력해주세요`}
          </FormHelperText>
        </FormControl>
        {/* <FormControl>
          <TextField
            placeholder="현재 비밀번호를 입력해 주세요"
            type="password"
            onChange={handlePassword}
            error={passwordErr}
            value={password}
          />
          <FormHelperText sx={{ color: 'red' }}>
            {usernameErr && `올바른 형식으로 입력해주세요`}
          </FormHelperText>
        </FormControl> */}
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? <Spinner fit={true} /> : '비민번호 찾기'}
        </Button>
      </Box>
    </Step1Wrap>
  );
}

const Step1Wrap = styled(Box)`
  max-width: 700px;
  margin: auto;
  .find-form {
    max-width: 450px;
    margin: auto;
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
const Typo = styled(Box)`
  font-weight: bold;
  font-size: 1.25rem;
  margin-top: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #888888;
`;
// const FindForm = styled(Box)`
// `;
