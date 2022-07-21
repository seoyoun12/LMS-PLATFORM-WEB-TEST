import { Container, styled } from '@mui/material';
import { StebHeader } from '../StebHeader';
import { useState } from 'react';
import { EduOverview } from './EduOverview';
import { CompanyInfo } from './CompanyInfo';
import { StudentInfo } from './StudentInfo';

export function Steb2() {
  const [value, setValue] = useState<string>();
  const [isIndividual, setIsIndividual] = useState(true); //individual or team button
  return (
    <Steb2Wrap>
      <StebHeader value={2} />
      <Steb2BodyContainer maxWidth="sm">
        <EduOverview />
        <CompanyInfo isIndividual={isIndividual} setIsIndividual={setIsIndividual} />
        <StudentInfo />
      </Steb2BodyContainer>
    </Steb2Wrap>
  );
}

const Steb2Wrap = styled(Container)``;

const Steb2BodyContainer = styled(Container)``;
