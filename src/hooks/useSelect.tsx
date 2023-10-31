import { SelectChangeEvent } from '@mui/material';
import  { useState } from 'react'


interface Props<T> {
  defaultValue?: T;
  
}


export default function useSelect<T>({defaultValue}: Props<T>) {

  const [value, setValue] = useState(defaultValue);

  const onChange = (e: SelectChangeEvent | string) => {
    if(typeof e === 'string') return setValue(e as T);
    setValue(e.target.value as T);
    console.log(e.target.value);
  }
  return {value,setValue, onChange}
}
