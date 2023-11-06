import styled from '@emotion/styled'
import { Download } from '@mui/icons-material'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import Whole from './statistics/Whole'
import CompletedCourseForBusiness from './statistics/CompletedCourseForBusiness'
import RegistrationAddress from './statistics/RegistrationAddress'
import FluctuationByPeriod from './statistics/FluctuationByPeriod'
import FluctuationByBusiness from './statistics/FluctuationByBusiness'

export default function Overall() {
  return (
    <Wrapper>
      <Header>
      <Title>현황 통계</Title>
      <ExcelDownloadButton>
        <Typography>(전체) 통계 엑셀 다운로드</Typography>
        <Download />
      </ExcelDownloadButton>
      </Header>
      <Main>
        <SelectGroup>

          <FormControl>
            <InputLabel id="year">교육년도</InputLabel>
            <StyledSelect variant="outlined" labelId='year'>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2022">2022</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
            </StyledSelect>
          </FormControl>

          <FormControl>
            <InputLabel id="course">과정</InputLabel>
            <StyledSelect variant="outlined" labelId='course'>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2022">2022</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
            </StyledSelect>
          </FormControl>

          <FormControl>
            <InputLabel id="period">과정기수</InputLabel>
            <StyledSelect variant="outlined" labelId='period'>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2022">2022</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
            </StyledSelect>
          </FormControl>

          <ConfirmSearchButton variant="contained">통계 확인</ConfirmSearchButton>
          
        </SelectGroup>
        <InfoMessage>"교육년도, 과정, 과정기수"를 선택하고 "통계 확인"을 눌러 확인하세요.</InfoMessage>
        <Whole />
        <CompletedCourseForBusiness />
        <RegistrationAddress />
        <FluctuationByPeriod />
        <FluctuationByBusiness />
      </Main>
    </Wrapper>
  )
}

const InfoMessage = styled(Typography)`
  font-size: 0.9rem;
  margin-bottom: 2rem;
`

const ConfirmSearchButton = styled(Button)`
  width: 140px;
  height:48px;
  color:white;
  font-size: 1.15rem;
  margin-left: 1rem;
`

const StyledSelect = styled(Select)`
  width: 180px;
  
`

const SelectGroup = styled(Box)`
  align-self: flex-start;
  display:flex;
  gap: 1rem;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #222;
`

const Main = styled(Box)`
  width: 100%;
  height: auto;
`

const Header = styled(Box)`
  width:100%;
  display:flex;
  justify-content: space-between;
  align-items: center;
  
  margin-top: 3rem;
`;

const ExcelDownloadButton = styled(Button)`
  display:flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  background-color: #38761D;
  color:white;
  font-size: 1.15rem;
  padding: .5rem 1rem;

  &:hover {
    
    background-color: #306719;
  }
`
const Title = styled(Typography)`
  font-weight: bold;
  font-size: 1.5rem;
`

const Wrapper = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 3rem;


`