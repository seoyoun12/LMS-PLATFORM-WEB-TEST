import { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
  Box,
  CircularProgress,
  LinearProgress,
  Typography,
} from '@mui/material';
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
import { LessonContentVideoModal } from './LessonContentVideoModal';
import useQuiz from '@common/api/quiz/useQuiz';
import getRandomInt from '@utils/getRandomInt';
import getRandomInteger from '@utils/getRandomInt';

const PLAYER_ELEMENT_ID = 'lesson-player' as const;

export interface IQuiz {
  alarmContent: string;
  answer: string;
  feedback: string;
  item1: string;
  item2: string;
  item3: string;
  item4: string;
  itemO: string;
  itemX: string;
  lessonQuizTypeEnum: "ALARM" | "MULTIPLE_CHOICE" | "OX_QUIZ";
  lessonSeq: number;
  quizContent: string;
  randomTime: boolean;
  setTimeMin: number;
  setTimeSecond: number;
  
}


export interface IQuizTime extends IQuiz {
  quizOccurTime: number;
  isSolvedQuiz: boolean;
}

interface Props {
  coursePlayFirst?: boolean;
  courseUserSeq: number;
  courseProgress: CourseProgressResponseDto | null;
  lesson: LessonDetailClientResponseDto | null;
  lessonCompleted?: boolean;
  loading?: boolean;
  onComplete?: (isEnd: boolean) => Promise<boolean>;
  currentLessonPlayTime: number;

}

//정신병자코드. 이 코드 작성자가 다른회사에 가서 이런 미친짓을 할까봐 너무 걱정이다.
export default function LessonContentVideo(props: Props) {
  const router = useRouter();
  const routerAsPath = router.asPath;
  const [lessonVideoInfo, setLessonVideoInfo] = useRecoilState(learningStatus); //헤더 학습종료를 위한 리코일
  const [openModal, setOpenModal] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { contentSeq: lessonSeq } = router.query; // courseUserSeq가 courseSeq, contentSeq가 lessonSeq입니다. Swagger 참조하실 때 참고해주세요.
  const { quiz, error } = useQuiz(+lessonSeq);
  const [progress, setProgress] = useState<number>(0); // 현재 lesson의 진행률을 나타내기 위한 state
  const [occurTimeQuiz, setOccurTimeQuiz] = useState<IQuizTime[] | []>([]);
  const [currentQuiz, setCurrentQuiz] = useState<IQuizTime | null>(null);
  const prevCourseUserSeq = useRef<number | null>(null);
  const prevCourseProgress = useRef<CourseProgressResponseDto | null>(null);
  const prevLesson = useRef<LessonDetailClientResponseDto | null>(null);
  const currentLessonSeq = useRef<number | null>(null);
  const apiTimer = useRef<number | null>(null);
  const apiSeconds = useRef<number>(0);
  const apiVideoSeconds = useRef<number>(0);
  const videoPlayer = useRef<Ncplayer | null>(null);
  const vidoeDurationSeconds = useRef<number>(0);
  const videoCurrentSeconds = useRef<number>(0);
  const videoPlayedSeconds = useRef<number>(0);
  const videoIsSeeking = useRef<boolean>(false);
  const videoIsPaused = useRef<boolean>(true);
  const videoIsFirst = useRef<boolean>(true);
  const videoIsFinished = useRef<boolean>(false);
  
  const updateProgress = useCallback(() => {
    const seconds = props.courseProgress.studyTime + videoPlayedSeconds.current;
    setProgress(
      !props.lessonCompleted &&
        vidoeDurationSeconds.current > 0 &&
        seconds < vidoeDurationSeconds.current
        ? seconds / vidoeDurationSeconds.current
        : 1
    );
  }, [props.courseProgress.studyTime, props.lessonCompleted]);

  const stopTimer = useCallback(
    async (mode: 'PREV' | 'CURRENT' | 'RESET', isEnd = false) => {
      if (apiTimer.current !== null) {
        window.clearInterval(apiTimer.current);

        if (mode !== 'RESET') {
          if ((mode === 'CURRENT' && (props.lesson === null || props.courseProgress.courseProgressSeq === null))
            ||(mode === 'PREV' && props.courseUserSeq === prevCourseUserSeq.current && props.lesson.seq === prevLesson.current.seq))
            return;

          if (mode === 'CURRENT') {
            videoIsFinished.current = true;
            videoIsFirst.current = true;
          }

          const courseUserSeq = mode === 'PREV' ? prevCourseUserSeq.current : props.courseUserSeq;
          const courseProgressSeq =
              mode === 'PREV'
              ? prevCourseProgress.current.courseProgressSeq
              : props.courseProgress.courseProgressSeq;
          const lessonSeq =
            mode === 'PREV' ? prevLesson.current.seq : props.lesson.seq;
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
                .then(
                  () =>
                    v.data.data.completeYn === 'Y' && props.onComplete(isEnd)
                );
            });
        }
      }

      apiTimer.current = null;
      apiSeconds.current = 0;
      apiVideoSeconds.current = 0;
    },[props]);
    
  const startTimer = useCallback(() => {
    stopTimer('RESET');
    if (props.lesson === null ||props.courseProgress.courseProgressSeq === null) return;

    const courseUserSeq = props.courseUserSeq;
    const courseProgressSeq = props.courseProgress.courseProgressSeq;
    const lessonSeq = props.lesson.seq;

    const timer = window.setInterval(() => {
      if (currentLessonSeq.current !== lessonSeq || router.asPath !== routerAsPath || apiTimer.current !== timer) return clearInterval(timer);
      apiSeconds.current++;
      if (apiSeconds.current >= 30) {
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
            })
          );
        apiSeconds.current = 0;
        apiVideoSeconds.current = 0;
      }
      setLessonVideoInfo({
        courseUserSeq,
        lessonSeq,
        studyTime: apiVideoSeconds.current,
        studyLastTime: videoCurrentSeconds.current,
        courseProgressSeq: courseProgressSeq,
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
    setLessonVideoInfo
  ]);

  const onPause = useCallback(() => {
    videoIsPaused.current = true;
  }, []);

  const onPlaying = useCallback(() => {
    if ( props.lesson === null || props.courseProgress.courseProgressSeq === null) return;

    if (videoIsFirst.current) {
      ApiClient.courseLog.createCourseModulesUsingPost1({
        courseUserSeq: props.courseUserSeq,
        lessonSeq: props.lesson.seq,
        studyTime: 0,
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

  const onSeeking = useCallback(() => {
    videoIsSeeking.current = true;
  }, []);

  const onSeeked = useCallback(() => {
    videoIsSeeking.current = false;
  }, []);
  // currentLessonPlayTime
  const handleCloseModal = async () => {
    setOpenModal(false);
    // 모달 종료시 다시
    videoPlayer.current?.play();
    if (isFullScreen === true) {
      videoPlayer.current?.fullscreen(true);
      setIsFullScreen(false);
    }
  };

  const onTimeChange = useCallback(
    (time: number) => {
      if (time === videoCurrentSeconds.current) return;
      
     
      if ( time !== videoCurrentSeconds.current + 1 || videoIsPaused.current || videoIsSeeking.current ) {
        videoCurrentSeconds.current = time;
        return;
      }

      videoCurrentSeconds.current = time;
      videoPlayedSeconds.current++;
      apiVideoSeconds.current++;

      if (
        !props.lessonCompleted &&
        !videoIsFinished.current &&
        (props.courseProgress.studyTime + videoPlayedSeconds.current >
          vidoeDurationSeconds.current ||
          videoCurrentSeconds.current > vidoeDurationSeconds.current)
      ) {
        videoIsFinished.current = true;
        stopTimer('CURRENT');
      }

      updateProgress();
    },
    [
      props.courseProgress.studyTime,
      props.lessonCompleted,
      stopTimer,
      updateProgress,
    ]
  );

  // 종료
  const onEnded = useCallback(() => {
    videoCurrentSeconds.current = vidoeDurationSeconds.current;
    videoIsFinished.current = true;
    videoIsFirst.current = true;
    stopTimer('CURRENT', true);
  }, [stopTimer]);


  useEffect(() => {
     // 시간되면 정지 후 모달
   const flag = setInterval(() => {
      occurTimeQuiz.forEach((quiz:IQuizTime) => {
        if (!quiz.isSolvedQuiz && quiz.quizOccurTime === videoCurrentSeconds.current) {
            videoPlayer.current?.pause();
            setCurrentQuiz(quiz);
            const quizOccurTime = JSON.parse(localStorage.getItem(lessonSeq + ''));
            const filteredQuiz = quizOccurTime.filter((item:IQuizTime) => item.quizOccurTime !== quiz.quizOccurTime);
            localStorage.setItem(lessonSeq as string, JSON.stringify(filteredQuiz));
            setOccurTimeQuiz(filteredQuiz);
          if (document.fullscreenElement !== null) {
            videoPlayer.current?.fullscreen(false);
            setIsFullScreen(true);
          }
          setOpenModal(true);
        }
        })
    },1000)
  
    return () => clearInterval(flag)
  },[occurTimeQuiz])

  // console.log(videoCurrentSeconds.current);
  
  useEffect(() => {
    if (!props.coursePlayFirst && videoPlayer.current)
    
      videoPlayer.current.play();
  }, [props.coursePlayFirst]);

  useEffect(() => {
    if (prevCourseUserSeq.current === null) prevCourseUserSeq.current = props.courseUserSeq;
    if (prevCourseProgress.current === null) prevCourseProgress.current = props.courseProgress;
    if (prevLesson.current === null) prevLesson.current = props.lesson;
    stopTimer('PREV');

    vidoeDurationSeconds.current = props.lesson ? props.lesson.totalTime : 0;
    videoCurrentSeconds.current = props.lesson
      ? props.courseProgress.studyLastTime
      : 0;
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

  
  useEffect(() => {
    if(!quiz) return;

    // const quizTime = JSON.parse(localStorage.getItem(lessonSeq as string));

    const addedOccuretimeQuiz = getRandomInteger(quiz, props.currentLessonPlayTime)
    localStorage.setItem(lessonSeq as string, JSON.stringify(addedOccuretimeQuiz));
    setOccurTimeQuiz(addedOccuretimeQuiz);
  },[lessonSeq,quiz])


  if (props.loading)
    return (
      <VideoContentWrapper>
        <CircularProgress size='1.5rem' />
      </VideoContentWrapper>
    );
  if (props.lesson === null || props.courseProgress === null) return <VideoContentWrapper>강의가 존재하지 않습니다.</VideoContentWrapper>;

  if(error) return <VideoContentWrapper>에러가 발생했습니다.</VideoContentWrapper>
    
  return (
    <>
      <VideoContainer>
        {/* 비디오플레이어위치 */}
        <VideoContentPlayerWrapper>
          {/* Quiz 모달 */}
          {quiz?.length > 0 && <LessonContentVideoModal
            open={openModal} // openModal  
            handleClose={handleCloseModal}
            quiz={currentQuiz}
          />}
          
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
            onReady={(v) => (videoPlayer.current = v)}
            
          ></VideoPlayer>
        </VideoContentPlayerWrapper>
        
        <ContentInfoContainer>
          <ContentInfoTitle variant='h6'>
            {props.lesson.lessonNm}
          </ContentInfoTitle>
          <ContentInfoProgressContainer>
            <Typography fontWeight='bold' color='#ff5600' fontSize='inherit'>
              {Math.floor(progress * 100)}% 수강 완료
            </Typography>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress
                variant='determinate'
                value={Math.floor(progress * 100)}
              />
            </Box>
          </ContentInfoProgressContainer>
        </ContentInfoContainer>
      </VideoContainer>
    </>
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
  position: relative;

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
