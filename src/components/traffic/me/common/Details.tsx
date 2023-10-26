import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material'
import React from 'react'

interface Props {
  title: string;
  value: string;
  title2?: string;
  value2?: string;
}

export default function Details( {title, value,title2, value2}: Props) {
  return (
    <Wrapper>
      <Inner>
        <TitleBox>
          <Title>{title}</Title>
        </TitleBox>
        <DescriptionBox>
          <Typography>{value}</Typography>
        </DescriptionBox>
        {
          title2 && (
          <>
            <TitleBox>
              <Title>{title2}</Title>
            </TitleBox>
            <DescriptionBox>
            <Typography>{value2}</Typography>
            </DescriptionBox>
          </>
        )}
      </Inner>
    </Wrapper>
  )
}

const Title = styled(Typography)`
  font-size: 20px;
`

const DescriptionBox = styled(Box)`
  flex:1;
`

const TitleBox = styled(Box)`
  flex: 1;
  height: 48px;
  display:flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  border: 1px solid #2d63e2;
  border-radius: 8px;
  // skyblue
  background-color: #aaffff44;
`

const Inner = styled(Box)`
  width: 100%;
  display:flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`

const Wrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e5e5;

`