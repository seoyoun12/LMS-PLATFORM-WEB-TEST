import { SyntheticEvent } from 'react'
import QuizTextField from './QuizTextField'
import { Box } from '@mui/material'

import { LessonQuizResponseDto } from '@common/api/Api'
import RandomTimeBox from './RandomTimeBox'

interface Props {
  
  form: Partial<LessonQuizResponseDto>
  onFormChange: (e: SyntheticEvent) => void
  onCheckChange: (e: SyntheticEvent) => void
}

function TabsCommonEntry({ form, onFormChange,onCheckChange}:Props) {
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      alignItems='center'
      gap='1rem'
      sx={{marginTop: '1rem'}}>
    <QuizTextField
      name='alarmContent'
      label="퀴즈 제목"
      value={form?.alarmContent}
      onChange={onFormChange}
      fullWidth
    />
    <RandomTimeBox form={form} onFormChange={onFormChange} onCheckChange={onCheckChange} />
    <QuizTextField
      name='quizContent'
      label={form?.lessonQuizTypeEnum === "ALARM" ? '알람 메세지' : '퀴즈 본문'}
      multiline
      rows={form?.lessonQuizTypeEnum === "ALARM" ? 8 : 4}
      variant='filled'
      value={form?.quizContent}
      fullWidth
      onChange={onFormChange}
      />
  </Box>
  )
}

export default TabsCommonEntry