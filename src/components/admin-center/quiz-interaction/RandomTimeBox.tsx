import { Box, Checkbox, Typography } from '@mui/material'
import QuizTimeInput from './QuizTimeInput'
import { LessonQuizResponseDto } from '@common/api/Api'
import { SyntheticEvent } from 'react'


interface Props {
  form: Partial<LessonQuizResponseDto>
  onFormChange: (e: SyntheticEvent) => void
  onCheckChange: (e: SyntheticEvent) => void
}

function RandomTimeBox({ form, onFormChange,onCheckChange}:Props) {
  
  return (
    <Box display='flex' justifyContent='flex-start' alignItems='center' gap='1rem'>
    
    {
      form &&
      <>
      <Checkbox
        name='randomTime'
        checked={form.randomTime}
        onChange={onCheckChange}
      />
      <Typography sx={{minWidth:'80px'}}>시간 랜덤</Typography>
      <QuizTimeInput
        name='setTimeMin'
        onChange={onFormChange}
        text='분'
        value={form.setTimeMin}
      />
      <QuizTimeInput
        name='setTimeSecond'
        onChange={onFormChange}
        text='초'
        value={form.setTimeSecond}
      />
    </>
    }
  </Box>
  )
}

export default RandomTimeBox