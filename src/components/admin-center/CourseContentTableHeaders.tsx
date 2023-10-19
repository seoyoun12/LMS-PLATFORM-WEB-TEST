import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { memo } from "react";

const CourseContentTableHeaders = () => {
  return (
    <Row>
    <InRow flex={0.1}>ID</InRow>
    <InRow flex={0.4}>콘텐츠명</InRow>
    <InRow flex={0.2}>유형</InRow>
    <InRow flex={0.2}>생성일</InRow>
    <InRow flex={0.1}>상태</InRow>
  </Row>
  )
}

export default memo(CourseContentTableHeaders);



const Row = styled(Box)<{rounded?:string;}>`
  display: flex;
  border-bottom: 1px solid #c7c7c7c7;
  padding: .5rem 0;
  border-radius: ${props => props.rounded || '0px'};
`
const InRow = styled(Box)<{flex:number}>`
  flex: ${props => props.flex || 1};
  text-align: center;
  font-size: 14px;
`
