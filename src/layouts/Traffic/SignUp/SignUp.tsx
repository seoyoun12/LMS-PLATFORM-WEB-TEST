import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from '@components/common';
import { signUp } from '@common/api/auth';
import { useSnackbar } from '@hooks/useSnackbar';
import { YN } from '@common/constant';
import styled from '@emotion/styled';
import { StepHeader } from './StepHeader';
import { Step1, Step2, Step3 } from './Step';

const headers = [
  { title: '본인인증', value: 1 },
  { title: 'ID생성', value: 2 },
  { title: '가입완료', value: 3 },
];

export function SignUp() {
  const snackbar = useSnackbar();
  const [stepNumber, setStepNumber] = React.useState(1);
  const [resName, setResName] = React.useState<string>();

  const handleStep = (moveStep: number) => {
    setStepNumber(moveStep);
  };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   const name = data.get('name') as string;
  //   const username = data.get('username') as string;
  //   const password = data.get('password') as string;

  //   if (!!name && !!username && !!password) {
  //     try {
  //       return signUp({ name, password, username, emailYn: YN.NO, smsYn: YN.NO });
  //     } catch (e: any) {
  //       snackbar({ variant: 'error', message: e.data.message });
  //     }
  //   }
  // };

  return (
    <SignUpWrap>
      <StepHeader value={stepNumber} title={'충남교통연수원'} headers={headers} />
      {stepNumber === 1 && <Step1 handleStep={handleStep} setResName={setResName} />}
      {stepNumber === 2 && <Step2 handleStep={handleStep} resName={resName} />}
      {stepNumber === 3 && <Step3 handleStep={handleStep} resName={resName} />}
    </SignUpWrap>
  );
}

const SignUpWrap = styled(Box)``;
