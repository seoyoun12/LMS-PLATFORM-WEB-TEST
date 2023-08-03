import { LessonQuizResponseDto } from '@common/api/Api'
import { Delete } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useMemo } from 'react'

interface Props {
  item: LessonQuizResponseDto;
}

function MultipleChoiceBox({item}:Props) {

  const quizBogi = useMemo(() => {
    return [item.item1, item.item2, item.item3, item.item4]
  }, [item])

  return (
    <Box sx={{width:'100%',alignSelf:'flex-start'}}>
      <Typography >보기</Typography>
      <Box width='100%' display='flex' flexDirection='column' gap='1rem' marginTop='1rem'>
      {
        quizBogi.map((number,index) => (
        <Box
          key={number}
          display='flex'
          justifyContent='flex-start'
          alignItems='center'
          gap='1rem'
        >
          <TextField
            id="outlined-basic"
            label={`보기 ${index+1}`}
            variant="outlined"
            value={number}
            sx={{flex:1,height:'100%'}}
            size='small'
            />
          <Button sx={{border:'1px solid red',height:'100%'}}><Delete/></Button>
          </Box>
          ))}
      </Box>
    </Box>
  )
}

export default MultipleChoiceBox