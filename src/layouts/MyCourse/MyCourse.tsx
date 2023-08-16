import dynamic from 'next/dynamic';
import styled from '@emotion/styled';
import useResponsive from '@hooks/useResponsive';
import Image from 'next/image';
import { Box, BoxProps } from '@mui/material';
import { useRouter } from 'next/router';
import { LearningCourse } from './LearningCourse';
import { EndCourse } from './EndCourse';
import { CSRTabs2Props } from '@components/ui/Tabs2/CSRTabs2';


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
    <Wrapper>
      <Image src={'/assets/images/learning_status.png'} alt='학습현황'  width={1920} height={322} layout='intrinsic'/>
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
    </Wrapper>
  );
}

const Wrapper = styled(Box)`
  .Mui-selected {
    color: #000 !important;
    font-weight: bold;
    border-bottom: 2px solid #000 !important;
    
  }
  .MuiTabs-indicator {
    background-color: rgb(194,51,51);
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
const CourseContainer = styled(Box)`
  max-width: 1200px;
  padding: 2.5rem 16px 3rem 16px;
  margin: auto;
`;
