import styled from '@emotion/styled'
import useToggle from '@hooks/useToggle';
import { ArrowDropDown } from '@material-ui/icons';
import { Box, Button,  Typography } from '@mui/material'
import { ReactNode, useState } from 'react';



interface Props {
  title: string;
  children: ReactNode;
}

export default function StatisticsLayout({title,children}:Props) {
  const {toggle: isDropped, onToggle: onToggleDropdown} = useToggle(true)
  
  return (
    <Wrapper dropdown={isDropped ? 'drop' : 'flip'}>
      <Title>
        {title}
        <Button
          onClick={onToggleDropdown}
          variant="outlined"
          size="small">
          <ArrowDropDown />
        </Button>
      </Title>
      {children}
    </Wrapper>
  )
}


const Wrapper = styled(Box)<{dropdown: string}>`
  align-self: flex-start;
  max-height: ${({dropdown}) => dropdown === 'drop' ? '1200px' : '76px'};
  overflow: ${({dropdown}) => dropdown === 'drop' ? 'scroll' : 'hidden'};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 10px 2px #c7c7c7;
  margin-bottom: 4rem;
  transition: max-height 0.5s ease-in-out;
`

const Title = styled(Typography)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  align-self: flex-start;
  font-weight: bold;
  font-size: 22px;
  padding-bottom: 1rem;
  border-bottom: 2px solid #ccc;
  margin-bottom: 1rem;
`