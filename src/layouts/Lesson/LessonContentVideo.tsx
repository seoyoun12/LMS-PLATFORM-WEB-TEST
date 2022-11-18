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
import { useRecoilState } from 'recoil';
import { learningStatus } from '@common/recoil';

const PLAYER_ELEMENT_ID = 'lesson-player' as const;

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
  const routerAsPath = router.asPath;
  const [lessonVideoInfo , setLessonVideoInfo] = useRecoilState(learningStatus); //헤더 학습종료를 위한 리코일

  // 스테이트.

  const [progress, setProgress] = React.useState<number>(0);

  // 레퍼런스.

  const prevCourseUserSeq = React.useRef<number | null>(null);
  const prevCourseProgress = React.useRef<CourseProgressResponseDto | null>(null);
  const prevLesson = React.useRef<LessonDetailClientResponseDto | null>(null);

  const currentLessonSeq = React.useRef<number | null>(null);

  const apiTimer = React.useRef<number | null>(null);
  const apiSeconds = React.useRef<number>(0);
  const apiVideoSeconds = React.useRef<number>(0);

  const videoPlayer = React.useRef<Ncplayer | null>(null);
  const vidoeDurationSeconds = React.useRef<number>(0);
  const videoCurrentSeconds = React.useRef<number>(0);
  const videoPlayedSeconds = React.useRef<number>(0);
  const videoIsSeeking = React.useRef<boolean>(false);
  const videoIsPaused = React.useRef<boolean>(true);
  const videoIsFirst = React.useRef<boolean>(true);
  const videoIsFinished = React.useRef<boolean>(false);

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

  // 콜백 - 타이머.

  const stopTimer = React.useCallback(
    async (mode: 'PREV' | 'CURRENT' | 'RESET', isEnd = false) => {
      if (apiTimer.current !== null) {
        window.clearInterval(apiTimer.current);

        if (mode !== 'RESET') {
          if (
            (mode === 'CURRENT' &&
              (props.lesson === null ||
                props.courseProgress.courseProgressSeq === null)) ||
            (mode === 'PREV' &&
              props.courseUserSeq === prevCourseUserSeq.current &&
              props.lesson.seq === prevLesson.current.seq)
          )
            return;

          if (mode === 'CURRENT') {
            videoIsFinished.current = true;
            videoIsFirst.current = true;
          }

          const courseUserSeq =
            mode === 'PREV' ? prevCourseUserSeq.current : props.courseUserSeq;
          const courseProgressSeq =
            mode === 'PREV'
              ? prevCourseProgress.current.courseProgressSeq
              : props.courseProgress.courseProgressSeq;
          const lessonSeq = mode === 'PREV' ? prevLesson.current.seq : props.lesson.seq;
          const currentSecond = videoCurrentSeconds.current;

          await ApiClient.courseLog
            .createCourseModulesUsingPost1({
              courseUserSeq: courseUserSeq,
              lessonSeq: lessonSeq,
              studyTime: apiVideoSeconds.current,
            })
            .then(() =>
              ApiClient.courseProgress.updateCourseProgressUsingPut({
                courseUserSeq: courseUserSeq,
                courseProgressSeq: courseProgressSeq,
                lessonSeq: lessonSeq,
                studyLastTime: currentSecond,
              })
          )
          .then((v) => {

            return ApiClient.courseProgress
              .updateAllCourseProgressUsingPut(courseUserSeq)
              .then(() => v.data.data.completeYn === "Y" && props.onComplete(isEnd));
            
          }).catch((e)=>{
            console.log(e);
            videoPlayer.current.pause();
            stopTimer('CURRENT');
            window.alert('네트워크 오류입니다.stopTimer(createCourseModulesUsingPost1 => updateCourseProgressUsingPut => updateAllCourseProgressUsingPut)');
          });

      }

    }

      apiTimer.current = null;
      apiSeconds.current = 0;
      apiVideoSeconds.current = 0;
    },
    [props]
  );

  const startTimer = React.useCallback(() => {
    stopTimer('RESET');

    if (props.lesson === null || props.courseProgress.courseProgressSeq === null) return;

    const courseUserSeq = props.courseUserSeq;
    const courseProgressSeq = props.courseProgress.courseProgressSeq;
    const lessonSeq = props.lesson.seq;

    const timer = window.setInterval(() => {
      if (currentLessonSeq.current !== lessonSeq || router.asPath !== routerAsPath || apiTimer.current !== timer)
        return clearInterval(timer);

      apiSeconds.current++;

      if (apiSeconds.current >= 30) {
        console.log('난가?');
        ApiClient.courseLog
          .createCourseModulesUsingPost1({
            courseUserSeq: courseUserSeq,
            lessonSeq: lessonSeq,
            studyTime: apiVideoSeconds.current,
          })
          .then(() =>
            ApiClient.courseProgress.updateCourseProgressUsingPut({
              courseUserSeq: courseUserSeq,
              courseProgressSeq: courseProgressSeq,
              lessonSeq: lessonSeq,
              studyLastTime: videoCurrentSeconds.current,
            }).catch((e)=>{
              console.log(e);
              videoPlayer.current.pause();
              stopTimer('CURRENT');
              window.alert('네트워크 오류입니다.startTimer(updateCourseProgressUsingPut)');
            })
          ).catch((e)=>{
            console.log(e);
            videoPlayer.current.pause();
            stopTimer('CURRENT');
            window.alert('네트워크 오류입니다.startTimer(createCourseModulesUsingPost1)');
          });

        apiSeconds.current = 0;
        apiVideoSeconds.current = 0;
        
      }
        setLessonVideoInfo({
          courseUserSeq,
          lessonSeq,
          studyTime: apiVideoSeconds.current,
          studyLastTime: videoCurrentSeconds.current,
          courseProgressSeq: courseProgressSeq
        });
    }, 1000);

    apiTimer.current = timer;
  }, [
    props.courseProgress.courseProgressSeq,
    props.courseUserSeq,
    props.lesson,
    router,
    routerAsPath,
    stopTimer,
  ]);

  // 콜백 - 이벤트.

  const onPause = React.useCallback(() => {
    videoIsPaused.current = true;
  }, []);

  const onPlaying = React.useCallback(() => {
    if (props.lesson === null || props.courseProgress.courseProgressSeq === null) return;

    if (videoIsFirst.current) {
      ApiClient.courseLog.createCourseModulesUsingPost1({
        courseUserSeq: props.courseUserSeq,
        lessonSeq: props.lesson.seq,
        studyTime: 0,
      }).catch((e)=>{
        console.log(e);
        videoPlayer.current.pause();
        stopTimer('CURRENT');
        window.alert('네트워크 오류입니다.onPlaying(createCourseModulesUsingPost1)');
      });

      videoIsFirst.current = false;

      startTimer();
    }

    videoIsPaused.current = false;
  }, [
    props.courseProgress.courseProgressSeq,
    props.courseUserSeq,
    props.lesson,
    startTimer,
  ]);

  const onSeeking = React.useCallback(() => {
    videoIsSeeking.current = true;
  }, []);

  const onSeeked = React.useCallback(() => {
    videoIsSeeking.current = false;
  }, []);

  const onTimeChange = React.useCallback(
    (time: number) => {
      if (time === videoCurrentSeconds.current) return;
      if (
        time !== videoCurrentSeconds.current + 1 ||
        videoIsPaused.current ||
        videoIsSeeking.current
      ) {
        videoCurrentSeconds.current = time;
        return;
      }

      videoCurrentSeconds.current = time;
      videoPlayedSeconds.current++;
      apiVideoSeconds.current++;

      if (
        !props.lessonCompleted &&
        !videoIsFinished.current &&
        (
          props.courseProgress.studyTime + videoPlayedSeconds.current > vidoeDurationSeconds.current ||
          videoCurrentSeconds.current > vidoeDurationSeconds.current
        )
      ) {

        videoIsFinished.current = true;
        stopTimer('CURRENT');

      }

      updateProgress();
    },
    [props.courseProgress.studyTime, props.lessonCompleted, stopTimer, updateProgress]
  );

  const onEnded = React.useCallback(() => {
    videoCurrentSeconds.current = vidoeDurationSeconds.current;
    videoIsFinished.current = true;
    videoIsFirst.current = true;
    stopTimer('CURRENT', true);
  }, [stopTimer]);

  // 이펙트.

  React.useEffect(() => {
    if (!props.coursePlayFirst && videoPlayer.current) videoPlayer.current.play();
  }, [props.coursePlayFirst]);

  React.useEffect(() => {
    if (prevCourseUserSeq.current === null)
      prevCourseUserSeq.current = props.courseUserSeq;
    if (prevCourseProgress.current === null)
      prevCourseProgress.current = props.courseProgress;
    if (prevLesson.current === null) prevLesson.current = props.lesson;

    stopTimer('PREV');

    vidoeDurationSeconds.current = props.lesson ? props.lesson.totalTime : 0;
    videoCurrentSeconds.current = props.lesson ? props.courseProgress.studyLastTime : 0;
    videoPlayedSeconds.current = 0;
    videoIsSeeking.current = false;
    videoIsPaused.current = true;
    videoIsFirst.current = true;
    videoIsFinished.current = false;

    prevCourseUserSeq.current = props.courseUserSeq;
    prevCourseProgress.current = props.courseProgress;
    prevLesson.current = props.lesson;

    currentLessonSeq.current = props.lesson.seq;

    updateProgress();
  }, [
    props.lesson,
    props.courseProgress,
    props.courseUserSeq,
    stopTimer,
    updateProgress,
  ]);

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
