import styled from '@emotion/styled';
import useDominCourseModuleSurvey from '@hooks/useDominCourseModuleSurvey';
import RadioBox from '@layouts/AdminCenter/CourseTrafficManagement/common/RadioBox'
import { Box, FormControl, InputAdornment, TextField } from '@mui/material'
import { format } from 'date-fns';
import React, { useState } from 'react'

interface Props {
  onChangeSubmitYn: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitYn: "Y" | "N";
  progressRate: number;
  onChangeProgressRate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  surveySeq: number;
  onChangeSurveySeq: (e: React.ChangeEvent<HTMLInputElement>) => void;
  moduleName: string;
  onChangeModuleName: (e: string) => void;
}

export default function CourseModuleSurveyForm({ moduleName,onChangeModuleName, submitYn, progressRate, surveySeq, onChangeSubmitYn,onChangeProgressRate, onChangeSurveySeq }: Props) {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data } = useDominCourseModuleSurvey({page, rowsPerPage});

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
        <SurveyHead>
          <SurveyHeadItem>아이디</SurveyHeadItem>
          <SurveyHeadItem>설문지 제목</SurveyHeadItem>
          <SurveyHeadItem>상태</SurveyHeadItem>
          <SurveyHeadItem>생성일</SurveyHeadItem>
          <SurveyHeadItem>선택</SurveyHeadItem>
        </SurveyHead>
      {
        data?.data.content.map((survey) => (
          <Survey key={survey.seq}>
            <Item>{survey.seq}</Item>
            <Item>{survey.title}</Item>
            <Item>{survey.status === 1 ? '활성' : '비활성'}</Item>
            {/* dateformat */}
            <Item>{format(new Date(survey.createdDtime), 'yy년 M월 dd일')}</Item>
            <Item>
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
          </Survey>
        ))
      }
    </FormControl>
  )
}



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

const Survey = styled(Box)`
  display:flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #d8d8d8;
  padding-bottom: .5rem;
  
`



const Item = styled(Box)`
  flex:1;
  display:flex;
  align-items: center;
  justify-content: center; 
  
`

const SurveyHead = styled(Survey)`
  
  
`
const SurveyHeadItem = styled(Item)`
  font-weight: 700;
`