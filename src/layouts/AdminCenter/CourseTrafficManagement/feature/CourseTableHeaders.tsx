import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React, { memo } from 'react'

const CourseTableHeaders = () => {
  return (
    <Row>
        <InRow fontWeight='bold' bgcolor="#fdfdf5" flex={0.1}>No</InRow>
        <InRow fontWeight='bold' bgcolor="#fdfdf5" flex={0.12}>과정분류</InRow>
        <InRow fontWeight='bold' bgcolor="#fdfdf5" flex={0.13}>교육분류</InRow>
        <InRow fontWeight='bold' bgcolor="#fdfdf5" flex={0.4}>과정명</InRow>
        <InRow fontWeight='bold' bgcolor="#fdfdf5" flex={0.15}>생성일</InRow>
        <InRow fontWeight='bold' bgcolor="#fdfdf5" flex={0.05}>노출여부</InRow>
        <InRow fontWeight='bold' bgcolor="#fdfdf5" flex={0.05}>상태</InRow>
      </Row>
  )
}

export default memo(CourseTableHeaders);


const Row = styled(Box)`
  display:flex;
  width:100%;
`;


const InRow = styled(Box)<{flex:number,bgcolor?:string}>`
  flex:${props=>props.flex || 1};
  text-align: center;
  background-color:${props=>props.bgcolor || '#fff'};
  border:1px solid #eee;
  border-right:0;
  padding: .25rem;
`