import styled from '@emotion/styled';
import { Box,Button,FormControl,FormHelperText,TextField,Typography } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useSnackbar } from '@hooks/useSnackbar';
import { signUp } from '@common/api';
import { regCategoryType } from '@common/api/user';
import { YN } from '@common/constant';
import { ChangeEvent, useState } from 'react';
import { emailRegex, passwordRegex, phoneRegex } from '@utils/inputRegexes';
import { Spinner } from '@components/ui';
import Link from 'next/link';

interface Props {
  handleStep: (moveNumber: number) => void;
  resName: string;
  resPhone: string;
}

export function Step2({ handleStep, resName, resPhone }: Props) {
  const [nameErr, setNameErr] = useState(false);
  const [usernameErr, setUserNameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [confirmPasswordErr, setconfirmPasswordErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [phone, setPhone] = useState<string>();
  const snackbar = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // const name = data.get('name') as string;
    const username = data.get('username') as string;
    const password = data.get('password') as string;
    const confirmPassword = data.get('password-confirm') as string;
    const email = data.get('email') as string;
    const phone = data.get('phone') as string;

    if (nameErr || usernameErr || passwordErr || emailErr || phoneErr) return;
    if (password !== confirmPassword)
      return window.alert('비밀번호확인이 일치하지 않습니다!');

    if (!!resName && !!username && !!password) {
      setLoading(true);
      try {
        await signUp({
          name: resName,
          username,
          password,
          email,
          regCategory: regCategoryType.TYPE_TRAFFIC_SAFETY_EDU,
          emailYn: YN.NO,
          smsYn: YN.NO,
          phone: resPhone,
        });
        handleStep(3);
        setLoading(false);
      } catch (e: any) {
        snackbar({ variant: 'error', message: e.data.message });
        setLoading(false);
      }
    }
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNameErr(false);
    if (e.target.value.length === 0 || !e.target.value) {
      setNameErr(true);
    }
  };
  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUserNameErr(false);
    if (e.target.value.length <= 0 || !e.target.value) {
      setUserNameErr(true);
    }
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordErr(false);
    // if (!passwordRegex.match(e.target.value) || e.target.value.length < 8) {
    if (!e.target.value.match(passwordRegex) || e.target.value.length < 8) {
      setPasswordErr(true);
    }
  };
  // const onChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
  //   setconfirmPasswordErr(false);
  //   if (!passwordRegex.test(e.target.value) || e.target.value.length < 8) {
  //     setconfirmPasswordErr(true);
  //   }
  // };
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailErr(false);
    if (!emailRegex.test(e.target.value)) {
      setEmailErr(true);
    }
  };
  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneErr(false);
    if (e.target.value.length > 11) return;
    if (!phoneRegex.test(e.target.value)) {
      setPhoneErr(true);
    }
    setPhone(e.target.value);
  };

  return (
    <Step2Wrap>
      <StepMain>
        <TitleTypo>ID생성</TitleTypo>
        <Box className="content-box" component="form" onSubmit={handleSubmit}>
          <FormControl>
            <TextField
              placeholder="이름을 입력해주세요"
              required
              fullWidth
              id="name"
              // label="이름"
              name="name"
              value={resName}
              disabled
              // onChange={onChangeName}
              error={nameErr}
              autoComplete="name"
              autoFocus
            />
            <FormHelperText sx={{ color: 'red' }}>
              {nameErr && '올바른 형식이 아닙니다.'}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <TextField
              placeholder="아이디를 입력해주세요"
              required
              fullWidth
              id="username"
              label="아이디"
              name="username"
              onChange={onChangeUsername}
              error={usernameErr}
              autoComplete="username"
              autoFocus
            />
            <FormHelperText sx={{ color: 'red' }}>
              {usernameErr && '올바른 형식이 아닙니다.'}
            </FormHelperText>
            <FormHelperText>
              아이디는 영문 대소문자/숫자 2가지 이상 조합, 6~32자 입니다.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <TextField
              placeholder="비밀번호를 입력해주세요"
              required
              fullWidth
              name="password"
              onChange={onChangePassword}
              error={passwordErr}
              label="비밀번호"
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
              placeholder="비밀번호확인"
              required
              fullWidth
              name="password-confirm"
              // onChange={onChangePassword}
              error={passwordErr}
              label="비밀번호확인"
              type="password"
              id="password-confirm"
              autoComplete="current-password"
            />
          </FormControl>
          <FormControl>
            <TextField
              name="email"
              label="이메일"
              placeholder="이메일을 입력해주세요"
              onChange={onChangeEmail}
              error={emailErr}
              required
            />
            <FormHelperText sx={{ color: 'red' }}>
              {emailErr && '올바른 형식이 아닙니다.'}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <TextField
              name="phone"
              label="전화번호"
              placeholder="전화번호를 입력해주세요"
              onChange={onChangePhone}
              error={phoneErr}
              value={resPhone}
              disabled
              required
            />
            <FormHelperText sx={{ color: 'red' }}>
              {phoneErr && '올바른 형식이 아닙니다.'}
            </FormHelperText>
          </FormControl>
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? <Spinner fit={true} /> : '동의하고 회원가입'}
          </Button>
          <FotterBox margin="auto">
            <Typography className="term-typo" component="span" color="primary.main">
              <Link href="/terms?termType=CONDITIONS_TERMS">이용약관</Link>
            </Typography>
            ,
            <Typography className="term-typo" component="span" color="primary.main">
              <Link href="/terms?termType=PERSONAL_INFORMATION_TERMS">
                개인정보 수집 및 이용
              </Link>
            </Typography>
            {/* ,
            <Typography className="term-typo" component="span" color="primary.main">
              <Link href='/terms?termType=CONDITIONS_TERMS' >개인정보 제공</Link>
            </Typography> */}
            <Typography className="term-typo" component="span">
              내용을 확인하였고 동의합니다.
            </Typography>
          </FotterBox>
        </Box>
      </StepMain>
    </Step2Wrap>
  );
}

const Step2Wrap = styled(Box)`
  padding: 0 24px;
  .content-box {
    max-width: 450px;
    margin: auto;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .term-typo {
    font-size: 0.75rem;
  }
`;

const StepMain = styled(Box)`
  max-width: 700px;
  margin: auto;
`;

const TitleTypo = styled(Typography)`
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #c3c3c3;
`;

const HelperBox = styled(Box)`
  display: flex;
  align-items: center;
`;

const FotterBox = styled(Box)`
  margin-bottom: 50px;
`;
