import { Box } from '@mui/material'
import React from 'react'

interface Props {
  children: React.ReactNode
}

function TabsLayout({children}:Props) {
  return (
    <Box
    >
      {children}
    </Box>
  )
}

export default TabsLayout