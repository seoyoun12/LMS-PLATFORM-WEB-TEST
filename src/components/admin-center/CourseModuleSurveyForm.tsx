import useDominCourseModuleSurvey from '@hooks/useDominCourseModuleSurvey';
import RadioBox from '@layouts/AdminCenter/CourseTrafficManagement/common/RadioBox'
import { Box, FormControl, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'

interface Props {
  onChangeSubmitYn: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitYn: "Y" | "N";
  progressRate: number;
  onChangeProgressRate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  surveySeq: number;
  onChangeSurveySeq: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CourseModuleSurveyForm({submitYn, onChangeSubmitYn,progressRate,onChangeProgressRate,surveySeq, onChangeSurveySeq }: Props) {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, error, mutate } = useDominCourseModuleSurvey({page, rowsPerPage});
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
      {
        data?.data.content.map((survey) => (
          <Box key={survey.seq}>
            {survey.title}
          </Box>
        
        ))
      }
    </FormControl>
  )
}
