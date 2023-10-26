import { FormLabel, Radio, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'


interface Props {
  title: string;
  label1: string;
  label2: string;
  label3?: string;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value1: string | number | null;
  value2: string | number | null;
  value3?: string | number | null;
  checked1: boolean;
  checked2: boolean;
  checked3?: boolean;
}

function CourseRadioBox({ onChange, value1, value2, value3, checked1, checked2, checked3, title, label1, label2, label3 }: Props) {
  return (
    <Box sx={{display:'flex', flexDirection:'column',alignItems:'flex-start',width:'100%',maxWidth:'380px',justifyContent:'flex-start'}}>
    <Typography sx={{minWidth:'140px'}}>{title}</Typography>
    <Box>
      <Radio
        value={value1}
        onChange={onChange}
        checked={checked1}
      />
      <FormLabel>{label1}</FormLabel>
      <Radio
        value={value2}
        onChange={onChange}
        checked={checked2}
      />
      <FormLabel>{label2}</FormLabel>
      <Radio
        value={value3}
        onChange={onChange}
        checked={checked3}
      />
      <FormLabel>{label3}</FormLabel>
    </Box>
  </Box>
  )
}

export default CourseRadioBox