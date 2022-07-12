import { Container, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { headerHeight } from '@styles/variables';
import { Spinner, Tabs } from '@components/ui';
import * as React from 'react';
import { useRouter } from 'next/router';
import { Link, VideoPlayer } from '@components/common';
import { useCourse } from '@common/api/course';
import { grey } from '@mui/material/colors';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import { totalSecToMinSec } from '@utils/totalSecToMinSec';

const tabsConfig = [
  { label: '커리큘럼', value: 'curriculum' },
  { label: '수업자료', value: 'stuff' },
  { label: '소식', value: 'notice' },
];

export function Lesson() {
  const router = useRouter();
  const { query } = router;
  const { courseId, lessonId } = query;
  const { course, courseError } = useCourse(Number(courseId));

  if (courseError) return <div>error</div>;
  if (!course) return <Spinner />;
  console.log(course);
  return (
    <ContentContainer maxWidth={false}>
      <MainSection>
        <VideoPlayerContainer>
          <VideoPlayer
            config={{
              playlist: course.lessons.filter(lesson => lesson.seq === Number(lessonId))[0].s3Files[0].path,
              autostart: false
            }}
          />
        </VideoPlayerContainer>
      </MainSection>

      <StickySideBar>
        <TabMenu tabsConfig={tabsConfig} showBorderBottom={false} />
        {course.lessons.map(lesson => {
            const { min, sec } = totalSecToMinSec(lesson.totalTime);
            return (
              <MenuCellLink
                className={Number(lessonId) === lesson.seq ? 'active' : ''}
                key={lesson.seq}
                href={`/course/${course.seq}/lesson/${lesson.seq}`}
                color={grey[900]}
              >
                <LessonTitle variant="body1">{lesson.lessonNm}</LessonTitle>
                <LessonInfo>
                  <PlayCircleOutlinedIcon fontSize="small" htmlColor={grey[500]} />
                  <Typography className="typo" variant="body2" color={grey[500]}>{min}:{sec}</Typography>
                </LessonInfo>
              </MenuCellLink>
            );
          }
        )}
      </StickySideBar>
    </ContentContainer>
  );
}

const ContentContainer = styled(Container)`
  padding: 0 50px;
  display: flex;
  flex: 1 1 auto;
  position: relative;
  width: 100%;
  max-width: calc(100% - 68px);
`;

const MainSection = styled.div`
  flex: 1;
`;

const StickySideBar = styled.aside`
  position: sticky;
  top: ${headerHeight};
  margin-left: 40px;
  padding-top: 32px;
  width: 480px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  z-index: 1;
  flex-shrink: 0;
  overflow: hidden;
`;

const VideoPlayerContainer = styled.div`
  height: calc(100vh - 160px);
`;

const TabMenu = styled(Tabs)`
  padding-bottom: 30px;
`;

const LessonTitle = styled(Typography)`

`;
// 여기를 지우면 마이페이지 동영상 플레이어 확인 가능.
const MenuCellLink = styled(Link)`
  display: block;
  padding: 12px;
  min-height: 36px;
  cursor: pointer;

  &.active {
    /* ${LessonTitle} {
      font-weight: 500;
    } */
  }
`;

const LessonInfo = styled.div`
  display: flex;
  align-items: center;
  padding-top: 4px;

  .typo {
    margin-left: 4px;
  }
`;
