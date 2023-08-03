import { Box } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

function ModalInnerLayout({children}:Props) {
  return (
    <Box
    sx={{
      width:'100%',
      minHeight:'590px',
      padding: '1rem',
      border: '1px solid red',
      marginTop:'1rem'
    }}
  >
    {children}
  </Box>
  )
}

export default ModalInnerLayout