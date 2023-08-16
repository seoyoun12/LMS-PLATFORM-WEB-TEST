import { Box, Button } from '@mui/material'
import React from 'react'

interface Props {
  onClick: () => void;
}

function Alarm({onClick}: Props) {
  return (
    <Box
      margin='1rem 0'
    >
       <Button
      onClick={onClick}
      sx={{
        ':hover': {
          backgroundColor:'#fff',
          color:'rgb(194,51,51)',
          border: '1px solid #c7c7c7c7'
        },
        boxShadow: '2px 3px 2px #c7c7c7c7',
        color: '#fff',
        backgroundColor:'rgb(194,51,51)',
        fontSize: '18px',
        fontWeight: 'bold',
        padding: '0.25rem 2.25rem',
        marginBottom:'1.25rem',
        borderRadius: '8px'
      }}
    >
      확인
    </Button>
    </Box>
  )
}

export default Alarm