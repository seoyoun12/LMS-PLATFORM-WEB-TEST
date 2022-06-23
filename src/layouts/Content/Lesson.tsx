import { Container } from '@mui/material';
import styled from '@emotion/styled';
import { headerHeight } from '@styles/variables';
import { useLesson } from '@common/api/adm/lesson';
import { Spinner } from '@components/ui';
import * as React from 'react';
import { useRouter } from 'next/router';
import { VideoPlayer } from '@components/common';

export function Lesson() {
  const router = useRouter();
  const { lesson, lessonError } = useLesson(1);
  console.log(router);

  React.useEffect(() => {
    console.log(lesson);
  }, []);

  if (lessonError) return <div>error</div>;
  if (!lesson) return <Spinner />;
  return (
    <ContentContainer maxWidth={false}>
      <MainSection>
        <VideoPlayerContainer>
          <VideoPlayer
            config={{
              playlist: 'https://excubyziwnor11320831.cdn.ntruss.com/hls/~6P5akOp~oAfEJ5KRQenoA__/resource/lesson/$2a$10$36Naa0lPsiSYyU3ne0kJOces51gktnHMEaM3MaDE9gFbPbQ331..mp4/index.m3u8'
            }}
          />
        </VideoPlayerContainer>
      </MainSection>

      <StickySideBar>
        side bar
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
  box-shadow: 0 2px 6px 0 rgb(0 0 0 / 10%), 0 0 1px 0 rgb(0 0 0 / 32%);
  flex-shrink: 0;
  overflow: hidden;
`;

const VideoPlayerContainer = styled.div`
  height: calc(100vh - 160px);
`;


