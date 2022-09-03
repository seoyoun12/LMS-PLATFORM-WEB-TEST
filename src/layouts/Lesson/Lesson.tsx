import React from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, Typography } from "@mui/material";
import { CourseDetailClientResponseDto, CourseModuleFindResponseDto, SurveyResponseDto } from "@common/api/Api";
import ApiClient from "@common/api/ApiClient";
import LessonSidebar from "./LessonSidebar";
import LessonContentVideo from "./LessonContentVideo";
import LessonContentSurvey from "./LessonContentSurvey";
import { LessonContentType, LESSON_CONTENT_TYPES } from "./Lesson.types";

export interface LessonProps {
  courseUserSeq: number;
  contentType: LessonContentType;
  contentSeq: number;
}

export default function Lesson(props: LessonProps) {

  const router = useRouter();

  // 스테이트.

  const [loading, setLoading] = React.useState<boolean>(true);
  const [dialog, setDialog] = React.useState<"FIRST" | "NEXT" | null>("FIRST");
  
  const [course, setCourse] = React.useState<CourseDetailClientResponseDto | null>(null);
  const [coursePlayFirst, setCoursePlayFirst] = React.useState<boolean>(true);
  const [courseModule, setCourseModule] = React.useState<CourseModuleFindResponseDto | null>(null);
  const [courseModules, setCourseModules] = React.useState<CourseModuleFindResponseDto[] | null>(null);
  const [moduleSurvey, setModuleSurvey] = React.useState<SurveyResponseDto | null>(null);

  // 레퍼런스.

  const lessonCompletedIndex = React.useRef<number>(-1);

  // 이펙트.
  
  React.useEffect(() => setCoursePlayFirst(true), [props.courseUserSeq]);

  React.useEffect(() => {

    if (props.contentType === "LESSON") setDialog("FIRST");

  }, [props.courseUserSeq, props.contentType]);

  React.useEffect(() => {

    setLoading(true);

    ApiClient.course
      .findCourseUsingGet(props.courseUserSeq)
      .then(async (res) => {

        const course = res.data.data;
        setCourse(course);

        const lastLessonCompletedIndex = course.lessons.findIndex((v) => v.completedYn === "N");

        if (lastLessonCompletedIndex === -1) lessonCompletedIndex.current = course.lessons.length - 1;
        else lessonCompletedIndex.current = lastLessonCompletedIndex - 1;

        return ApiClient.courseModule
          .clientFindAllCourseModulesUsingGet({ courseSeq: course.seq })
          .then(async(res) => {
            
            const courseModules = res.data.data;
            setCourseModules(courseModules);
            setCourseModule(null);

            switch (props.contentType) {

              case "SURVEY": return ApiClient.survey
                .findSurveyUsingGet(course.courseUserSeq, props.contentSeq)
                .then((res) => {
                  
                  const survey = res.data.data;
                  setModuleSurvey(survey);
                  setCourseModule(courseModules.find((module) => module.surveySeq === props.contentSeq));

                })
                .catch(() => setModuleSurvey(null));
    
            }
            
          })
          .catch(() => setCourseModules(null));

      })
      .catch(() => setCourse(null))
      .finally(() => setLoading(false));

  }, [props]);

  // 렌더 - 에러.

  if (course === null) {

    return (
      <LessonContentEmptyWrapper>
        {loading ?
          <CircularProgress size="1.5rem"/> :
          <Typography>강의를 찾을 수 없습니다.</Typography>
        }
      </LessonContentEmptyWrapper>
    );

  }

  // 컴포넌트.

  let Content: React.ReactElement;

  switch (props.contentType) {

    case "LESSON": {
      
        const lessonIndex = course.lessons.findIndex((lesson) => lesson.seq === props.contentSeq);
        const lesson = lessonIndex >= 0 ? course.lessons[lessonIndex] : null;
        const courseProgress = lesson && course.courseProgressResponseDtoList.find((v) => v.lessonSeq === lesson.seq) || null;

        Content = (
          <LessonContentVideo
            loading={loading}
            coursePlayFirst={coursePlayFirst}
            courseUserSeq={course.courseUserSeq}
            courseProgress={courseProgress}
            lesson={lesson}
            onComplete={() => lessonCompletedIndex.current = lessonIndex}
          />
        );

        break;

    }
    case "SURVEY": {

       Content = (
         <LessonContentSurvey
           loading={loading}
           courseUserSeq={course.courseUserSeq}
           courseModule={courseModule}
           survey={moduleSurvey}
         />
       );
  
      break;
  
    }
  
  }

  // 컴포넌트.

  const DialogFirst = (
    <Dialog
      open={dialog === "FIRST" && props.contentType === "LESSON"}
      onClose={() => {

        setDialog(null);
        setCoursePlayFirst(false);
      
      }}
    >
      <DialogContent>
        <DialogContentText>운전 중 교육 진행 시, 안전을 위해 교육이 중단 됩니다.</DialogContentText>
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

  const DialogNext = (
    <Dialog
      open={dialog === "NEXT"}
      onClose={() => setDialog(null)}
    >
      <DialogContent>
        <DialogContentText>현재 학습 완료 후 다음 학습으로 이동 가능합니다.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialog(null)}>확인</Button>
      </DialogActions>
    </Dialog>
  )

  // 렌더링.

  return (
    <LessonContainer maxWidth="xl">
      <LessonContentWrapper>
        {Content}
      </LessonContentWrapper>
      <LessonSidebar
        courseUserSeq={course.courseUserSeq}
        courseProgresses={course.courseProgressResponseDtoList}
        courseModules={courseModules}
        lessons={course.lessons}
        lessonSeq={props.contentType === "LESSON" ? props.contentSeq : null}
        onLessonSelect={(lessonIndex: number) => {

          if (lessonIndex > lessonCompletedIndex.current) return setDialog("NEXT");
          router.push(`/course/${props.courseUserSeq}/${LESSON_CONTENT_TYPES[0].toLowerCase()}/${course.lessons[lessonIndex].seq}`);

        }}
        onModuleSelect={(moduleIndex: number) => {

          const module = courseModules[moduleIndex];

          switch (module.moduleType) {

            case "COURSE_MODULE_PROGRESS_RATE": break;
            case "COURSE_MODULE_SURVEY": router.push(`/course/${props.courseUserSeq}/${LESSON_CONTENT_TYPES[1].toLowerCase()}/${module.surveySeq}`); break;
            case "COURSE_MODULE_TEST": break;

          }

        }}
      />
      {DialogFirst}
      {DialogNext}
    </LessonContainer>
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
  align-items : center;
  justify-content: center;
`;
