import { SelectChangeEvent } from '@mui/material';
import  { useState } from 'react'



export default function useSelect(defaultValue?: string) {

  const [value, setValue] = useState(defaultValue);
  
  const onChange = (e: SelectChangeEvent) => {
    setValue(e.target.value as string);
    console.log(e.target.value);
  }
  return {value, onChange}
}
