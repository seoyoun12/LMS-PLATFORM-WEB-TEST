import React from "react";
import styled from "@emotion/styled";
import { Box, Container, Typography } from "@mui/material";
import { Spinner } from "@components/ui";
import { useRouter } from "next/router";
import { useCourse } from "@common/api/course";
import { LessonSidebar } from "./LessonSidebar";
import { LessonContent } from "./LessonContent";
import { noticeConfig } from "./Lesson.types";

export function Lesson() {

  const router = useRouter();

  // 스테이트.

  const [lessonSeq, setLessonSeq] = React.useState<number>(Number(router.query.lessonSeq));
  const [courseUserSeq, setCourseUserSeq] = React.useState<number>(Number(router.query.courseUserSeq));

  // 이펙트.

  React.useEffect(() => {

    setLessonSeq(Number(router.query.lessonSeq));
    setCourseUserSeq(Number(router.query.courseUserSeq));

  }, [router.query]);

  // API.

  const { course, courseError } = useCourse(courseUserSeq);

  // 렌더 - 에러.

  if (courseError) return (
    <CourseErrorContainer>
      <Typography>강의를 불러올 수 없습니다.</Typography>
    </CourseErrorContainer>
  );

  if (!course) return <Spinner />;

  // 변수.

  const lessonIndex = course.lessons.findIndex((lesson) => lesson.seq === lessonSeq);
  const lesson = lessonIndex >= 0 ? course.lessons[lessonIndex] : null;
  const courseProgressSeq = lesson && course.courseProgressResponseDtoList.find((v) => v.lessonSeq = lesson.seq)?.courseProgressSeq || null;

  // 렌더링.

  return (
    <LessonContainer maxWidth={false}>
      <LessonContent
        courseUserSeq={course.courseUserSeq}
        courseProgressSeq={courseProgressSeq}
        lesson={lesson}
        notice={noticeConfig}
      />
      <LessonSidebar
        courseUserSeq={course.courseUserSeq}
        lessons={course.lessons}
        lessonSeq={lessonSeq}
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
  margin-top: 32px;
  padding: 0 50px;
  display: flex;
  flex: 1 1 auto;
  position: relative;
  max-width: 1920px;
`;
