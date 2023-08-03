import { LessonQuizResponseDto } from '@common/api/Api'
import { Box, TextField, Typography } from '@mui/material'

interface Props {
  form: Partial<LessonQuizResponseDto>
  item: Partial<LessonQuizResponseDto>
}
function FeedbackBox({form, item}:Props) {
  return (
    <Box
    marginTop='1rem'
    display='flex'
    flexDirection='column'
    gap='0.5rem'
    >
    <Typography>피드백</Typography>
    <TextField
      id="outlined-basic"    
      variant="outlined"
      value={form.feedback || item.feedback}
      sx={{
        flex:1,
        height:'100%'
      }}
      size='small'
      fullWidth
      />
  </Box>
  )
}

export default FeedbackBox