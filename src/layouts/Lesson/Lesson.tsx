import ApiClient from '@common/api/ApiClient';
import LessonSidebar from './LessonSidebar';
import LessonContentVideo from './LessonContentVideo';
import LessonContentSurvey from './LessonContentSurvey';
import styled from '@emotion/styled';
import LessonHeader from './LessonHeader';
import { Button,Container,Dialog,DialogActions,DialogContent,DialogContentText,Typography } from '@mui/material';
import { CourseDetailClientResponseDto,CourseModuleFindResponseDto,SurveyResponseDto } from '@common/api/Api';
import { LessonContentType, LESSON_CONTENT_TYPES } from './Lesson.types';
import { useRouter } from 'next/router';

import { Fragment, ReactElement, useEffect, useState } from 'react';
import useLesson from '@hooks/useLesson';
import LessonRejectPage from '@components/Lesson/LessonRejectPage';

export interface LessonProps {
  courseUserSeq: number;
  contentType: LessonContentType;
  contentSeq: number;
}

let Content: ReactElement = <Fragment/>;
let DialogFirst: ReactElement = <Fragment/>;
let DialogNext: ReactElement = <Fragment/>;
let DialogSurvey: ReactElement = <Fragment/>;

export default function Lesson(props: LessonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState<'FIRST' | "NEXT" | "SURVEY" | null>('FIRST');
  const [course, setCourse] = useState<CourseDetailClientResponseDto | null>(null);
  const [courseTotalProgress, setCourseTotalProgress] = useState<number | null>(null);
  const [coursePlayFirst, setCoursePlayFirst] = useState(true);
  const [courseLessonsCompleted, setCourseLessonsCompleted] = useState<boolean[]>([]);
  const [courseModule, setCourseModule] = useState<CourseModuleFindResponseDto | null>(null);
  const [courseModules, setCourseModules] = useState<CourseModuleFindResponseDto[] | null>(null);
  const [courseModulesCompleted, setCourseModulesCompleted] = useState<boolean[]>([]);
  const [moduleSurvey, setModuleSurvey] = useState<SurveyResponseDto | null>(null);
  const [moduleSurveyTodo, setModuleSurveyTodo] = useState<CourseModuleFindResponseDto | null>(null);
  const [currentLessonPlayTime,setCurrentLessonPlayTime] = useState(0);
  const { getCheckAvailableLesson } = useLesson();
  const [isAvailableLesson,setIsAvailableLesson] = useState(true);
  
  const getAvaliableLessonCheckResult = async ({courseUserSeq, contentSeq}) => {
    const data = await getCheckAvailableLesson({courseUserSeq, contentSeq});
    
    setIsAvailableLesson(data);
  }
  
  useEffect(() => {
    const contentType = router.query.contentType;
    
    if(!course) return;
      if(contentType === 'survey') return;
    getAvaliableLessonCheckResult({courseUserSeq: course.courseUserSeq, contentSeq: props.contentSeq})
  },[course,props.contentSeq])

  useEffect(() => {
    const { lessons } = course || { lessons: [] };
    const { contentSeq: lessonSeq } = props;
    const currentLesson = lessons.find((lesson) => lesson.seq === lessonSeq);
    setCurrentLessonPlayTime(currentLesson?.completeTime || 0);
  },[props,course])

  useEffect(() => {
    setCoursePlayFirst(true)
  }
  , [props.courseUserSeq]);
  
  useEffect(() => {
    if (props.contentType === 'LESSON') setDialog('FIRST');
  }, [props.courseUserSeq, props.contentType]);
  
  useEffect(() => {
    setLoading(true);

    ApiClient.course
      .findCourseUsingGet(props.courseUserSeq)
      .then(async res => {
        const course = res.data.data;

        setCourse(course);
        setCourseTotalProgress(course.totalProgress);
        setCourseLessonsCompleted(course.lessons.map(v => v.completedYn === 'Y'));
        setCourseModulesCompleted([]);

        return ApiClient.courseModule
          .clientFindAllCourseModulesUsingGet({ courseSeq: course.seq })
          .then(async res => {
            const courseModules = res.data.data;
            setCourseModules(courseModules);
            setCourseModule(null);
            setCourseModulesCompleted(
              courseModules.map(cm => {
                switch (cm.moduleType) {
                  case 'COURSE_MODULE_PROGRESS_RATE':
                    return cm.submitYn === 'Y';
                  case 'COURSE_MODULE_TEST':
                    return cm.submitYn === 'Y';
                  case 'COURSE_MODULE_SURVEY':
                    return course.surveyList.findIndex(v => v.surveySeq === cm.surveySeq && v.surveyCompletedYn === 'Y') !== -1;   
                }
              })
            );

            switch (props.contentType) {
              case 'SURVEY':
                return ApiClient.survey
                  .findSurveyUsingGet(course.courseUserSeq, props.contentSeq)
                  .then(res => {
                    const survey = res.data.data;
                    setModuleSurvey(survey);
                    setCourseModule(
                      courseModules.find(module => module.surveySeq === props.contentSeq)
                    );
                  })
                  .catch(() => {
                    setModuleSurvey(null);
                    setCourseModule(null);
                  });
            }
          })
          .catch(() => setCourseModules(null));
      })
      .catch(() => setCourse(null))
      .finally(() => setLoading(false));
  }, [props]);

  useEffect(() => {
    if (!courseModules) return;
    const surveyTodo = courseModules.find((v, i) => v.moduleType === "COURSE_MODULE_SURVEY" && !courseModulesCompleted[i]) || null;
    setModuleSurveyTodo(surveyTodo);
    // if (course.totalProgress >= 100 && surveyTodo) setDialog("SURVEY");
  }, [course, courseModules, courseModulesCompleted]);
  // falsy값이 아닌 명확한 false값을 비교해야함
  if(isAvailableLesson === false) return <LessonRejectPage />

  if (course === null) {
    return (
      <LessonContentEmptyWrapper>
        <Typography>강의를 찾을 수 없습니다.</Typography>
      </LessonContentEmptyWrapper>
    );
  }

  switch (props.contentType) {
    case 'LESSON': {
      const lessonIndex = course.lessons.findIndex(lesson => lesson.seq === props.contentSeq);
      const lesson = lessonIndex >= 0 ? course.lessons[lessonIndex] : null;
      const courseProgress = lesson ? course.courseProgressResponseDtoList.find(v => v.lessonSeq === lesson.seq) : null;

      Content = (
        <LessonContentVideo
          loading={loading}
          coursePlayFirst={coursePlayFirst}
          courseUserSeq={course.courseUserSeq}
          courseProgress={courseProgress}
          lesson={lesson}
          lessonCompleted={!!courseLessonsCompleted[lessonIndex]}
          onComplete={(isEnd) => 
            ApiClient.course
            .findCourseUsingGet(course.courseUserSeq)
            .then((res) => {
              const course = res.data.data;
              const completed = course.lessons[lessonIndex].completedYn === "Y";
              const newCourseLessonsCompleted = [...courseLessonsCompleted];
              newCourseLessonsCompleted[lessonIndex] = completed;
              setCourseLessonsCompleted(newCourseLessonsCompleted);
              setCourseTotalProgress(course.totalProgress);
              if (completed && course.lessons[lessonIndex + 1] && isEnd) setDialog("NEXT");
              return completed;
            })
          }
          currentLessonPlayTime={currentLessonPlayTime}
        />
      );

      DialogFirst = (
        course.courseType === 'TYPE_PROVINCIAL'
        ? null
        : <Dialog
          open={dialog === 'FIRST'}
          onClose={() => {
            setDialog(null);
            setCoursePlayFirst(false);
          }}
        >
          <DialogContent>
            <DialogContentText>
              운전 중 교육 진행 시, 안전을 위해 교육이 중단 됩니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setDialog(null);
                setCoursePlayFirst(false);
              }}
            >
              확인
            </Button>
          </DialogActions>
        </Dialog>
      );

      DialogNext = (
        <Dialog
          open={dialog === 'NEXT' && lessonIndex >= 0}
          onClose={() => setDialog(null)}
        >
          <DialogContent>
            <DialogContentText>
              {lessonIndex + 1}차시 수강이 완료되었습니다. 다음 차시를 시청 하시겠습니까?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setDialog(null);
                router.push(`/course/${course.courseUserSeq}/${LESSON_CONTENT_TYPES[0].toLowerCase()}/${course.lessons[lessonIndex + 1].seq}`);
              }}
            >
              예
            </Button>
            <Button onClick={() => setDialog(null)}>아니요</Button>
          </DialogActions>
        </Dialog>
      );
      break;
    }
    case 'SURVEY': {
      const moduleIndex = courseModules ? courseModules.findIndex(module => module.surveySeq === props.contentSeq) : -1;

      Content = (
        <LessonContentSurvey
          loading={loading}
          courseUserSeq={course.courseUserSeq}
          courseModule={courseModule}
          survey={moduleSurvey}
          surveyCompleted={!!courseModulesCompleted[moduleIndex]}
          onComplete={() => {
            const newCourseModulesCompleted = [...courseModulesCompleted];
            newCourseModulesCompleted[moduleIndex] = true;
            setCourseModulesCompleted(newCourseModulesCompleted);
          }}
        />
      );

      break;
    }
  }

  if (moduleSurveyTodo && !(props.contentType === "SURVEY" && moduleSurveyTodo.surveySeq === props.contentSeq)) {
    DialogSurvey = (
      <Dialog
        open={dialog === 'SURVEY'}
        onClose={() => {
          router.push(`/course/${course.courseUserSeq}/${LESSON_CONTENT_TYPES[1].toLowerCase()}/${moduleSurveyTodo.surveySeq}`);
          setDialog(null);
        }}
        
      >
        <DialogContent>
          <DialogContentText>
            운수종사자 보수교육 온라인과정을 수료하셨습니다. 다음 만족도 조사 설문에 참여해 주시시기 바랍니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              console.log(dialog);
              router.push(`/course/${course.courseUserSeq}/${LESSON_CONTENT_TYPES[1].toLowerCase()}/${moduleSurveyTodo.surveySeq}`);
              setDialog(null);
            }}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    );
    
  }

  return (
    <>
      <LessonHeader />
      <LessonContainer maxWidth="xl">
        <LessonContentWrapper>{Content}</LessonContentWrapper>
        <LessonSidebar
          courseUserSeq={course.courseUserSeq}
          courseTotalProgress={courseTotalProgress}
          courseProgresses={course.courseProgressResponseDtoList}
          courseModules={courseModules}
          courseLessonsCompleted={courseLessonsCompleted}
          courseModulesCompleted={courseModulesCompleted}
          courselessons={course.lessons}
          courseLessonSeq={props.contentType === 'LESSON' ? props.contentSeq : null}
          />
        {DialogFirst}
        {DialogNext}
        {DialogSurvey}
      </LessonContainer>
    </>
  );
}

const LessonContainer = styled(Container)`
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 4rem;
  padding: 0 1rem;
  display: flex;
  flex: 1 1 auto;
  position: relative;
  align-items: stretch;
  @media (max-width: 1024px) {
    margin-top: unset;
    flex-direction: column;
  }
`;

const LessonContentWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
`;

const LessonContentEmptyWrapper = styled(LessonContentWrapper)`
  display: flex;
  min-height: 50vh;
  align-items: center;
  justify-content: center;
`;
