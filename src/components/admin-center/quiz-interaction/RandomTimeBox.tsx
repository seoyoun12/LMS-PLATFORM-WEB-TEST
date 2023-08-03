import { Box, Checkbox, Typography } from '@mui/material'
import QuizTimeInput from './QuizTimeInput'
import { LessonQuizResponseDto } from '@common/api/Api'
import { SyntheticEvent } from 'react'


interface Props {
  item: Partial<LessonQuizResponseDto>
  form: Partial<LessonQuizResponseDto>
  onFormChange: (e: SyntheticEvent) => void
}

function RandomTimeBox({item, form, onFormChange}:Props) {
  return (
    <Box display='flex' justifyContent='flex-start' alignItems='center' gap='1rem'>
    <Checkbox
      name='randomTime'
      
      value={form.randomTime || item.randomTime}
      onChange={onFormChange}
    />
    <Typography sx={{minWidth:'80px'}}>시간 랜덤</Typography>
    <QuizTimeInput
      name='setTimeMin'
      onChange={onFormChange}
      text='분'
      value={form.setTimeMin || item.setTimeMin}
    />
    <QuizTimeInput
      name='setTimeSecond'
      onChange={onFormChange}
      text='초'
      value={form.setTimeSecond || item.setTimeSecond}
    />
  </Box>
  )
}

export default RandomTimeBox