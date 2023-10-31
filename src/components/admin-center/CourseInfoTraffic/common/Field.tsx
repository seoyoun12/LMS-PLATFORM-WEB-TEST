import styled from '@emotion/styled';
import React, { memo } from 'react'
import { InRowContent, InRowTitle, OutRow, Row } from '../CourseInfomationTraffic';
import { Box } from '@mui/material';

interface Props {
  isDouble?: boolean;
  title1: string;
  value1?: string;
  title2?: string;
  value2?: string;
  children?: React.ReactNode;

}

const Field = ({isDouble, title1, value1, title2, value2,children}:Props) => {
  return (
    <OutRow>
      <InRow isdouble={isDouble + ''}>
        <InRowTitle>{title1}</InRowTitle>
        <InRowContent>{value1 ? value1 : children}</InRowContent>
      </InRow>
      {isDouble &&
      <InRow isdouble={isDouble + ''}>
        <InRowTitle >{title2}</InRowTitle>
        <InRowContent>{value2}</InRowContent>
      </InRow>
      }
    </OutRow>
  )
}

export default memo(Field);


const InRow = styled(Box)<{isdouble?:string}>`
  display: flex;
  flex-direction: row;
  flex: ${({isdouble}) => isdouble === 'true' ? 0.5 : 1};
  
`;