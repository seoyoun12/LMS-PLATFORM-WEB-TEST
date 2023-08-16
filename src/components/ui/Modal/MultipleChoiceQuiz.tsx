import { IQuiz, IQuizTime } from '@layouts/Lesson/LessonContentVideo'
import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import QuizItemButton from './QuizItemButton';


interface Props {
  onCloseModal: () => void;
  onChoiceAnswer: (answer: string) => void;
  quizItem: string[];
}



function MultipleChoiceQuiz({quizItem, onCloseModal, onChoiceAnswer}: Props) {
  
  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'.75rem',width:'90%',alignItems:'center',justifyContent:'center',margin:'2rem 0 '}}>
    {
      quizItem.map((item) => (
      <QuizItemButton
        key={item}
        item={item}
        bgColor='rgb(194,51,51)'
        onClick={onChoiceAnswer}
        />
      ))
    }
  </Box>
  )
}

export default MultipleChoiceQuiz