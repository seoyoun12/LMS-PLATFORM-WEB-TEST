import React from "react";
import styled from "@emotion/styled";
import { Box, Container, Typography } from "@mui/material";
import { Spinner } from "@components/ui";
import type { CourseDetailClientResponseDto, CourseModuleFindResponseDto } from "@common/api/Api";
import ApiClient from "@common/api/ApiClient";
import LessonSidebar from "./LessonSidebar";
import LessonContent from "./LessonContent";

export interface Props {
  courseUserSeq: number;
  lessonSeq: number;
}

export default function Lesson(props: Props) {

  // 스테이트.

  const [lessonSeq, setLessonSeq] = React.useState<number>(props.lessonSeq);

  const [loading, setLoading] = React.useState<boolean>(true);
  const [course, setCourse] = React.useState<CourseDetailClientResponseDto | null>(null);
  const [modules, setModules] = React.useState<CourseModuleFindResponseDto[] | null>(null);

  // 이펙트.

  React.useEffect(() => {

    const courseUserSeq = Number(props.courseUserSeq);
    const lessonSeq = Number(props.lessonSeq);

    setLessonSeq(lessonSeq);
    setLoading(true);

    ApiClient.course
      .findCourseUsingGet(courseUserSeq)
      .then((res) => {

        const data = res.data.data;
        setCourse(data);

        ApiClient.courseModule
          .clientFindAllCourseModulesUsingGet({ courseSeq: data.seq })
          .then((res) =>  setModules(res.data.data))
          .catch(() => setModules(null))
          .finally(() => setLoading(false));

      })
      .catch(() => {

        setCourse(null);
        setModules(null);
        setLoading(false);
        
      });

  }, [props]);

  // 렌더 - 에러.

  if (course === null) {

    return loading ?
      <Spinner /> :
      (
        <CourseErrorContainer>
          <Typography>강의를 불러올 수 없습니다.</Typography>
        </CourseErrorContainer>
      );

  }

  // 변수.

  const lessonIndex = course.lessons.findIndex((lesson) => lesson.seq === lessonSeq);
  const lesson = lessonIndex >= 0 ? course.lessons[lessonIndex] : null;
  const courseProgress = lesson && course.courseProgressResponseDtoList.find((v) => v.lessonSeq === lesson.seq) || null;

  // 렌더링.

  return (
    <LessonContainer maxWidth={false}>
      <LessonContent
        courseUserSeq={course.courseUserSeq}
        courseProgress={courseProgress}
        lesson={lesson}
      />
      <LessonSidebar
        courseUserSeq={course.courseUserSeq}
        courseProgresses={course.courseProgressResponseDtoList}
        lessons={course.lessons}
        lessonSeq={lessonSeq}
        modules={modules}
      />
    </LessonContainer>
  );
}

const CourseErrorContainer = styled(Box)`
  display: flex;
  min-height: 50vh;
  align-items : center;
  justify-content: center;
`;

const LessonContainer = styled(Container)`
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 4rem;
  padding: 0 50px;
  display: flex;
  flex: 1 1 auto;
  position: relative;
  max-width: 1920px;
  align-items: stretch;
`;
