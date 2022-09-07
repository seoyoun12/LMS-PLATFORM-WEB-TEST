import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { transIndividualSummary } from '@utils/individualSummaries';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

interface Props {
  isIndividualCheck: boolean;
  setIsIndividualCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

export function IndividualSummary({ setIsIndividualCheck, isIndividualCheck }: Props) {
  return (
    <IndividualSummaryWrap mt={2}>
      <SummaryBox>
        {transIndividualSummary.split('\n').map(item => (
          <Box>{item}</Box>
        ))}
      </SummaryBox>
      <Box
        display="flex"
        alignItems="center"
        width="fit-content"
        onClick={() => setIsIndividualCheck(prev => !prev)}
        mt={2}
        mb={2}
        sx={{ cursor: 'pointer' }}
        className="scroll-to-box"
      >
        {isIndividualCheck ? (
          <RadioButtonCheckedIcon sx={{ color: '#3498db' }} />
        ) : (
          <RadioButtonUncheckedIcon sx={{ color: '#b1b1b1' }} />
        )}
        <Typography ml={1}>개인정보 수집 및 이용 동의합니다</Typography>
        <EssentialWord ml={0.5}>(필수)</EssentialWord>
      </Box>
    </IndividualSummaryWrap>
  );
}

const IndividualSummaryWrap = styled(Box)``;
const SummaryBox = styled(Box)`
  border: 1px solid #d7d8da;
  background: #f9f9f9;
  color: #a7a7a7;
  padding: 1rem;
  height: 200px;
  overflow-y: scroll;
`;

const EssentialWord = styled(Typography)`
  color: #ed1818;
`;
