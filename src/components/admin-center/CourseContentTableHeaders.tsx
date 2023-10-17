import styled from '@emotion/styled'
import { Box } from '@mui/system'
import React, { memo } from 'react'

const CourseContentTableHeaders = () => {
  return (
  <Row>
    <InRow flex={0.1} >ID</InRow>
    <InRow flex={0.25} >콘텐츠명</InRow>
    <InRow flex={0.15} >연결된 과정 ID</InRow>
    <InRow flex={0.3} >연결된 과정명</InRow>
    <InRow flex={0.2} ></InRow>
  </Row>
  )
}
export default memo(CourseContentTableHeaders);

const Row = styled(Box)`
  display:flex;
  width:100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 40px;
  
`

const InRow = styled(Box)<{flex?:number}>`
  flex:${props => props.flex || 1};
  text-align: center;
  display:flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ccc;
  height:100%;
  font-size: 14px;
  
`
