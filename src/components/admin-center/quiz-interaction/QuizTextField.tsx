import { TextField } from '@mui/material'
import React, { SyntheticEvent } from 'react'

interface Props {
  name: string
  label: string
  value:string;
  onChange: (e:SyntheticEvent) => void;
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
  variant?: 'filled' | 'outlined' | 'standard';
}

function QuizTextField({name,label,onChange,value,multiline,fullWidth,variant = 'outlined',rows = 1}:Props) {
  return (
    <TextField
    name={name}
    id="outlined-basic"
    label={label}
    variant={variant}
    value={value}
    rows={rows}
    multiline={multiline}
    onChange={onChange}
    fullWidth={fullWidth}
    />
  )
}

export default QuizTextField