import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'

interface Props {
  onLink: () => void;
  onDislink: () => void;
  courseSeq: number | null | undefined;

}

export default function ContentLinkButtonGroup({onLink,onDislink,courseSeq}: Props) {

  const [isLinked,setIsLinked] = useState(false);

  useEffect(() => {
    courseSeq ? setIsLinked(true) : setIsLinked(false);
  },[courseSeq])

  return (
    <>
    <Button
      onClick={onLink}
      sx={{
        color:`${isLinked ? '#b60505' : '#a7a7a7' }`,
        border:`${isLinked ? '1px solid #b60505' : '1px solid #a7a7a7'}`,
        height:'32px'
        }}
      >
      연동
    </Button>
    <Button
      onClick={onDislink}
      sx={{
        color:`${!isLinked ? '#b60505' : '#a7a7a7' }`,
        border:`${!isLinked ? '1px solid #b60505' : '1px solid #a7a7a7' }`,
        height:'32px'
      }}
      >  
      해제
    </Button>
    </>
  )
}
