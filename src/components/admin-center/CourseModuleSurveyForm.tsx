import styled from '@emotion/styled';
import useDominCourseModule from '@hooks/useDominCourseModule';
import RadioBox from '@layouts/AdminCenter/CourseTrafficManagement/common/RadioBox'
import CourseTablePagination from '@layouts/AdminCenter/CourseTrafficManagement/feature/CourseTablePagination';
import { Box, FormControl, InputAdornment, TextField } from '@mui/material'
import { format } from 'date-fns';
import React, { useState } from 'react'

interface Props {
  onChangeSubmitYn: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitYn: "Y" | "N";
  progressRate: number;
  moduleName: string;
  surveySeq: number;
  onChangeProgressRate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSurveySeq: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeModuleName: (e: string) => void;
}

export default function CourseModuleSurveyForm({ moduleName,onChangeModuleName, submitYn, progressRate, surveySeq, onChangeSubmitYn,onChangeProgressRate, onChangeSurveySeq }: Props) {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data } = useDominCourseModule({page, rowsPerPage});

  return (
    <FormControl fullWidth sx={{display:'flex',justifyContent:'center', alignItems:'center', flexDirection:'column', gap:'2rem'}}>
      <RadioBox
        value={submitYn}
        defaultValue='Y'
        name='surveyYn'
        id='surveyYn'
        label='필수 제출 여부'
        radios={['Y','N']}
        onChange={onChangeSubmitYn}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="최소 진도율(%)"
        type="number" 
        value={progressRate}
        onChange={onChangeProgressRate}
        InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment>}}
      />
      <SurveyWrapper>
        <SurveyHead>
          <SurveyHeadItem flex={0.1}>아이디</SurveyHeadItem>
          <SurveyHeadItem flex={0.5}>설문지 제목</SurveyHeadItem>
          <SurveyHeadItem flex={0.1}>상태</SurveyHeadItem>
          <SurveyHeadItem flex={0.2}>생성일</SurveyHeadItem>
          <SurveyHeadItem flex={0.1}>선택</SurveyHeadItem>
        </SurveyHead>
      {
        data?.data.content.map((survey) => (
          <SurveyBody key={survey.seq}>
            <Item flex={0.1}>{survey.seq}</Item>
            <Item flex={0.5}>{survey.title}</Item>
            <Item flex={0.1}>{survey.status === 1 ? '활성' : '비활성'}</Item>
            {/* dateformat */}
            <Item flex={0.2}>{format(new Date(survey.createdDtime), 'yy년 M월 dd일')}</Item>
            <Item flex={0.1}>
              <CustomRadio
                type="radio"
                className="option-input radio"
                value={survey.seq}
                onChange={(e) => {
                  onChangeSurveySeq(e)
                  onChangeModuleName(survey.title)
                }}
                // 
                checked={+surveySeq === survey.seq}
                />
            </Item>
          </SurveyBody>
        ))
      }
      <CourseTablePagination
        page={page}
        count={data?.data.totalElements ?? 0}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
      </SurveyWrapper>
    </FormControl>
  )
}


const SurveyWrapper = styled(Box)`
  width: 100%;
  height: 400px;
  overflow-y: scroll;
`


const CustomRadio = styled.input`
  appearance: none; /* 기본 라디오 버튼 스타일 숨김 */
  cursor: pointer;
  width: 24px;
  height: 24px;
  border: 2px solid #c7c7c7;
  border-radius: 50%;
  padding: 4px;
  align-items: center;
  justify-content: center;
  display: flex;
  margin: 0 0.5rem;
  
  &:hover {
    background-color: #f5f5f5;
  }
  &:checked {
    background-color: rgb(191, 49, 51);
    animation: radio .5s ease;
  }
  @keyframes radio {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.75);
    }
    50% {
      transform: scale(1.25);
    }
    75% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const SurveyBody = styled(Box)`
  display:flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 48px;
  border-bottom: 1px solid #d8d8d8; 
`



const Item = styled(Box)<{flex: number}>`
  flex: ${props => props.flex};
  display:flex;
  align-items: center;
  justify-content: center; 
  
`

const SurveyHead = styled(SurveyBody)`
  
`
const SurveyHeadItem = styled(Item)`
  font-weight: 700;
`