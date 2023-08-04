import { LessonQuizResponseDto } from '@common/api/Api'
import { Box, TextField, Typography } from '@mui/material'
import { SyntheticEvent } from 'react'

interface Props {
  form: Partial<LessonQuizResponseDto>
  
  onFormChange: (e: SyntheticEvent) => void
}
function FeedbackBox({form,onFormChange}:Props) {
  console.log(form);
  return (
    <Box
    marginTop='1rem'
    display='flex'
    flexDirection='column'
    gap='0.5rem'
    >
    <Typography>피드백</Typography>
    <TextField
      name='feedback'
      id="outlined-basic"    
      variant="outlined"
      value={form?.feedback}
      sx={{
        flex:1,
        height:'100%'
      }}
      size='small'
      fullWidth
      onChange={onFormChange}
      />
  </Box>
  )
}

export default FeedbackBox