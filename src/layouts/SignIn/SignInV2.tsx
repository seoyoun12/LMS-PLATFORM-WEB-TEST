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
import { pageRegType } from '@common/recoil/pageType/atom';
import { loginType } from '@common/api/auth/signIn';
import { FormHelperText } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Spinner } from '@components/ui';

export function SignInV2() {
  const router = useRouter();
  const isLogin = useIsLoginStatus();
  const setIsLoginState = useSetRecoilState(isLoginState);
  const setUsetInfo = useSetRecoilState(userInfo);
  const snackbar = useSnackbar();
  const [loading, setLoading] = React.useState(false);
  const loadingRef = React.useRef(false);

  const { watch, setValue } = useForm({
    defaultValues: { name: '', identify1: '', identify2: '', usernameErr: false, identify1Err: false, identify2Err: false },
  });
  const { name, identify1, identify2, usernameErr, identify1Err, identify2Err } = watch();

  useEffect(() => {
    if (isLogin) {
      router.push('/category');
    }
  }, [isLogin]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name') as string;
    const identify1 = data.get('identify1') as string;
    const identify2 = data.get('identify2') as string;
    const username = identify1 + identify2;
    const password = identify1 + identify2;

    if (usernameErr || identify1Err || identify2Err) return;
    if (loadingRef.current) return console.log('Block multiple click');

    loadingRef.current = true;
    setLoading(true);
    try {
      const res = await signIn(username, password, loginType.TYPE_TRANS_EDU, name);
      if (res.success) {
        setIsLoginState(true);
        setUsetInfo({ username: res.data.username, regCategory: [...res.data.roles] }); // api가 있었음 필요없을듯
        snackbar({ variant: 'success', message: '로그인이 완료되었습니다.' });
        router.push('/category');
      }
      loadingRef.current = false;
      setLoading(false);
    } catch (e: any) {
      snackbar({ variant: 'error', message: e.data.message });
      loadingRef.current = false;
      setLoading(false);
    }
  };

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('name', e.target.value);
    setValue('usernameErr', false);
    if (e.target.value === '') {
      setValue('usernameErr', true);
    }
  };
  const onChangeIdentify1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 6) return;
    setValue('identify1', e.target.value.replace(/[^0-9]/g, ''));
    setValue('identify1Err', false);
    if (e.target.value.length < 6) {
      setValue('identify1Err', true);
    }
  };
  const onChangeIdentify2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 7) return;
    setValue('identify2', e.target.value.replace(/[^0-9]/g, ''));
    setValue('identify2Err', false);
    if (e.target.value.length < 6) {
      setValue('identify2Err', true);
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
          로그인
        </Typography> */}
        <Typography fontSize="1rem">실명인증 후 예약절차를 진행하고 있습니다.</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* <Typography component="div" variant="button" onClick={() => setLoginType('TYPE_TRANS_EDU')}>
            저상/운수
          </Typography>
          <Typography component="div" variant="button" onClick={() => setLoginType('TYPE_TRAFFIC_SAFETY_EDU')}>
            도민
          </Typography> */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="이름"
            placeholder="본인의 실명을 입력해주세요."
            name="name"
            autoComplete="name"
            onChange={onChangeUsername}
            value={name}
            error={usernameErr}
            autoFocus
          />
          <FormHelperText sx={{ color: 'red' }}>{usernameErr && '이름을 입력해 주세요'}</FormHelperText>
          {/* <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
          /> */}
          <Box display="flex" gap="1rem" alignItems="center">
            <TextField
              margin="normal"
              required
              fullWidth
              name="identify1"
              label="주민등록번호 앞자리"
              type="text"
              id="identify1"
              onChange={onChangeIdentify1}
              value={identify1}
              error={identify1Err}
              autoComplete="current-identify1"
            />
            -
            <TextField
              margin="normal"
              required
              fullWidth
              name="identify2"
              label="주민등록번호 뒷자리"
              type="password"
              id="identify2"
              onChange={onChangeIdentify2}
              value={identify2}
              error={identify2Err}
              autoComplete="current-identify2"
            />
          </Box>
          <FormHelperText sx={{ color: 'red' }}>
            {(identify1Err || identify2Err) && '올바르지 않은 주민등록번호 입니다. 다시 한번 확인해주세요.'}
          </FormHelperText>
          <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 3, mb: 2 }}>
            {loading ? <Spinner fit={true} /> : '확인'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
