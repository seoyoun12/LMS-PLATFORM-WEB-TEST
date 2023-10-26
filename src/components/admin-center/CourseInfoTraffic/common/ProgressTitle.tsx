import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import React, { useCallback } from 'react'
import { DecideButton, DecideButtonGroup } from '../CourseInfomationTraffic'
import useDominDetailCourse from '@hooks/useDominDetailCourse';

interface Props {
  courseUserSeq: string;
}

export default function ProgressTitle({ courseUserSeq }: Props) {
  const { updateAllIncompletedLessonToComplete, updateAllCompletedLessonToCancel } = useDominDetailCourse({ courseUserSeq })
  
  const onClickAllComplete = useCallback(async() => {
    if(window.confirm('전체 이수처리 하시겠습니까?')) {
      return await updateAllIncompletedLessonToComplete()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const onClickAllCancel = useCallback(async() => {
    if(window.confirm('전체 미이수처리 하시겠습니까?')) {
      return await updateAllCompletedLessonToCancel()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <Wrapper >
    <Typography sx={{ fontSize: '1.15rem', fontWeight: 'bold',width:'40%' }}>진도현황</Typography>
    <DecideButtonGroup>
      <DecideButton onClick={onClickAllComplete} large="large" variant="contained" size="large">전체 이수처리</DecideButton>
      <DecideButton onClick={onClickAllCancel} large="large" variant="contained" size="large">전체 미이수처리</DecideButton>
    </DecideButtonGroup>
  </Wrapper>
  )
}

export const Wrapper = styled(Box)`
  position:relative;
  display:flex;
  align-items:center;
  justify-content:start;
  width:100%;
  background-color: #fdfdf5;
  height: 48px;
  padding: 2rem 0;
  padding-left: .5rem;
  
  border-bottom: 1px solid #dfdfdf;
`