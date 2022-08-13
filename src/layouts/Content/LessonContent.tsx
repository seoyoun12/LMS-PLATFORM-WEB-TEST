import React from "react";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { VideoPlayer } from "@components/common";
import type { LessonDetailClientResponseDto } from "@common/api/types/Api";
import type { Notice } from "./Lesson.types";

interface TimeSession {
  start: number;
  end: number;
}

interface Props {
  lesson: LessonDetailClientResponseDto;
  notice: Notice[];
  // onPlay: () => void;
}

export function LessonContent(props: Props) {

  // 스테이트.

  const [timePaused, setTimePaused] = React.useState<boolean>(true);
  const [timeSessions, setTimeSessions] = React.useState<TimeSession[]>([]);
  const [timeStart, setTimeStart] = React.useState<number | null>(null);

  // 함수.

  function endTimeSession(end: number) {

    if (timeStart === null) return;

    setTimeSessions([
      ...timeSessions,
      {
        start: timeStart,
        end: end,
      }
    ]);
    setTimeSessions(null);

    console.log(timeSessions);

  }

  // 이펙트.

  React.useEffect(() => {

    setTimeSessions([]);
    setTimeStart(null);

  }, [props.lesson]);

  // 렌더.

  return (
    <Container>
      <VideoWrapper>
        <VideoPlayer
          config={{
            playlist: props.lesson.s3Files[0]?.path,
            autostart: false,
          }}
          onPlaying={() => {

            if (!timePaused || (timePaused && timeStart !== null)) endTimeSession(Date.now());

            setTimePaused(false);
            setTimeStart(Date.now());

          }}
        />
      </VideoWrapper>
      <ContentInfoContainer>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "0.25rem" }}>
          {props.lesson.lessonNm}
        </Typography>
        <ContentInfoProgressContainer>
          <Box>
            <Typography variant="h6" fontWeight="bold" color="#ff5600">
              
            </Typography>
          </Box>
          <Box>

          </Box>
        </ContentInfoProgressContainer>
      </ContentInfoContainer>
    </Container>
  );

}

const Container = styled.div`
  flex: 1;
  padding-top: 32px;
`;

const VideoWrapper = styled.div``;

const ContentInfoContainer = styled(Box)``;

const ContentInfoProgressContainer = styled(Box)``;
