import { LessonQuizResponseDto } from '@common/api/Api'
import { Input } from '@mui/material'
import React, { SyntheticEvent } from 'react'

interface Props {
  item: Partial<LessonQuizResponseDto>
  value:number;
  onChange: (e: SyntheticEvent) => void
  text: string;
}

function QuizTimeInput({item, value,onChange,text}:Props) {
  return (
        <>
          <Input
        name='setTimeMin'
        type="number"
        disabled={item.randomTime}
        value={value}
        onChange={onChange}
        /> {text}
        </>
  )
}

export default QuizTimeInput