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
  { title: '본인인증', value: 1, icon: <Filter1Icon fontSize="large" /> },
  { title: 'PW 변경', value: 2, icon: <Filter2Icon fontSize="large" /> },
  { title: '완료', value: 3, icon: <Filter3Icon fontSize="large" /> },
];

export function FindPw() {
  const [stepNumber, setStepNumber] = useState(2);
  const [phone, setPhone] = useState<string>();
  const [name, setName] = useState<string>(); //유저의 이름(ex. 홍길동)

  const handleNiceChange = (nicePhone: string, niceName: string) => {
    setPhone(nicePhone);
    setName(niceName);
  };

  const handleStepChange = (stepNumber: number) => {
    setStepNumber(stepNumber);
  };

  return (
    <FindPwWrap>
      <FindHeader value={stepNumber} title={'비밀번호 변경'} headers={headers} />
      <FIndPwStepsWrap>
        {stepNumber === 1 && (
          <Step1
            handleStepChange={handleStepChange}
            handleNiceChange={handleNiceChange}
          />
        )}
        {stepNumber === 2 && (
          <Step2 handleStepChange={handleStepChange} resPhone={phone} resName={name} />
        )}
        {stepNumber === 3 && <Step3 />}
      </FIndPwStepsWrap>
    </FindPwWrap>
  );
}

const FindPwWrap = styled(Box)``;
const FIndPwStepsWrap = styled(Box)`
  padding: 0 8px 24px 8px;
`;
