import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import { ChangeEvent } from 'react';


interface Props {
  onChangeFile: (e: ChangeEvent<HTMLInputElement>) => void

}

export default function FileInput({ onChangeFile }: Props) {
  return (
    <InputContainer>
      <Typography>썸네일 이미지</Typography>
        <Input type="file" onChange={onChangeFile} 
        accept="image/jpg, image/jpeg, image/png, image/gif, image/bmp"/>
        <ChoiceFileButton>
          <UploadOutlinedIcon />
          <Typography>파일선택</Typography>
        </ChoiceFileButton>
      </InputContainer>
  )
}


const InputContainer = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 120px;
  height: 100px;
  margin: .5rem 0 0 0;
  gap: .5rem;
`
const Input = styled.input`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
  border: none;
  width: 150px;
  height: auto;
  z-index: 9;
`


const ChoiceFileButton = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e7e7e7;
  border-radius: 5px;
  margin-bottom: 1rem;
  width: 120px;
  cursor: pointer;
`