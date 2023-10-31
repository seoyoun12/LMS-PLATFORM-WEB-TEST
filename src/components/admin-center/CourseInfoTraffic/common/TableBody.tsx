
import { PropsWithChildren } from 'react';
import { InRow, InRowContent, OutRow } from '../CourseInfomationTraffic'
import { Box } from '@mui/material';

interface Props {
  list?: {
    elementName: string;
    threshold: string;
    point: string;
    submitDate: string;
    submitYn: string;
  }[];
}

export default function TableBody({ list,children }:PropsWithChildren<Props>) {
  return (
    <OutRow>
    <InRow>
    {
      list ?
      list.map((learningStatus) => (
        <Box key={learningStatus.elementName} sx={{width:'100%',display:'flex'}}>
          <InRowContent justifyContent="center" >{learningStatus.elementName}</InRowContent>
          <InRowContent justifyContent="center" >{learningStatus.threshold}</InRowContent>
          <InRowContent justifyContent="center" >{learningStatus.point}</InRowContent>
          <InRowContent justifyContent="center" >{learningStatus.submitDate ?? '미제출'}</InRowContent>
          <InRowContent justifyContent="center" >{learningStatus.submitYn ?? '미제출'}</InRowContent>
        </Box>
      ))
      : children
    }
    </InRow>
  </OutRow>
  )
}
