import styled from '@emotion/styled';
import { Box, Button, FormControl, FormHelperText, TextField, Typography } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useSnackbar } from '@hooks/useSnackbar';
import { signUp } from '@common/api';
import { regCategoryType } from '@common/api/user';
import { YN } from '@common/constant';
import { ChangeEvent, useState } from 'react';

const aa = '123@';
// const passwordRegex =
//   /^(?:[a-zA-Z]+[0-9]+$)|(?:[a-zA-Z]+[^a-zA-Z0-9\n]+$)|(?:[0-9]+[a-zA-Z]+$)|(?:[0-9]+[^a-zA-Z0-9\n]+$)|(?:[^a-zA-Z0-9\n]+[a-zA-Z0-9]+$)/;

const passwordRegex = /^[a-zA-z]+[0-9]+[\[\]\{\}\/,.<>;:\'\"`~!@#$%^&*\(\)-_=+\\]/;
const emailRegex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

interface Props {
  handleStep: (moveNumber: number) => void;
}

export function Step2({ handleStep }: Props) {
  const [nameErr, setNameErr] = useState(false);
  const [usernameErr, setUserNameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const snackbar = useSnackbar();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name') as string;
    const username = data.get('username') as string;
    const password = data.get('password') as string;
    const email = data.get('email') as string;

    if (nameErr || usernameErr || passwordErr || emailErr) return;

    if (!!name && !!username && !!password) {
      try {
        await signUp({
          name,
          username,
          password,
          email,
          regCategory: regCategoryType.TYPE_TRAFFIC_SAFETY_EDU,
          emailYn: YN.NO,
          smsYn: YN.NO,
          phone: '0100101010123123',
        });
        handleStep(3);
      } catch (e: any) {
        snackbar({ variant: 'error', message: e.data.message });
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
    if (!passwordRegex.test(e.target.value) || e.target.value.length < 8) {
      setPasswordErr(true);
    }
  };
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailErr(false);
    if (!emailRegex.test(e.target.value)) {
      setEmailErr(true);
    }
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
              onChange={onChangeName}
              error={nameErr}
              autoComplete="name"
              autoFocus
            />
            <FormHelperText sx={{ color: 'red' }}>{nameErr && '올바른 형식이 아닙니다.'}</FormHelperText>
          </FormControl>
          <FormControl>
            <TextField
              placeholder="아이디를 입력해주세요"
              required
              fullWidth
              id="username"
              // label="아이디"
              name="username"
              onChange={onChangeUsername}
              error={usernameErr}
              autoComplete="username"
              autoFocus
            />
            <FormHelperText sx={{ color: 'red' }}>{usernameErr && '올바른 형식이 아닙니다.'}</FormHelperText>
            <FormHelperText>아이디는 영문 대소문자/숫자 2가지 이상 조합, 6~32자 입니다.</FormHelperText>
          </FormControl>
          <FormControl>
            <TextField
              placeholder="비밀번호를 입력해주세요"
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
            <FormHelperText sx={{ color: 'red' }}>{passwordErr && '올바른 형식이 아닙니다.'}</FormHelperText>
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
            <TextField name="email" placeholder="이메일을 입력해주세요" onChange={onChangeEmail} error={emailErr} required />
            <FormHelperText sx={{ color: 'red' }}>{emailErr && '올바른 형식이 아닙니다.'}</FormHelperText>
          </FormControl>
          <Button variant="contained" type="submit">
            동의하고 회원가입
          </Button>
          <Box margin="auto">
            <Typography className="term-typo" component="span" color="primary.main">
              이용약관
            </Typography>
            ,
            <Typography className="term-typo" component="span" color="primary.main">
              개인정보 수집 및 이용
            </Typography>
            ,
            <Typography className="term-typo" component="span" color="primary.main">
              개인정보 제공{' '}
            </Typography>
            <Typography className="term-typo" component="span">
              내용을 확인하였고 동의합니다.
            </Typography>
          </Box>
        </Box>
      </StepMain>
    </Step2Wrap>
  );
}

const Step2Wrap = styled(Box)`
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
