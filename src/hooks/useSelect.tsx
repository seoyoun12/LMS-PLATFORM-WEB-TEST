import { SelectChangeEvent } from '@mui/material';
import  { useState } from 'react'


interface Props<T> {
  defaultValue?: T;
  
}


export default function useSelect<T>({defaultValue}: Props<T>) {

  const [value, setValue] = useState(defaultValue);
  
  const onChange = (e: SelectChangeEvent) => {
    setValue(e.target.value as unknown as T);
    console.log(e.target.value);
  }
  return {value, onChange}
}
