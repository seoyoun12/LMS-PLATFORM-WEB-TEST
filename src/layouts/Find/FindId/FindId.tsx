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

const headers = [
  { title: 'ID 찾기', value: 1, icon: <Filter1Icon fontSize="large" /> },
  { title: '완료', value: 2, icon: <Filter2Icon fontSize="large" /> },
  // { title: '가입완료', value: 3 ,icon:<Filter3Icon fontSize="large" /> },
];

export function FindId() {
  const [stepNumber, setStepNumber] = useState(1);
  const [idArr, setIdArr] = useState<{ username: string; createdDTime: string }[]>();

  const handleStepChange = () => {
    setStepNumber(2);
  };

  const handleIdsChange = (idArr: { username: string; createdDTime: string }[]) => {
    setIdArr(idArr);
  };

  return (
    <FindIdWrap>
      <FindHeader value={stepNumber} title={'아이디 찾기'} headers={headers} />
      {stepNumber === 1 && <Step1 handleStepChange={handleStepChange} handleIdsChange={handleIdsChange} />}
      {stepNumber === 2 && <Step2 idArr={idArr} />}
    </FindIdWrap>
  );
}

const FindIdWrap = styled(Box)``;
