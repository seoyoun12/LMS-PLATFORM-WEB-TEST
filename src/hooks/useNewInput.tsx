import { SelectChangeEvent } from "@mui/material"
import { ChangeEvent, useCallback, useState } from "react"


interface Props<T>{
  initialValue: T;
  type: 'string' | 'number' | 'file' | 'date';
}


export function useNewInput<T>({initialValue,type}: Props<T>) {
    const [value , setValue] = useState(initialValue)
    const [preview , setPreview] = useState<string | ArrayBuffer | null>('')
    

    const onChangeValue = (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string> | string ) => {
      if(typeof e === 'string' || typeof e === 'number') {
        setValue(e as T)
      } else if(e instanceof Object){
        setValue(e.target.value as T);
      }
      
    }

    const onChangeFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if(typeof e === 'string') return 
      const file = e.target.files[0];
      if(file) {
        const reader = new FileReader();
        reader.onload = e => {
          const preview = e.target.result;
          if(preview) {
            setValue(file as T); // metadata
            setPreview(preview); // base64
          }
        }
        reader.readAsDataURL(file);
      }
    },[])

    const onReset = () => {
      setValue(null);
      setPreview(null);
    }
    
    return {
      value,
      setValue,
      preview,
      onChange: type === 'file' ? onChangeFile : onChangeValue,
      onReset,
      setPreview
      
    }
}
