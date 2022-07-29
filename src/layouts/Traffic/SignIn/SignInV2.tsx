import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from '@components/common';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { signIn } from '@common/api/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isLoginState, pageType } from '@common/recoil';
import { useIsLoginStatus } from '@hooks/useIsLoginStatus';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSnackbar } from '@hooks/useSnackbar';
import { regCategory } from '@common/api/auth/signUp';
import { userInfo } from '@common/recoil/user';
import { loginType } from '@common/api/auth/signIn';

export function SignInV2() {
  const router = useRouter();
  const isLogin = useIsLoginStatus();
  const setIsLoginState = useSetRecoilState(isLoginState);
  const setUsetInfo = useSetRecoilState(userInfo);
  const snackbar = useSnackbar();

  useEffect(() => {
    if (isLogin) {
      router.push('/');
    }
  }, [isLogin]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username') as string;
    const password = data.get('password') as string;

    try {
      const res = await signIn(username, password, loginType.TYPE_TRAFFIC_SAFETY_EDU);
      if (res.success) {
        setIsLoginState(true);
        setUsetInfo({ username: res.data.username, regCategory: [...res.data.roles] }); // api가 있었음 필요없을듯
        snackbar({ variant: 'success', message: '로그인이 되었습니다.' });
        return router.push('/');
      }
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
    }
  };

  return (
    <Container
      component="div"
      maxWidth="xs"
      sx={{
        marginBottom: 8,
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        {/* <Typography component="h1" variant="h5">
          로그인엊머엉
        </Typography> */}
        <Typography fontSize="1rem">로그인 후 예약절차를 진행하고 있습니다.</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            placeholder="아이디를 입력해주세요"
            margin="normal"
            required
            fullWidth
            id="username"
            label="아이디"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            placeholder="비밀번호를 입력해주세요"
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            로그인
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2" color="black">
                아이디를 잊으셨나요?
              </Link>
            </Grid>
            <Box ml={1} mr={1}>
              |
            </Box>
            <Grid item xs>
              <Link href="#" variant="body2" color="black">
                비밀번호를 잊으셨나요?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/traffic/sign-up" variant="body2" color="black">
                {'회원 가입하기'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
