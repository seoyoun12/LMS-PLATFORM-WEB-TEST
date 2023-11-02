import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import { ReactNode } from 'react';



interface Props {
  title: string;
  children: ReactNode;
}

export default function StatisticsLayout({title,children}:Props) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {children}
    </Wrapper>
  )
}


const Wrapper = styled(Box)`
  align-self: flex-start;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 10px 2px #c7c7c7;
  margin-bottom: 4rem;
`

const Title = styled(Typography)`
  width: 100%;
  align-self: flex-start;
  font-weight: bold;
  font-size: 22px;
  padding-bottom: 1rem;
  border-bottom: 2px solid #ccc;
  margin-bottom: 1rem;
`