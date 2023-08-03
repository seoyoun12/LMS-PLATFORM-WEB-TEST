import { Button, ButtonGroup } from '@mui/material'
import React from 'react'

function ConfirmButtons() {
  return (
    <ButtonGroup
    variant="outlined"
    sx={{
      width:'100%',
      justifyContent:'center',
      marginTop:'2rem',
      gap: '0.5rem'
    }}
  >
    <Button variant="contained" color="info" sx={{width:'120px'}}>저장</Button>
    <Button variant="contained" color="warning" sx={{width:'120px'}}>삭제</Button>
  </ButtonGroup>
  )
}

export default ConfirmButtons