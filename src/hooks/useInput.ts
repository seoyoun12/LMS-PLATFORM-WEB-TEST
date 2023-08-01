import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"



export function useInput<T>(initialState: T): [T, Dispatch<SetStateAction<T>> ,(e: T) => void] {
    const [value , setValue] = useState(initialState)

    const onChangeValue = (e:T ) => {
      if(typeof e === 'string') setValue(e)
      else {
        const event = e as unknown as ChangeEvent<HTMLInputElement>
        setValue(event.target.value as unknown as T);
      }
      
      
      
    }

    return [value , setValue , onChangeValue]
}
