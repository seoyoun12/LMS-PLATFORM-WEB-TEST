import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React from 'react'

function LessonRejectPage() {
  const router = useRouter();
  const onBackMyCoursePage = () => {
    // me/my-course?tab=ing
    router.push('/me/my-course?tab=ing');
  }
  return (
    <Container>
      <Image
              src={'/assets/images/cttsLogo.png'}
              width="320"
              height="48"
              alt="ctts logo"
            />
      <RejectInfomationMessage>
      현재 접속하신 수강페이지는 이전 강의 수강이 완료되지 않아 수강이 불가합니다. {'\n'}
        이전 강의를 모두 시청한 뒤 접속해주세요.
        </RejectInfomationMessage>
        
      <RejectButton onClick={onBackMyCoursePage}>나의 수강페이지로 이동</RejectButton>
    </Container>
  )
}

export default LessonRejectPage

const Container = styled(Box)`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:space-around;
  padding: 0 5rem;
`

const RejectInfomationMessage = styled(Typography)`
  text-align: center;
  width: 100%;
  white-space: pre-line;
  font-size: 2rem;
  font-weight: bold;
`

const RejectButton = styled.button`
  width: 100%;
  height: 5rem;
  background-color: rgb(191,49,51);
  color: #fff;
  font-size: 2rem;
  font-weight: bold;
  border: none;
  border-radius: 1rem;
  box-shadow: 1px 1px 6px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;

  &:hover {
    background-color: rgb(191,49,51,0.8);
  }
`