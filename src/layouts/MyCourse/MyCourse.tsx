import styled from '@emotion/styled';
import { Box, BoxProps, Container, Typography } from '@mui/material';
import { Spinner, Tabs } from '@components/ui';
import React from 'react';
import { useMyUser } from '@common/api/user';
import { useRouter } from 'next/router';
import { LearningCourse } from './LearningCourse';

const studingCourseList = [
  { label: '학습중인 과정', value: 'ing' },
  { label: '학습종료 과정', value: 'end' },
];

export function MyCourse() {
  const router = useRouter();
  const { user, error } = useMyUser();
  console.log(user);
  if (!user) return <Spinner />;
  return (
    <Container>
      <MyCoursewrap>
        <Typography variant="h5" fontWeight="bold">
          학습현황
        </Typography>
        <Typography variant="h6">학습중인 과정의 수료확인 및 수료증 발급을 받을 수 있습니다!</Typography>
        <Tabs tabsConfig={studingCourseList} />
        <TabPanel index={String(router.query?.tab)} value={studingCourseList[0].value}>
          <LearningCourse />
        </TabPanel>
        <TabPanel index={String(router.query?.tab)} value={studingCourseList[1].value}>
          asdasd아ddd
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
