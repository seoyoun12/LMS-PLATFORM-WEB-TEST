import { logout, signIn } from '@common/api';
import { loginType } from '@common/api/auth/signIn';
import { getMyUser, UserRole } from '@common/api/user';
import { Spinner } from '@components/ui';
import styled from '@emotion/styled';
import { useSnackbar } from '@hooks/useSnackbar';
import { Box, Button, TextField } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

export function AdminSignin() {
  const snackbar = useSnackbar();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const username = formdata.get('username') as string;
    const password = formdata.get('password') as string;
    try {
      setLoading(true);
      await signIn(username, password, loginType.TYPE_TRAFFIC_SAFETY_EDU);

      const { data } = await getMyUser();
      if (data && data.roles.some(item => item === UserRole.ROLE_ADMIN)) {
        snackbar({
          variant: 'success',
          message: '관리자 로그인이 완료되었습니다',
        });
        router.push('/admin-center/user');
      } else {
        snackbar({ variant: 'error', message: '일치하지 않는 정보입니다.' });
        setLoading(false);
        await logout();
      }
      setLoading(false);
    } catch (e: any) {
      // snackbar({ variant: 'error', message: e.data.message });
      snackbar({
        variant: 'error',
        message: '아이디 또는 비밀번호를 확인해주세요.',
      });
      setLoading(false);
      await logout();
    }
  };

  useEffect(() => {
    (async function () {
      if (!localStorage.getItem('ACCESS_TOKEN')) return;
      try {
        setLoading(true);
        const { data } = await getMyUser();
        if (data && data.roles.some(item => item === UserRole.ROLE_ADMIN)) {
          snackbar({
            variant: 'success',
            message: '관리자 로그인이 완료되었습니다',
          });
          router.push('/admin-center/user');
        }
        setLoading(false);
      } catch (e: any) {
        snackbar({ variant: 'error', message: e.data.message });
        await logout();
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AdminSigninWrap>
      <SigninBox>
        <Box className="form-box" component="form" onSubmit={onSubmitLogin}>
          <ImageBox>
            <Image
              src={'/assets/images/cttsLogo.png'}
              width="320"
              height="48"
            />
          </ImageBox>
          <TextField name="username" type="username" placeholder="아이디" />
          <TextField name="password" type="password" placeholder="패스워드" />
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? <Spinner fit={true} /> : '로그인'}
          </Button>
          <Button
            variant="outlined"
            type="button"
            onClick={() => router.push('/')}
          >
            홈으로
          </Button>
        </Box>
      </SigninBox>
    </AdminSigninWrap>
  );
}

const AdminSigninWrap = styled(Box)`
  height: 100vh;
`;
const SigninBox = styled(Box)`
  max-width: 600px;
  position: relative;
  gap: 1rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 4rem;
  border-radius: 4px;
  box-shadow: 1px 1px 6px 4px rgba(0, 0, 0, 0.1);
  .form-box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
const ImageBox = styled(Box)`
  margin-bottom: 4rem;
  display: flex;
  justify-content: center;
`;
