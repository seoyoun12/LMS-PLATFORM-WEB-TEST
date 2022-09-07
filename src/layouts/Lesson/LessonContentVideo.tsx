import React from 'react';
import styled from '@emotion/styled';
import { Box, CircularProgress, LinearProgress, Typography } from '@mui/material';
import { VideoPlayer } from '@components/common';
import { Ncplayer } from 'types/ncplayer';
import { useRouter } from 'next/router';
import type {
  CourseProgressResponseDto,
  LessonDetailClientResponseDto,
} from '@common/api/Api';
import ApiClient from '@common/api/ApiClient';

const PLAYER_ELEMENT_ID = "lesson-player" as const;

interface RecordProgressArgs {
  currentCourseUserSeq: number;
  currentCourseProgress: CourseProgressResponseDto;
  currentCourseLesson: LessonDetailClientResponseDto;
  videoCurrentSeconds: number;
  apiVideoSeconds: number;
  isEnd: boolean;
  onSuccess?: () => void;
}

interface Props {
  coursePlayFirst?: boolean;
  courseUserSeq: number;
  courseProgress: CourseProgressResponseDto | null;
  lesson: LessonDetailClientResponseDto | null;
  lessonCompleted?: boolean;
  loading?: boolean;
  onComplete?: (isEnd: boolean) => Promise<boolean>;
}

export default function LessonContentVideo(props: Props) {
  const router = useRouter();

  // 스테이트.

  const [progress, setProgress] = React.useState<number>(0);

  // 레퍼런스.

  const currentPath = React.useRef<string | null>(null);

  const currentCourseUserSeq = React.useRef<number | null>(null);
  const currentCourseProgress = React.useRef<CourseProgressResponseDto | null>(null);
  const currentCourseLesson = React.useRef<LessonDetailClientResponseDto | null>(null);

  const apiTimer = React.useRef<number | null>(null);
  const apiTimerVideoIncrementTime = React.useRef<() => void | null>(null);
  const apiTimerVideoSetCurrentSeconds = React.useRef<(time: number) => void | null>(null);
  const apiTimerSetKill = React.useRef<((mode: "KILL" | "RESTART", isEnd?: boolean) => Promise<void>) | null>(null);

  const videoPlayer = React.useRef<Ncplayer | null>(null);
  const vidoeDurationSeconds = React.useRef<number>(0);
  const videoCurrentSeconds = React.useRef<number>(0);
  const videoPlayedSeconds = React.useRef<number>(0);
  const videoIsSeeking = React.useRef<boolean>(false);
  const videoIsPaused = React.useRef<boolean>(true);
  const videoIsEnded = React.useRef<boolean>(false);
  const videoIsCompleted = React.useRef<boolean>(false);
  const videoIsRecording = React.useRef<boolean>(false);

  // 콜백

  const updateProgress = React.useCallback(() => {
    const seconds = props.courseProgress.studyTime + videoPlayedSeconds.current;
    setProgress(
      !props.lessonCompleted &&
        vidoeDurationSeconds.current > 0 &&
        seconds < vidoeDurationSeconds.current
        ? seconds / vidoeDurationSeconds.current
        : 1
    );
  }, [props.courseProgress.studyTime, props.lessonCompleted]);

  const recordProgress = React.useCallback((args: RecordProgressArgs) => {

    ApiClient.courseLog
      .createCourseModulesUsingPost1({
        courseUserSeq: args.currentCourseUserSeq,
        lessonSeq: args.currentCourseLesson.seq,
        studyTime: args.apiVideoSeconds,
      })
      .then(() =>
        ApiClient.courseProgress
          .updateCourseProgressUsingPut({
            courseUserSeq: args.currentCourseUserSeq,
            courseProgressSeq: args.currentCourseProgress.courseProgressSeq,
            lessonSeq: args.currentCourseLesson.seq,
            studyLastTime: args.videoCurrentSeconds,
          })
      )
      .then((v) => {

        return ApiClient.courseProgress
          .updateAllCourseProgressUsingPut(args.currentCourseUserSeq)
          .then(() => {
            
            if (v.data.data.completeYn === "Y") {

              props?.onComplete(args?.isEnd);
              args?.onSuccess();

            }
            
          });
        
      });

  }, [props])

  // 콜백 - 타이머.

  const startTimer = React.useCallback(() => {

    const courseUserSeq = currentCourseUserSeq.current;
    const courseProgress = currentCourseProgress.current;
    const courseLesson = currentCourseLesson.current;
    const coursePath = currentPath.current;
    
    if (courseLesson === null || courseProgress === null) return;
    
    ApiClient.courseLog
      .createCourseModulesUsingPost1({
        courseUserSeq: currentCourseUserSeq.current,
        lessonSeq: currentCourseLesson.current.seq,
        studyTime: 0,
      });

    let apiTimerKill: "KILL" | "RESTART" | null = null;
    let apiSeconds = 0;
    let apiVideoSeconds = 0;
    let apiVideoCurrentSeconds = videoCurrentSeconds.current;
    let isVideoEnd = false;
    
    let killEvent: () => void;

    apiTimerVideoIncrementTime.current = () => { apiVideoSeconds++; };
    apiTimerVideoSetCurrentSeconds.current = (time: number) => { apiVideoCurrentSeconds = time; }
    apiTimerSetKill.current = (mode: "KILL" | "RESTART", isEnd = false) => {
      
      apiTimerKill = mode;
      isVideoEnd = isEnd;
      return new Promise<void>((res) => { killEvent = res });
    
    };

    const timer = window.setInterval(() => {

      console.log(apiTimerKill, currentCourseUserSeq.current, courseUserSeq, currentCourseLesson.current.seq, courseLesson.seq, router.asPath, coursePath);
      apiSeconds++;

      if (
        apiTimerKill !== null ||
        currentCourseUserSeq.current !== courseUserSeq ||
        currentCourseLesson.current.seq !== courseLesson.seq ||
        router.asPath !== coursePath ||
        apiTimer.current !== timer
      ) {

        if (apiTimerKill === "KILL") {

          window.clearInterval(timer);

          if (apiTimer.current === timer) {
            
            apiTimer.current = null;
            apiTimerVideoIncrementTime.current = null;
            apiTimerVideoSetCurrentSeconds.current = null;
            apiTimerSetKill.current = null;
  
          }

        }
        
        return recordProgress({
          currentCourseUserSeq: courseUserSeq,
          currentCourseProgress: courseProgress,
          currentCourseLesson: courseLesson,
          apiVideoSeconds: apiSeconds,
          videoCurrentSeconds: apiVideoCurrentSeconds,
          isEnd: isVideoEnd,
          onSuccess: () => {
            
            killEvent();
            if (apiTimerKill === "RESTART") {

              ApiClient.courseLog
                .createCourseModulesUsingPost1({
                  courseUserSeq: currentCourseUserSeq.current,
                  lessonSeq: currentCourseLesson.current.seq,
                  studyTime: 0,
                })
                .then(() => {
  
                  apiTimerKill = null;
                  apiSeconds = 0;
                  apiVideoSeconds = 0;
  
                })
                .catch(() => {

                  window.clearInterval(timer);

                  if (apiTimer.current === timer) {
                    
                    apiTimer.current = null;
                    apiTimerVideoIncrementTime.current = null;
                    apiTimerVideoSetCurrentSeconds.current = null;
                    apiTimerSetKill.current = null;
          
                  }

                });

            }

          },
        });

      }

      if (apiSeconds >= 5 && apiTimerKill === null) {
        
        ApiClient.courseLog
          .createCourseModulesUsingPost1({
            courseUserSeq: courseUserSeq,
            lessonSeq: courseLesson.seq,
            studyTime: apiVideoSeconds,
          })
          .then(() =>
            ApiClient.courseProgress
              .updateCourseProgressUsingPut({
                courseUserSeq: courseUserSeq,
                courseProgressSeq: courseProgress.courseProgressSeq,
                lessonSeq: courseLesson.seq,
                studyLastTime: apiVideoCurrentSeconds,
              })
          );

        apiSeconds = 0;
        apiVideoSeconds = 0;

      }

    }, 1000);

    apiTimer.current = timer;

  }, [recordProgress, router.asPath]);

  // 콜백 - 이벤트.

  const onPause = React.useCallback(() => {

    videoIsPaused.current = true;

  }, []);

  const onPlaying = React.useCallback(() => {

    if (currentCourseLesson === null || currentCourseProgress === null) return;
    if (apiTimer.current === null || videoIsEnded.current) {

      apiTimerSetKill?.current("KILL");
      startTimer();
      videoIsEnded.current = false;

    }
    
    videoIsPaused.current = false;

  }, [startTimer]);

  const onSeeking = React.useCallback(() => videoIsSeeking.current = true, []);

  const onSeeked = React.useCallback(() => videoIsSeeking.current = false, []);

  const onTimeChange = React.useCallback((time: number) => {

    if (time === videoCurrentSeconds.current) return;
    if (
      time !== videoCurrentSeconds.current + 1 ||
      videoIsPaused.current ||
      videoIsSeeking.current
    ) {

      videoCurrentSeconds.current = time;
      apiTimerVideoSetCurrentSeconds?.current(time);
      return;

    }

    videoCurrentSeconds.current = time;
    videoPlayedSeconds.current++;
    apiTimerVideoIncrementTime?.current();
    apiTimerVideoSetCurrentSeconds?.current(time);

    if (!videoIsCompleted.current && !videoIsRecording.current && props.courseProgress.studyTime + videoPlayedSeconds.current >= vidoeDurationSeconds.current) {
      
      videoIsRecording.current = true;
      apiTimerSetKill?.current("RESTART");
      
    }
    
    updateProgress();

  }, [props.courseProgress.studyTime, updateProgress]);

  const onEnded = React.useCallback(() => {

    videoCurrentSeconds.current = vidoeDurationSeconds.current;
    videoIsEnded.current = true;
    apiTimer.current = null;
    apiTimerSetKill?.current("KILL", true);

  }, []);

  // 이펙트.

  React.useEffect(() => {

    if (!props.coursePlayFirst && videoPlayer.current) videoPlayer.current.play();

  }, [props.coursePlayFirst]);

  React.useEffect(() => {

    apiTimerSetKill?.current("KILL");

    currentPath.current = router.asPath;

    currentCourseUserSeq.current = props.courseUserSeq;
    currentCourseProgress.current = props.courseProgress;
    currentCourseLesson.current = props.lesson;

    vidoeDurationSeconds.current = props.lesson ? props.lesson.totalTime : 0;
    videoCurrentSeconds.current = props.lesson ? props.courseProgress.studyLastTime : 0;
    videoPlayedSeconds.current = 0;
    videoIsSeeking.current = false;
    videoIsPaused.current = true;
    videoIsEnded.current = false;
    videoIsCompleted.current = false;
    videoIsRecording.current = false;
    
    updateProgress();

  }, [props.lesson, props.courseProgress, props.courseUserSeq, updateProgress, router.asPath]);

  React.useEffect(() => {

    videoIsCompleted.current = !!props.lessonCompleted;
    videoIsRecording.current = false;

  }, [props.lessonCompleted]);

  // 렌더링.

  if (props.loading)
    return (
      <VideoContentWrapper>
        <CircularProgress size="1.5rem" />
      </VideoContentWrapper>
    );
  if (props.lesson === null || props.courseProgress === null)
    return <VideoContentWrapper>강의가 존재하지 않습니다.</VideoContentWrapper>;

  return (
    <VideoContainer>
      <VideoContentPlayerWrapper>
        <VideoPlayer
          playlist={props.lesson.s3Files[0]?.path}
          initialPlayerId={PLAYER_ELEMENT_ID}
          initialConfig={{ autostart: !props.coursePlayFirst }}
          seconds={
            props.courseProgress.studyLastTime === props.lesson.totalTime
              ? props.lesson.totalTime + 1
              : props.courseProgress.studyLastTime
          }
          showControl={props.lessonCompleted}
          onPause={onPause}
          onPlaying={onPlaying}
          onSeeking={onSeeking}
          onSeeked={onSeeked}
          onTimeChange={onTimeChange}
          onEnded={onEnded}
          onReady={v => (videoPlayer.current = v)}
        />
      </VideoContentPlayerWrapper>
      <ContentInfoContainer>
        <ContentInfoTitle variant="h6">{props.lesson.lessonNm}</ContentInfoTitle>
        <ContentInfoProgressContainer>
          <Typography fontWeight="bold" color="#ff5600" fontSize="inherit">
            {Math.floor(progress * 100)}% 수강 완료
          </Typography>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" value={Math.floor(progress * 100)} />
          </Box>
        </ContentInfoProgressContainer>
      </ContentInfoContainer>
    </VideoContainer>
  );
}

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const VideoContentWrapper = styled.div`
  display: flex;
  aspect-ratio: 16 / 9;
  align-items: center;
  justify-content: center;
`;

const VideoContentPlayerWrapper = styled(VideoContentWrapper)`
  background-color: #000;

  @media (max-width: 1024px) {
    order: 1;
  }
`;

const ContentInfoContainer = styled(Box)`
  margin-top: 10px;

  @media (max-width: 1024px) {
    margin-top: unset;
    margin-bottom: 1rem;
  }
`;

const ContentInfoTitle = styled(Typography)`
  display: flex;
  margin-bottom: 0.25rem;
  font-weight: 700;
  align-items: center;

  @media (max-width: 1024px) {
    margin: 0 -1rem;
    margin-bottom: 1rem;
    padding: 1rem;
    font-size: 1em;
    font-weight: 400;
    background: #e9f1ff;
    justify-content: center;
  }
`;

const ContentInfoProgressContainer = styled(Box)``;
