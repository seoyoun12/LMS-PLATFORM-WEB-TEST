import { SelectChangeEvent } from "@mui/material"
import { ChangeEvent, useCallback, useState } from "react"


interface Props{
  initialValue: string | number | File | null;
  type: 'string' | 'number' | 'file';
}


export function useNewInput({initialValue,type}: Props) {
    const [value , setValue] = useState(initialValue)
    const [preview , setPreview] = useState<string | ArrayBuffer | null>('')
    

    const onChangeValue = (e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string> ) => {
      if(typeof e === 'string' || typeof e === 'number') setValue(e)
      else if(e instanceof Object){
        setValue(e.target.value);
      }
    }

    const onChangeFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files[0];
      if(file) {
        const reader = new FileReader();
        reader.onload = e => {
          const preview = e.target.result;
          if(preview) {
            setValue(file); // metadata
            setPreview(preview); // base64
          }
        }
        reader.readAsDataURL(file);
      }
    },[])

    const onRemoveFile = () => {
      setValue(null);
      setPreview(null);
    }
    
    return {
      value,
      preview,
      onChange: type === 'file' ? onChangeFile : onChangeValue,
      onRemoveFile
    }
}
