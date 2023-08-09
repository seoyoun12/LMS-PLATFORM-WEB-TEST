import { Box, Button, Typography } from '@mui/material';
import React from 'react'

interface Props {
  quizAnswer: string;
  itemO: string;
  itemX: string;
  onChoiceAnswer: (str: string) => void
}

function OXQuiz({quizAnswer, itemO, itemX,onChoiceAnswer}: Props) {

  // console.log(quizAnswer,itemO,itemX)
  return (
    <Box
      padding='2rem'
      width='100%'
    >
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        gap='1rem'
        width='90%'
        margin='0 auto'
        >
          <Box
            flex='1'
            display='flex'
            justifyContent='center'
            alignItems='center'
            border='1px solid #03cc03'
            borderRadius='20px'
            overflow='hidden'
            >
            <Button
              sx={{':hover': {
                backgroundColor:'#fff',
                color:'#03cc03',
              },
                width:'100%',
                minHeight:'200px',
                backgroundColor:'#03cc03',
                color:'#fff',
              }}
              onClick={() => onChoiceAnswer(itemO)}
            >
              <Typography align='center' fontSize='96px' fontWeight='bold'>{itemO}</Typography>
            </Button>
          </Box>
          <Box
            flex='1'
            display='flex'
            justifyContent='center'
            alignItems='center'
            border='1px solid #f41'
            borderRadius='20px'
            overflow='hidden'
            >
            <Button
              sx={{':hover': {
                backgroundColor:'#fff',
                color:'#f41',
              },
                width:'100%',
                minHeight:'200px',
                backgroundColor:'#f41',
                color:'#fff',
              }}
              onClick={() => onChoiceAnswer(itemX)}
            >
              <Typography align='center' fontSize='96px' fontWeight='bold'>{itemX}</Typography>
            </Button>
          </Box>
          
      </Box>
    </Box>
  )
}

export default OXQuiz