import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { signIn } from '@common/api/auth';
import { useSetRecoilState } from 'recoil';
import { isLoginState, pageType } from '@common/recoil';
import { useIsLoginStatus } from '@hooks/useIsLoginStatus';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSnackbar } from '@hooks/useSnackbar';
import { userInfo } from '@common/recoil/user';
import { loginType } from '@common/api/auth/signIn';
import { Checkbox, FormHelperText } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Modal, Spinner } from '@components/ui';
import Image from 'next/image';
import styled from '@emotion/styled';
import { transIndividualSummary } from '@utils/individualSummaries';
import { UserRole } from '@common/api/user';
import dynamic from 'next/dynamic';
import { courseType } from '@common/api/courseClass';
import { getTerms } from '@common/api/terms';

export function SignInV2() {
  const router = useRouter();
  const isLogin = useIsLoginStatus();
  const setIsLoginState = useSetRecoilState(isLoginState);
  const setUsetInfo = useSetRecoilState(userInfo);
  const snackbar = useSnackbar();
  const [loading, setLoading] = React.useState(false);
  const [smsYn, setSmsYn] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [termData, setTermData] = React.useState('약관을 불러오는 중입니다...');
  const loadingRef = React.useRef(false);

  const { watch, setValue } = useForm({
    defaultValues: {
      name: '',
      identify1: '',
      identify2: '',
      usernameErr: false,
      identify1Err: false,
      identify2Err: false,
    },
  });
  const { name, identify1, identify2, usernameErr, identify1Err, identify2Err } = watch();

  //리다이렉트 라우팅 주소 확인
  const redirect =
    String(router.query?.redirect) !== 'undefined'
      ? String(router.query?.redirect)
      : '/category';

  //로그인 여부 확인 이펙트.
  useEffect(() => {
    if (isLogin) {
      router.push('/category');
    }
  }, [isLogin]);

  //이용약관 불러오는 이펙트.
  useEffect(() => {
    (async function () {
      const { data } = await getTerms({ termType: 'PERSONAL_INFORMATION_TERMS' });
      setTermData(data.content);
    })();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name') as string;
    const identify1 = data.get('identify1') as string;
    const identify2 = data.get('identify2') as string;
    const username = identify1 + identify2;
    const password = identify1 + identify2;

    if (usernameErr || identify1Err || identify2Err) return;
    if (!smsYn) return window.alert('개인정보 수집 및 이용에 동의해야합니다.');
    if (loadingRef.current) return console.log('Block multiple click');

    loadingRef.current = true;
    setLoading(true);
    try {
      const res = await signIn(
        username,
        password,
        loginType.TYPE_TRANS_EDU,
        name.replaceAll(' ', '')
      );
      if (res.success) {
        setIsLoginState(true);
        setUsetInfo({
          name: res.data.username,
          role: [...(res.data.roles as unknown as UserRole[])],
        }); // api가 있었음 필요없을듯
        snackbar({ variant: 'success', message: '로그인이 완료되었습니다.' });
        router.push(redirect);
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
    <SignInContainer
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
        <Avatar sx={{ m: 1 }}>
          {/* <LockOutlinedIcon /> */}
          <Image src={'/assets/images/loginLogo.png'} width={60} height={60} />
        </Avatar>

        <Title />
        {/* <Box
          width="fit-content"
          fontSize="22px"
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
        >
          <Box>실명인증이&nbsp;</Box>
          <Box>필요합니다.</Box>
        </Box> */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          <FormHelperText sx={{ color: 'red' }}>
            {usernameErr && '이름을 입력해 주세요'}
          </FormHelperText>
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
              inputProps={{ inputMode: 'numeric' }}
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
              inputProps={{ inputMode: 'numeric' }}
            />
          </Box>
          <FormHelperText sx={{ color: 'red' }}>
            {(identify1Err || identify2Err) &&
              '올바르지 않은 주민등록번호 입니다. 다시 한번 확인해주세요.'}
          </FormHelperText>
          <IndividualCheckBox>
            <Box
              display="flex"
              alignItems="center"
              onClick={() => setSmsYn(prev => !prev)}
              sx={{ cursor: 'pointer' }}
            >
              <Checkbox
                checked={smsYn}
                // inputProps={{ 'aria-label': 'controlled' }}
                // onChange={(e, checked) => {
                //   setSmsYn(checked);
                // }}
              />
              <Box fontSize="14px">개인정보 수집 및 이용에 동의합니다.</Box>
              {/* <Typography component="span">
                개인정보 수집 및 이용에 
              </Typography> */}
            </Box>
            <ViewContentBox onClick={() => setOpen(true)}>내용보기</ViewContentBox>
          </IndividualCheckBox>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 1, mb: 2 }}
          >
            {loading ? <Spinner fit={true} /> : '확인'}
          </Button>
          <Modal
            title={'개인정보 수집 및 이용 전문'}
            open={open}
            onCloseModal={() => setOpen(false)}
            // sx={{ maxWidth: '800px', margin: 'auto' }}
            maxWidth="md"
            action={
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                  gap: '1rem',
                  paddingBottom: '1rem',
                }}
              >
                <ConfirmButton
                  variant="contained"
                  onClick={() => setOpen(false)}
                  fullWidth
                >
                  확인
                </ConfirmButton>
              </Box>
            }
          >
            {termData.split('\n').map(item => (
              <Box>{item}</Box>
            ))}
          </Modal>
        </Box>
      </Box>
    </SignInContainer>
  );
}
const SignInContainer = styled(Container)`
  @media (max-width: 550px) {
    padding: 0 8px;
  }
`;

const IndividualCheckBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ViewContentBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  width: 72px;
  height: 30px;
  box-sizing: border-box;
  border: 1px solid #171717;
  border-radius: 4px;
  cursor: pointer;
`;

const Title = dynamic(
  () =>
    Promise.resolve(() => {
      if (localStorage.getItem('site_course_type') === 'TYPE_TRANS_WORKER')
        return (
          <Box width="fit-content" fontSize="22px" flexDirection={'column'}>
            <Box display="flex" flexWrap="wrap" justifyContent="center">
              <Box>본 교육과정은&nbsp;</Box>
              <Box>충남 또는 세종시&nbsp;</Box>
            </Box>
            <Box display="flex" flexWrap="wrap" justifyContent="center">
              <Box>소속차량 운수종사자만&nbsp;</Box>
              <Box>교육 신청 하실 수 있습니다.</Box>
            </Box>
          </Box>
        );
      if (localStorage.getItem('site_course_type') === 'TYPE_LOW_FLOOR_BUS')
        return (
          <Box width="fit-content" fontSize="22px" flexDirection={'column'}>
            <Box display="flex" flexWrap="wrap" justifyContent="center">
              <Box>본 교육과정은&nbsp;</Box>
              <Box>충남 소속 저상버스&nbsp;</Box>
            </Box>
            <Box display="flex" flexWrap="wrap" justifyContent="center">
              <Box>차량 운전자만&nbsp;</Box>
              <Box>교육 신청 하실 수 있습니다.</Box>
            </Box>
          </Box>
        );
      return <Box>Error...</Box>;
    }),
  { ssr: false }
);

const ConfirmButton = styled(Button)``;
