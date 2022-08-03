import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { useState } from 'react';
import { StepHeader } from '../../Traffic/SignUp/StepHeader';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import Filter1Icon from '@mui/icons-material/Filter1';
import Filter2Icon from '@mui/icons-material/Filter2';
import Filter3Icon from '@mui/icons-material/Filter3';
import { FindHeader } from '../FindHeader/FindHeader';
import { Step3 } from './Step3';

const headers = [
  { title: 'ID 입력', value: 1, icon: <Filter1Icon fontSize="large" /> },
  { title: 'PW 변경', value: 2, icon: <Filter2Icon fontSize="large" /> },
  { title: '완료', value: 3, icon: <Filter3Icon fontSize="large" /> },
];

export function FindPw() {
  const [stepNumber, setStepNumber] = useState(1);
  const [username, setUsername] = useState<string>();

  const handleStepChange = (stepNumber: number) => {
    setStepNumber(stepNumber);
  };

  const handleUsernameChange = (username: string) => {
    setUsername(username);
  };

  return (
    <FindPwWrap>
      <FindHeader value={stepNumber} title={'비밀번호 찾기'} headers={headers} />
      {stepNumber === 1 && <Step1 handleStepChange={handleStepChange} handleUsernameChange={handleUsernameChange} />}
      {stepNumber === 2 && <Step2 handleStepChange={handleStepChange} username={username} />}
      {stepNumber === 3 && <Step3 />}
    </FindPwWrap>
  );
}

const FindPwWrap = styled(Box)``;
