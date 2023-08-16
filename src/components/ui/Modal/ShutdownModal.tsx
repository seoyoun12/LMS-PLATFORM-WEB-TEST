import styled from '@emotion/styled';

import { Box, Button, Modal } from '@mui/material'
import { useRouter } from 'next/router';


interface Props {
  open: boolean;
  onToggle: () => void;
  
}

function ShutdownModal({ open, onToggle }: Props) {
  
  const navigation = useRouter();
  const onShutdown = () => {
    onToggle()
    navigation.push(`/me/my-course?tab=ing`);
  }
  return (
    <Container open={open}>
      <InnerContainer>
        <h1>10분간 활동이 없어 학습이 종료됩니다.</h1>
        <ConfirmButton onClick={onShutdown}>
          확인
        </ConfirmButton>
      </InnerContainer>
    </Container>
  )
}

export default ShutdownModal

const Container = styled(Modal)`
  background-color:rgba(0,0,0,0.35);
  z-index:9999;
  display:flex;
  justify-content:center;
  align-items:center;
  
`;

const ConfirmButton = styled(Button)`
  width: 100px;
  height: 36px;
  background-color: rgb(191,49,51);
  color: #fff;
  font-size:  22px;
  font-weight: bold;
  border: 1px solid transparent;
  &:hover {
    color: rgb(191,49,51);
    background-color: #fff;
    border: 1px solid rgb(191,49,51);
  }
`

const InnerContainer = styled(Box)`
  width: 36%;
  height: 12%;
  background-color: #fff;
  border-radius: 10px;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  gap: .5rem;
  border: 1px solid #c7c7c7c7;
  box-shadow: 1px 1px 2px #ccc;

  h1 {
    font-size: 22px;
    font-weight: bold;

  }
`;