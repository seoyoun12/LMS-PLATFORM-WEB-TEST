import { ChangeEvent, useState } from "react"

export function useInput(initialState?:string | number){
    const [value , setValue] = useState(initialState)

    const onChangeValue = (e:ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return [value , setValue , onChangeValue]
}