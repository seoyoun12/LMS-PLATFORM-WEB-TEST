import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

interface Props {
  preview: string | ArrayBuffer | null;
  selectedFile: string | number | File;
  onReset: () => void
}

export default function PreviewBox({ preview, selectedFile, onReset }: Props) {
  return (
    <Wrapper>
      <Typography component='h3'>썸네일 미리보기</Typography>
      <Image src={preview.toString()} width={320} height={180} alt="preview" objectFit="contain" />
      <Typography>{selectedFile instanceof File && selectedFile?.name}</Typography>
      <Button variant="outlined" color="error" onClick={onReset}>삭제</Button>
    </Wrapper>
  )
}



const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e7e7e7;
  border-radius: 5px;
  margin-bottom: 1rem;
  h3 {
    align-self: flex-start;
    font-weight: bold;
    font-size: 1.15rem;
    color: #999;
  }
`