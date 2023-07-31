import { Button, Typography } from '@mui/material'
import React from 'react'

interface Props {
  onClick?: (str: string ) => void
  
  item: string;
  bgColor: string;
}

function QuizItemButton({item,bgColor, onClick}: Props) {
  return (
    <Button
    onClick={onClick ? () => onClick(item) : null}
    sx={{':hover':{
      backgroundColor:'#fff',
      color: bgColor,
      border: '1px solid #c7c7c7c7'
    },
    boxShadow:`2px 2px 2px ${bgColor}`,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    padding:'0 1rem',
    height:'42px',
    borderRadius: '6px',
    fontSize:'22px',
    backgroundColor: bgColor,
    color:'#fff'}}>
      <Typography align='center' sx={{fontWeight:'bold',fontSize:'20px'}} >
        {item}
      </Typography>
    </Button>
  )
}

export default QuizItemButton