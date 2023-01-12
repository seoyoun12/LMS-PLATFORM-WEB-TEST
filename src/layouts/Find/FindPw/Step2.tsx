import { isLoginState, pageType } from '@common/recoil';
import { pageRegType } from '@common/recoil/pageType/atom';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { changeUserPW, findUserPw } from '@common/api/user';
import { useSnackbar } from '@hooks/useSnackbar';
import { useDialog } from '@hooks/useDialog';
import { logout } from '@common/api';
import { useIsLoginStatus } from '@hooks/useIsLoginStatus';

const passwordRegex = /[a-zA-z0-9\[\]\{\}\/,.<>;:\'\"`~!@#$%^&*\(\)-_=+\\]/;

interface Props {
  handleStepChange: (stepNumber: number) => void;
  resPhone: string;
  resName: string;
}

export function Step2({ handleStepChange, resPhone, resName }: Props) {
  const snackbar = useSnackbar();
  const dialog = useDialog();
  const isLogin = useIsLoginStatus();
  const [userPageType, setUserPageType] = useRecoilState(pageType);
  const [username, setUsername] = useState<string>('');
  const [usernameErr, setUsernameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [confirmPassErr, setConfirmPassErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const password = data.get('password') as string;
    const confirmPass = data.get('confirmPass') as string;
    if (passwordErr || !username) return;
    if (!password) return window.alert('비밀번호를 입력하세요!');
    if (!confirmPass) return setConfirmPassErr(true);
    if (password !== confirmPass)
      return snackbar({
        variant: 'error',
        message: '비밀번호확인이 일치하지 않습니다.',
      });

    try {
      setLoading(true);
      const userData = await findUserPw({ username });
      if (!userData || !userData.data)
        return snackbar({
          variant: 'error',
          message: '사용자를 찾을 수 없습니다. 회원가입을 진행해주세요.',
        });

      const confirm = await dialog({
        title: '변경확인',
        description: '정말로 패스워드를 변경하시겠습니까?',
      });
      if (confirm) {
        if (!resName || !resPhone)
          return snackbar({
            variant: 'error',
            message: '휴대폰 본인인증값이 올바르지 않습니다. 다시 인증을 해주세요.',
          });
        if (isLogin) await logout();
        await changeUserPW({ phone: resPhone, name: resName, username, password });
        handleStepChange(3);
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameErr(false);
    setUsername(e.target.value);
    if (e.target.value === '') return setUsernameErr(true);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordErr(false);
    if (!passwordRegex.test(e.target.value) || e.target.value.length < 8) {
      setPasswordErr(true);
    }
  };

  return (
    <Step2Wrap>
      <Typo>패스워드 변경</Typo>
      <Typography fontWeight="bold">해당 계정의 비밀번호를 변경합니다.</Typography>
      <Box className="find-form" component="form" onSubmit={handleSubmit}>
        <FormControl>
          <TextField
            placeholder="인증된 이름입니다"
            value={resName}
            disabled
            sx={{ marginBottom: '18px' }}
          />
          <TextField placeholder="인증된 번호입니다" value={resPhone} disabled />
        </FormControl>
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
        <FormControl>
          <TextField
            placeholder="변경할 비밀번호를 입력해주세요"
            required
            fullWidth
            name="password"
            onChange={onChangePassword}
            error={passwordErr}
            // label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormHelperText sx={{ color: 'red' }}>
            {passwordErr && '올바른 형식이 아닙니다.'}
          </FormHelperText>
          <FormHelperText>
            <HelperBox>
              <WarningAmberIcon sx={{ fontSize: '0.75rem' }} />
              <Typography fontSize={'0.75rem'} fontWeight="bold">
                영문 대소문자/숫자/특수문자 3가지 이상 조합, 8자~32자 입니다.
              </Typography>
            </HelperBox>
          </FormHelperText>
        </FormControl>
        <FormControl>
          <TextField
            placeholder="변경할 비밀번호확인을 입력해주세요"
            required
            fullWidth
            name="confirmPass"
            onChange={() => setConfirmPassErr(false)}
            error={confirmPassErr}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormHelperText sx={{ color: 'red' }}>
            {confirmPassErr && '비밀번호가 일치하지 않습니다.'}
          </FormHelperText>
        </FormControl>

        <Box display="flex" justifyContent="center" mt={4}>
          <Button variant="contained" type="submit" sx={{ width: '400px' }}>
            비밀번호 변경
          </Button>
        </Box>
      </Box>
    </Step2Wrap>
  );
}

const Step2Wrap = styled(Box)`
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

const HelperBox = styled(Box)`
  display: flex;
  align-items: center;
`;
