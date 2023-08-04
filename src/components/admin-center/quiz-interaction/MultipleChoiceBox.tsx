import { LessonQuizResponseDto } from '@common/api/Api'
import { Delete } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material'
import { useMemo } from 'react'

interface Props {
  
  form: Partial<LessonQuizResponseDto>;
  onFormChange: (e: React.SyntheticEvent | string, key?: string) => void;
}

function MultipleChoiceBox({form,onFormChange}:Props) {

  const quizBogi = useMemo(() => {
    if(!form) return [];
    return [form.item1, form.item2, form.item3, form.item4]
  }, [form])

  
  return (
    <Box sx={{width:'100%',alignSelf:'flex-start'}}>
      <Typography >보기</Typography>
      <Box
        width='100%'
        display='flex'
        flexDirection='column'
        gap='1rem'
        marginTop='1rem'
        >
      {
        quizBogi.map((_,index) => (
        <Box
          key={index}
          display='flex'
          justifyContent='flex-start'
          alignItems='center'
          gap='1rem'
        >
          <TextField
            name={`item${index+1}`}
            id="outlined-basic"
            label={`보기 ${index+1}`}
            variant="outlined"
            value={form[`item${index+1}`]}
            sx={{flex:1,height:'100%'}}
            size='small'
            onChange={onFormChange}
            />
          <Button sx={{border:'1px solid red',height:'100%'}} onClick={() => onFormChange('', `item${index+1}`)}><Delete/></Button>
          </Box>
          ))}
      </Box>
    </Box>
  )
}

export default MultipleChoiceBox