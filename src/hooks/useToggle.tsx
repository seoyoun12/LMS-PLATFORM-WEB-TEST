import { useCallback, useState } from 'react'




function useToggle() {
  const [toggle,setToggle] = useState(false);

  const onToggle = useCallback(() => {
    setToggle(prev => !prev)
  },[])

  return {toggle, onToggle}
}

export default useToggle