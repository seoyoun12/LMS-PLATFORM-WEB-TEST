import styled from '@emotion/styled'
import { Download } from '@mui/icons-material'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import Whole from './statistics/Whole'
import FluctuationInBusiness from './statistics/FluctuationInBusiness'
import RegistrationAddress from './statistics/RegistrationAddress'
import FluctuationByPeriod from './statistics/FluctuationByPeriod'
import FluctuationByBusiness from './statistics/FluctuationByBusiness'
import YearlyAgeByBusiness from './statistics/YearlyAgeByBusiness'
import ComparisonAgeByYearly from './statistics/ComparisonAgeByYearly'
import useStatistics from '@hooks/useStatistics'
import { useState } from 'react'
import { Spinner } from '@components/ui'

interface Queries {
  year: number;
  courseClassSeq?: number;
  courseSeq?: number;
}
const currentYear = new Date().getFullYear();
const defaultYearArray = Array.from({length: (currentYear - 2021) + 1}, (_, i) => 2021 + i)

export default function Overall() {
  const [queries, setQueries] = useState<Queries>(null)
  const { data, mutate, course, courseMutate, period, periodMutate,isCourseValidating,isStepValidating } = useStatistics({
    year: queries?.year || null,
    courseSeq: queries?.courseSeq || null,
    courseClassSeq: queries?.courseClassSeq || null
  });
  



  const onChangeQueries = async(e: SelectChangeEvent<unknown>) => {
    const { name,value } = e.target;

    setQueries({
      ...queries,
      [name]: value
    })

    name === 'year' && await courseMutate();
    name === 'courseSeq' && await periodMutate();
  }


  
  return (
    <Wrapper>
      
      <Header>
        <Title>현황 통계</Title>
        <ExcelDownloadButton>
          <Typography>(전체) 통계 엑셀 다운로드</Typography>
          <Download />
        </ExcelDownloadButton>
      </Header>
      {
      (isStepValidating || isCourseValidating)
      ? <Spinner />
      : data
      ? <Main>
        <SelectGroup>
          <FormControl>
            <InputLabel id="year">교육년도</InputLabel>
            <StyledSelect
              name="year"
              onChange={(e) => onChangeQueries(e)}
              value={queries?.year || ''}
              variant="outlined"
              labelId='year'>
              {
                defaultYearArray.map((year, i) => (
                  <MenuItem key={i} value={year || ''}>{year}</MenuItem>
                ))
              }
            </StyledSelect>
          </FormControl>

          <FormControl>
            <InputLabel id="course">과정</InputLabel>
            <StyledSelect
              name="courseSeq"
              onChange={(e) => onChangeQueries(e)}
              variant="outlined"
              value={queries?.courseSeq || ''}
              labelId='course'>
              {
                course ?
                course.data.map((course, i) => (
                  <MenuItem key={i} value={course.courseSeq || ''}>{course.courseName}</MenuItem>
                ))
                : <MenuItem value={0}>연도를 선택해주세요.</MenuItem>
              }
            </StyledSelect>
          </FormControl>

          <FormControl>
            <InputLabel id="period">과정기수</InputLabel>
            <StyledSelect
              name="courseClassSeq"
              value={queries?.courseClassSeq || ''}
              onChange={(e) => onChangeQueries(e)}
              variant="outlined"
              labelId='period'>
              {
                period ?
                period.data.map((period, i) => (
                  <MenuItem key={i} value={period.courseClassSeq || ''}>{period.yearAndStep}</MenuItem>
                ))
                : <MenuItem value={0}>과정을 선택해주세요.</MenuItem>
              }
            </StyledSelect>
          </FormControl>

          <ConfirmSearchButton variant="contained">통계 확인</ConfirmSearchButton>
          
        </SelectGroup>
        <InfoMessage>"교육년도, 과정, 과정기수"를 선택하고 "통계 확인"을 눌러 확인하세요.</InfoMessage>
        <Whole data={data.data.statisticsTransEduIntegratedResponseDto} />
        <FluctuationInBusiness data={data.data.statisticsTransEduCategoryResponseDto} />
        <RegistrationAddress data={data.data.statisticsTransEduCarRegisteredRegionResultResponseDto} />
        <FluctuationByPeriod data={data.data.statisticsTransEduStepResponseDto} />
        <FluctuationByBusiness data={data.data.statisticsTransEduCategoryIncreaseResponseDto} />
        <YearlyAgeByBusiness data={data.data.statisticsTransEduCategoryAgeResponseDto} />
        <ComparisonAgeByYearly data={data.data.statisticsTransEduYearAgeResponseDto} />
      </Main>
      : null
      }
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