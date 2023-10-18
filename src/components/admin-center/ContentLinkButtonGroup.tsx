import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'

interface Props {
  onLink: () => void;
  onDislink: () => void;
  courseSeq: number | null | undefined;
  thisSeq: number | null | undefined;
}

export default function ContentLinkButtonGroup({onLink,onDislink,courseSeq,thisSeq}: Props) {

  return (
    <>
    <Button
      onClick={onLink}
      sx={{
        color:`${courseSeq === +thisSeq ? '#fff' : courseSeq ? '#b60505'  : '#a7a7a7' }`,
        border:`${courseSeq ? '1px solid #b60505' : '1px solid #a7a7a7'}`,
        backgroundColor:`${courseSeq === thisSeq ? '#b60505' : 'transparent'}`,
        height:'32px',
        '&:hover':{
          opacity:0.97,
          bgcolor:`${courseSeq === thisSeq ? '#b60505' : 'transparent'}`
        }
        }}
      >
      연동
    </Button>
    <Button
      onClick={onDislink}
      sx={{
        color:`${!courseSeq ? '#b60505' : '#a7a7a7' }`,
        border:`${!courseSeq ? '1px solid #b60505' : '1px solid #a7a7a7' }`,
        height:'32px'
      }}
      >  
      해제
    </Button>
    </>
  )
}
