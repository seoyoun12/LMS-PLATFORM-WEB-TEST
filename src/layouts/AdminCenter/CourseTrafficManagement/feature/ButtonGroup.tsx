import styled from '@emotion/styled';
import { Box, Button } from '@mui/material'

interface Props {
  onClick: () => void;
  onClickDelete?: () => void
  disabled: boolean;
}

export default function ButtonGroup({ onClick,onClickDelete,disabled }: Props) {
  return (
    <Wrapper>
      <StyledButton onClick={onClick} variant="contained" disabled={disabled}>강의 업로드</StyledButton>
      {onClickDelete && <StyledButton className='delete' onClick={onClickDelete} variant="contained">해당강의 삭제</StyledButton>}
    </Wrapper>
  )
}

const StyledButton = styled(Button)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
`

const Wrapper = styled(Box)`
  width:100%;
  margin:1.25rem 0;
  position:relative;
  display:flex;
  justify-content:center;
  gap:4px;
  .delete {
    background-color: #f44336;
    color: white;
  }

`