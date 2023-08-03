import React, { SyntheticEvent } from 'react'
import QuizTextField from './QuizTextField'
import { Box, Checkbox, Typography } from '@mui/material'
import QuizTimeInput from './QuizTimeInput'
import { LessonQuizResponseDto } from '@common/api/Api'
import RandomTimeBox from './RandomTimeBox'

interface Props {
  item: Partial<LessonQuizResponseDto>
  form: Partial<LessonQuizResponseDto>
  onFormChange: (e: SyntheticEvent) => void

}

function TabsCommonEntry({item, form, onFormChange}:Props) {
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
      value={form.alarmContent || item.alarmContent}
      onChange={onFormChange}
      fullWidth
    />
    <RandomTimeBox form={form} item={item} onFormChange={onFormChange} />
    <QuizTextField
      name='quizContent'
      label={item.lessonQuizTypeEnum === "ALARM" ? '알람 메세지' : '퀴즈 본문'}
      multiline
      rows={item.lessonQuizTypeEnum === "ALARM" ? 8 : 4}
      variant='filled'
      value={form.quizContent || item.quizContent}
      fullWidth
      onChange={onFormChange}
      />
  </Box>
  )
}

export default TabsCommonEntry