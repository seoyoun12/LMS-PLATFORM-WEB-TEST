import React from "react";
import styled from "@emotion/styled";
import { Box, LinearProgress, Typography } from "@mui/material";
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

  // 콜백.

  const getProgress = React.useCallback(() => {

    const watchedTime = (props.lesson.totalTime * 1000) + timeSessions.map((session) => (session.end - session.start)).reduce((p, c) => p + c, 0);
    const totalTime = props.lesson.min * 60000 + props.lesson.sec * 1000;

    return totalTime === 0 ? 0 : watchedTime / totalTime;

  }, [props.lesson.totalTime, props.lesson.min, props.lesson.sec, timeSessions]);

  // 콜백.

  const endTimeSession = React.useCallback((end: number) => {

    if (timeStart === null) return;

    setTimeSessions([
      ...timeSessions,
      {
        start: timeStart,
        end: end,
      }
    ]);
    setTimeStart(null);

  }, [timeSessions, timeStart]);

  const onPause = React.useCallback(() => {

    setTimePaused(true);
    endTimeSession(Date.now());

  }, [endTimeSession]);

  const onPlay = React.useCallback(() => {

    setTimePaused(false);
    setTimeStart(Date.now());

  }, []);

  const onPlaying = React.useCallback(() => {

    if (!timePaused || (timePaused && timeStart !== null)) endTimeSession(Date.now());

    onPlay();

  }, [endTimeSession, onPlay, timePaused, timeStart]);

  const onSeeking = React.useCallback(() => {

    if (!timePaused) endTimeSession(Date.now());

  }, [endTimeSession, timePaused]);

  const onSeeked = React.useCallback(() => {

    if (!timePaused) setTimeStart(Date.now());

  }, [timePaused]);

  const onEnded = React.useCallback(() => {

    setTimePaused(true);
    endTimeSession(Date.now());

  }, [endTimeSession]);


  // 이펙트.

  React.useEffect(() => {

    setTimeSessions([]);
    setTimeStart(null);

  }, [props.lesson]);

  // 렌더.

  return (
    <React.Fragment>
      <VideoWrapper>
        <VideoPlayer
          playlist={props.lesson.s3Files[0]?.path}
          initialPlayerId="lesson-player"
          initialConfig={{ autostart: false }}
          seconds={props.lesson.studyLastTime}
          onPause={onPause}
          onPlay={onPlay}
          onPlaying={onPlaying}
          onSeeking={onSeeking}
          onSeeked={onSeeked}
          onEnded={onEnded}
        />
      </VideoWrapper>
      <ContentInfoContainer>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "0.25rem" }}>
          {props.lesson.lessonNm}
        </Typography>
        <ContentInfoProgressContainer>
          <Box>
            <Typography variant="h6" fontWeight="bold" color="#ff5600">
              {Math.floor(getProgress() * 100)}% 수강 완료
            </Typography>
          </Box>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress variant="determinate" value={Math.floor(getProgress() * 100)} />
          </Box>
        </ContentInfoProgressContainer>
      </ContentInfoContainer>
    </React.Fragment>
  );

}

const VideoWrapper = styled.div`
  display: flex;
  aspect-ratio: 16 / 9;
  background-color: #000;
  align-items: center;
  justify-content: center;
`;

const ContentInfoContainer = styled(Box)`
  margin-top: 10px;
`;

const ContentInfoProgressContainer = styled(Box)``;
