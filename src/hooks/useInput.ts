import { SelectChangeEvent } from "@mui/material"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"



export function useInput<T>(initialState: T): [T, Dispatch<SetStateAction<T>> ,(e: T) => void] {
    const [value , setValue] = useState(initialState)

    const onChangeValue = (e:T ) => {
      if(typeof e === 'string' || typeof e === 'number') setValue(e)
      else if(e instanceof Object){
        const event = e as unknown as ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
        setValue(event.target.value as unknown as T);
      }
    }

    return [value , setValue , onChangeValue]
}
