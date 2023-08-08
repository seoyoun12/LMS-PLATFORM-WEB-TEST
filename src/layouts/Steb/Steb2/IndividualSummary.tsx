import styled from '@emotion/styled';
import { Box, Typography, autocompleteClasses } from '@mui/material';
import React, { useEffect, useState } from 'react';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { getTerms } from '@common/api/terms';

interface Props {
  isIndividualCheck: boolean;
  setIsIndividualCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

export function IndividualSummary({ setIsIndividualCheck, isIndividualCheck }: Props) {
  const [data, setData] = useState('');

  useEffect(() => {
    async function getGetTerms() {
      const data = await getTerms({ termType: 'PERSONAL_INFORMATION_TERMS' });
      setData(data.data.content);
    }
    getGetTerms();
  }, []);

  return (
    <IndividualSummaryWrap mt={2}>
      <SummaryBox>
        {data.split('\n').map((item,index) => (
          <Box key={index}>{item}</Box>
        ))}
      </SummaryBox>
      <Box
        className="scroll-to-box"
        onClick={() => setIsIndividualCheck(prev => !prev)}
        sx={{
          width: '80%',
          display:"flex",
          alignItems:"center",
          cursor: 'pointer',
          margin: '2rem auto 0'
        }}
      >
        {
        isIndividualCheck
        ? <RadioButtonCheckedIcon sx={{ color: '#3498db' }} />
        : <RadioButtonUncheckedIcon sx={{ color: '#b1b1b1' }} />
        }
        <ConfirmAgreementBox>
        <Typography className='agreement'>개인정보 수집 및 이용 동의합니다.
        <span className='accent-word'>(필수)</span>
        </Typography>
        
        </ConfirmAgreementBox>
      </Box>
    </IndividualSummaryWrap>
  );
}

const IndividualSummaryWrap = styled(Box)``;
const SummaryBox = styled(Box)`
  width: 80%;
  margin: 0 auto;
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

const ConfirmAgreementBox = styled(Box)`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
  margin: 0 auto;
  width:80%;
  .agreement {
    font-size: 24px;
    font-weight: bold;
  }
  .accent-word {
    font-size: 24px;
    font-weight: bold;
  }
  @media screen and (max-width: 514px) {
    
    .agreement {
      font-size: 16px;
      font-weight: bold;
    }
    .accent-word{
      align-self:flex-end;
      font-size: 14px;
      color: #ed1818;
      font-weight: bold;
    }
  }
`;
