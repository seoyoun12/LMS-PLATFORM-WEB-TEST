import RadioBox from '@layouts/AdminCenter/CourseTrafficManagement/common/RadioBox'
import { FormControl, InputAdornment, TextField } from '@mui/material'
import React from 'react'

interface Props {
  onChangeSubmitYn: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitYn: "Y" | "N";
  progressRate: number;
  onChangeProgressRate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  surveySeq: number;
  onChangeSurveySeq: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CourseModuleSurveyForm({submitYn, onChangeSubmitYn,progressRate,onChangeProgressRate,surveySeq, onChangeSurveySeq }: Props) {
  
  return (
    <FormControl fullWidth sx={{display:'flex',justifyContent:'center', alignItems:'center', flexDirection:'column', gap:'2rem'}}>
      <RadioBox
        value={submitYn}
        defaultValue='Y'
        name='surveyYn'
        id='surveyYn'
        label='설문'
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

    </FormControl>
  )
}
