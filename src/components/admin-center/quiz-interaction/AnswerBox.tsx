import { LessonQuizResponseDto } from '@common/api/Api'
import { Box, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { SyntheticEvent } from 'react'

interface Props {
  form: Partial<LessonQuizResponseDto>
  onFormChange: (e: SyntheticEvent) => void
}

function AnswerBox({form, onFormChange}:Props) {
  return (
    <Box
    width='100%'
    display='flex'
    flexDirection='column'
    gap='0.5rem'
    >
    {form?.lessonQuizTypeEnum
    !== 'ALARM' && <Typography alignSelf='flex-start'>정답</Typography>}
    {
      form?.lessonQuizTypeEnum
      === "OX_QUIZ" && 
          <RadioGroup name='answer' row onChange={onFormChange}>
           <FormControlLabel
            value={form?.itemO}
            control={<Radio />}
            label="O"
            checked={form?.answer === form?.itemO}
            />
           <FormControlLabel value={form?.itemX} control={<Radio />} label="X" checked={form?.answer === form?.itemX} />
          </RadioGroup> 
      }
      {
      form?.lessonQuizTypeEnum
      === "MULTIPLE_CHOICE" && 
        <TextField
          name='answer'
          id="outlined-basic"
          variant="outlined"
          value={form?.answer}
          sx={{ flex:1, height:'100%' }}
          size='small'
          fullWidth
          onChange={onFormChange}
        />
      }
    </Box>
  )
}

export default AnswerBox