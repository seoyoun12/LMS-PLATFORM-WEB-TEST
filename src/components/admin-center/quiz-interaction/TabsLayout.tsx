import { Box } from '@mui/material'
import React from 'react'

interface Props {
  children: React.ReactNode
}

function TabsLayout({children}:Props) {
  return (
    <Box
    display='flex'
    flexDirection='column'
    justifyContent='space-between'
    alignItems='center'
    gap='2rem'
    >
      {children}
    </Box>
  )
}

export default TabsLayout