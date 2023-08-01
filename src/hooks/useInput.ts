import { ChangeEvent, useState } from "react"


interface IInput {
  value: string | number
}

// 필수로 값이 들어와야 하는 인풋에 옵셔널, any 박을꺼면 타스 왜쓰셨어요...
export function useInput({value}:IInput){
    const [inputValue , setValue] = useState(value)

    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return {
      inputValue,
      onChange
    }
}