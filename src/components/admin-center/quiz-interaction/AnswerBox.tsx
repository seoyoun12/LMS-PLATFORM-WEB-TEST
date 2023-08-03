import { LessonQuizResponseDto } from '@common/api/Api'
import { Box, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'

interface Props {
  item: LessonQuizResponseDto
}

function AnswerBox({item}:Props) {
  return (
    <Box
    width='100%'
    display='flex'
    flexDirection='column'
    gap='0.5rem'
    >
    {item.lessonQuizTypeEnum !== 'ALARM' && <Typography alignSelf='flex-start'>정답</Typography>}
    {
      item.lessonQuizTypeEnum === "OX_QUIZ" && (
        <RadioGroup row>
          <FormControlLabel value={item.itemO} control={<Radio />} label="O" />
          <FormControlLabel value={item.itemX} control={<Radio />} label="X" />
        </RadioGroup>
      )}
      {
      item.lessonQuizTypeEnum === "MULTIPLE_CHOICE" && (  
        <TextField
        id="outlined-basic"    
        variant="outlined"
        value={item.answer}
        sx={{ flex:1, height:'100%'}}
        size='small'
        fullWidth
        />
      )}
    </Box>
  )
}

export default AnswerBox