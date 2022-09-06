import styled from '@emotion/styled';
import { Box, BoxProps, Container, Typography } from '@mui/material';
import { Tabs2 } from '@components/ui/Tabs2';
import React from 'react';
import { useRouter } from 'next/router';
import { LearningCourse } from './LearningCourse';
import { EndCourse } from './EndCourse';
import dynamic from 'next/dynamic';
import { CSRTabs2Props } from '@components/ui/Tabs2/CSRTabs2';
import useResponsive from '@hooks/useResponsive';

const CSRTab2 = dynamic<CSRTabs2Props>(() => import('@components/ui/Tabs2/CSRTabs2'), {
  ssr: false,
});

const studingCourseList = [
  { label: '학습중인 과정', value: 'ing' },
  { label: '학습종료 과정', value: 'end' },
];

export function MyCourse() {
  const router = useRouter();
  const isDesktop = useResponsive();
  return (
    <MyCoursewrap>
      <MyCourseContainer>
        <MyCourseTitle>학습현황</MyCourseTitle>
        <MyCourseSubTitle>학습중인 과정을 확인할수 있습니다</MyCourseSubTitle>
      </MyCourseContainer>
      <Box boxSizing={'border-box'} borderBottom={'2px solid #e0e0e0'}>
        <Box maxWidth={1200} sx={{ margin: 'auto', marginTop: '1.5rem' }}>
          <CSRTab2
            tabsConfig={studingCourseList}
            fontSx={{ color: 'black', fontSize: '20px' }}
            variant={'fullWidth'}
            gap={isDesktop ? 9 : 2}
            showBorderBottom={false}
          />
        </Box>
      </Box>
      <CourseContainer>
        <TabPanel index={String(router.query?.tab)} value={studingCourseList[0].value}>
          <LearningCourse />
        </TabPanel>
        <TabPanel index={String(router.query?.tab)} value={studingCourseList[1].value}>
          <EndCourse />
        </TabPanel>
      </CourseContainer>
    </MyCoursewrap>
  );
}

const MyCoursewrap = styled(Box)`
  .Mui-selected {
    color: black !important;
    font-weight: bold;
  }
`;

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
const MyCourseContainer = styled(Box)`
  width: 100%;
  height: 262px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 42px;
  color: white;
  background-image: url('/assets/images/currentStudy.png');
`;
const MyCourseTitle = styled(Box)`
  font-size: 48px;
  font-weight: 500;
`;
const MyCourseSubTitle = styled(Box)`
  font-size: 17px;
  font-weight: 500;
`;
const CourseContainer = styled(Box)`
  max-width: 1200px;
  padding: 2.5rem 16px 3rem 16px;
  margin: auto;
`;
