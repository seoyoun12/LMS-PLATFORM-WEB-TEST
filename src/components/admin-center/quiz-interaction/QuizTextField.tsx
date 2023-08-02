import { TextField } from '@mui/material'
import React, { SyntheticEvent } from 'react'

interface Props {
  name: string
  label: string
  value:string;
  onChange: (e:SyntheticEvent) => void;
}

function QuizTextField({name,label,onChange,value}:Props) {
  return (
    <TextField
    name={name}
    id="outlined-basic"
    label={label}
    variant="outlined"
    value={value}
    fullWidth
    rows={2}
    onChange={onChange}
    />
  )
}

export default QuizTextField