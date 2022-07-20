import {
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { StebHeader } from '../StebHeader';
import { useState } from 'react';
import { EduOverview } from './EduOverview';
import { CompanyInfo } from './CompanyInfo';
import { StudentInfo } from './StudentInfo';
import { useInput } from '@hooks/useInput';

const eduInfo = {
  eduList: [
    { eduType: '보수', eduEnType: 'BOSU', jobType: '화물', jobEnType: 'FRE' },
    { eduType: '보수', eduEnType: 'BOSU', jobType: '여객', jobEnType: 'PASS' },
    { eduType: '신규', eduEnType: 'FRE', jobType: '수물', jobEnType: '뭐' },
    { eduType: '강화', eduEnType: 'FRE', jobType: '취객', jobEnType: '어쩔' },
    // { eduType: '화물보수', eduEnType: 'FRE', jobType:'' , jobEnType:'' },
  ],
  holyShit: [
    { generation: 405, eduStart: '2022-07-09', eduEnd: '2022-07-10' },
    { generation: 406, eduStart: '2022-07-19', eduEnd: '2022-07-20' },
    { generation: 407, eduStart: '2022-07-29', eduEnd: '2022-07-30' },
  ],
};

export function Steb2() {
  const [value, setValue] = useState<string>();
  const [isIndividual, setIsIndividual] = useState(true); //individual or team button
  return (
    <Steb2Wrap>
      <StebHeader value={2} />
      <Steb2BodyContainer maxWidth="sm">
        <EduOverview eduList={eduInfo.eduList} eduDate={eduInfo.holyShit} />
        <CompanyInfo isIndividual={isIndividual} setIsIndividual={setIsIndividual} />
        <StudentInfo />
      </Steb2BodyContainer>
    </Steb2Wrap>
  );
}

const Steb2Wrap = styled(Container)``;

const Steb2BodyContainer = styled(Container)``;
