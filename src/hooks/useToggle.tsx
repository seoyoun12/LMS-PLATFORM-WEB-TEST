import { useCallback, useState } from 'react'




function useToggle(defaultValue = false) {
  const [toggle,setToggle] = useState(defaultValue);

  const onToggle = useCallback(() => {
    setToggle(prev => !prev)
  },[])

  return {toggle, onToggle}
}

export default useToggle