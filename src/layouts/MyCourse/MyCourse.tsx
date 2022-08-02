import styled from '@emotion/styled';
import { Box, BoxProps, Container, Typography } from '@mui/material';
import { Tabs } from '@components/ui';
import React from 'react';
import { useRouter } from 'next/router';
import { LearningCourse } from './LearningCourse';
import { EndCourse } from './EndCourse';

const studingCourseList = [
  { label: '학습중인 과정', value: 'ing' },
  { label: '학습종료 과정', value: 'end' },
];

export function MyCourse() {
  const router = useRouter();
  return (
    <Container>
      <MyCoursewrap>
        <Typography variant="h5" fontWeight="bold" mt={4}>
          학습현황
        </Typography>
        <Typography variant="h6">학습중인 과정을 확인할수 있습니다!!</Typography>
        <Box sx={{ width: 'fit-content', margin: 'auto' }}>
          <Tabs tabsConfig={studingCourseList} />
        </Box>
        <TabPanel index={String(router.query?.tab)} value={studingCourseList[0].value}>
          <LearningCourse />
        </TabPanel>
        <TabPanel index={String(router.query?.tab)} value={studingCourseList[1].value}>
          <EndCourse />
        </TabPanel>
      </MyCoursewrap>
    </Container>
  );
}

const MyCoursewrap = styled(Box)``;

interface TabPanelProps extends BoxProps {
  children: React.ReactNode;
  value: undefined | string;
  index: string;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...rest } = props;
  return (
    <Box hidden={value !== index} {...rest}>
      {children}
    </Box>
  );
};
