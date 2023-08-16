
import { Input, Typography } from '@mui/material'
import React, { SyntheticEvent } from 'react'

interface Props {
  name:string;
  value:number;
  onChange: (e: SyntheticEvent) => void
  text: string;
}

function QuizTimeInput({ value, text, name, onChange }:Props) {
  return (
    <>
      <Input
        name={name}
        type="number"
        value={value}
        onChange={onChange}
      /> 
      <Typography> {text} </Typography>
      </>
        
  )
}

export default QuizTimeInput