import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material'
import React from 'react'

interface Props {
  onClick?: () => void;
  bgColor: string;
  ox: string;
}

const ButtonContainer = styled(Box)<{bgColor: string}>`
  flex:1;
  display:flex;
  justify-content:center;
  align-items:center;
  border: ${({bgColor}) => `1px solid ${bgColor}`};
  border-radius:20px;
  overflow:hidden;
`
const StyledButton = styled(Button)<{bgColor: string}>`
    width:100%;
    min-height:200px;
    background-color:${({bgColor}) => bgColor};
    color:#fff;
    &:hover {
      background-color:#fff;
      color: ${({bgColor}) => bgColor};
    }
`


function OXButton({onClick, bgColor,ox}: Props) {
  return (
    <ButtonContainer bgColor={bgColor}>
      <StyledButton
        bgColor={bgColor}
        onClick={onClick}
      >
        <Typography align='center' fontSize='96px' fontWeight='bold'>{ox}</Typography>
      </StyledButton>
    </ButtonContainer>
  )
}

export default OXButton