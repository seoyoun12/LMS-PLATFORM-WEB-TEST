import styled from '@emotion/styled';
import { Box, FormControl, InputLabel, Select, Typography, MenuItem, TextField, Button } from '@mui/material';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import React from 'react';

interface Props {
  isIndividual: boolean;
  setIsIndividual: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CompanyInfo({ isIndividual, setIsIndividual }: Props) {
  return (
    <CompanyInfoWrap>
      <Box>
        <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center">
          <HorizontalRuleRoundedIcon sx={{ transform: 'scale(1,2)', color: '#3498db' }} />
          <span>업체정보</span>
        </Typography>
      </Box>
      <Box>
        <Typography mb={1}>업종</Typography>
        <FormControl fullWidth>
          {/* <InputLabel id="student">선택</InputLabel> */}
          <Select
            labelId="job"
            id="job"
            // value={generation}
            // onChange={e => {
            //   setGeneration(e.target.value);
            // }}
          >
            {/* {eduDate.map(item => (
                      <MenuItem key={item.generation} value={item.generation}>
                        {item.generation}기 / {item.eduStart} ~ {item.eduEnd}
                      </MenuItem>
                    ))} */}
            <MenuItem>zz</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mt={2}>
        <Typography mb={1}>업종구분</Typography>
        <FormControl fullWidth>
          {/* <InputLabel id="student">선택</InputLabel> */}
          <Select labelId="jobType" id="jobType">
            <MenuItem>zz</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Typography mt={2} mb={1}>
        회사명
      </Typography>
      <TextField placeholder="회사명 또는 차량등록지역" fullWidth />
      <Box display="flex" mt={2}>
        <Box>※</Box>
        <Box display="flex" flexDirection="column" ml={1}>
          <Typography>자동차등록증 상의 회사명(상호)를 반드시 국문으로 입력하시기 바랍니다.</Typography>
          <ExampleMessege>예시 {'>'} ss물류 → 에스에스물류</ExampleMessege>
        </Box>
      </Box>
      <Box display="flex">
        <Box>※</Box>
        <Box display="flex" flexDirection="column" ml={1}>
          <Typography>회사명이 없을 경우 차량등록지역을 입력해 주십시오.</Typography>
          <ExampleMessege>예시 {'>'} 공주시</ExampleMessege>
        </Box>
      </Box>
      <Typography>예약구분</Typography>
      <ReservationType>
        <Button variant="outlined" color={isIndividual ? 'primary' : 'neutral'} onClick={() => setIsIndividual(true)} fullWidth>
          개인
        </Button>
        <Button variant="outlined" color={!isIndividual ? 'primary' : 'neutral'} onClick={() => setIsIndividual(false)} fullWidth>
          단체
        </Button>
      </ReservationType>
    </CompanyInfoWrap>
  );
}

const CompanyInfoWrap = styled(Box)``;

const ExampleMessege = styled(Typography)`
  color: red;
`;
const ReservationType = styled(Box)`
  display: flex;
  gap: 2rem;
`;
