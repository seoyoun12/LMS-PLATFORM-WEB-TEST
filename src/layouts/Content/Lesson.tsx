import React from "react";
import styled from "@emotion/styled";
import { Box, Container, Typography } from "@mui/material";
import { Spinner } from "@components/ui";
import { useRouter } from "next/router";
import { useCourse } from "@common/api/course";
import { LessonSidebar } from "./LessonSidebar";
import { MainContent } from "./MainContent";
import { LessonContent } from "./LessonContent";

const tabsConfig = [
  { label: '커리큘럼', value: 'curriculum' },
  // { label: '공지사항', value: 'notice' },
  // { label: '수업자료', value: 'stuff' },
];

const testList = [
  {
    title: '중간평가입니다.',
    score: 70,
    description: '시험',
    type: 'test',
    isTest: true,
    complete: true,
  },
  // {title:"과제평가입니다." , score: 0 , description:"과제",type:"report", isTest:false , complete:false} 보류
];

const noticeConfig = [
  {
    seq: 0,
    title: '오쩔',
    type: 'notice',
    content: '## 안녕하세요\n**수강완료!**\n잠이나 자세요!\n',
    date: '2022.04.12 18:46:21',
    complete: true,
  },
  {
    seq: 1,
    title: '오지사항 제목입니다.',
    type: 'notice',
    content: '요를레히후.',
    date: '2022.04.15 9:46:21',
    complete: false,
  },
  {
    seq: 2,
    title: '오지사항 제목입니다.지사항 제목입니다.',
    type: 'notice',
    content: '요를레히요를레히요를레히요를레히요를레히요를레히요를레히후.',
    date: '2022.04.19 14:46:21',
    complete: false,
  },
];

const fileList = [
  { seq: 0, title: '어쩔파일입니다.pdf' },
  { seq: 1, title: '어쩔파일입니다2.pdf' },
  { seq: 2, title: '어쩔파일입니다3.pdf' },
];

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

  // 함수.
  
  console.log("lesson");
  
  // 렌더.

  return (
    <LessonContainer maxWidth={false}>
      <LessonVideoContainer>
        {lesson ?
          <LessonContent
            lesson={lesson}
            notice={noticeConfig}
          /> :
          <LessonVideoNotFount>강의가 존재하지 않습니다.</LessonVideoNotFount>
        }
      </LessonVideoContainer>
      <LessonSidebar
        course={course}
        tabsConfig={tabsConfig}
        testList={testList}
        noticeConfig={noticeConfig}
        fileList={fileList}
      />
    </LessonContainer>
  );
}

// TODO: LessonContent 없으면 사이더가 치우쳐짐
// TODO: LessonContent 비디오가 계속 리셋됨(아마 컴포넌트 다시 렌더링 되어서 그런거)

const CourseErrorContainer = styled(Box)`
  display: flex;
  min-height: 50vh;
  align-items : center;
  justify-content: center;
`;

const LessonContainer = styled(Container)`
  padding: 0 50px;
  display: flex;
  flex: 1 1 auto;
  position: relative;
  width: 100%;
  max-width: calc(100% - 68px);
`;

const LessonVideoContainer = styled.div`
  flex: 1;
  padding-top: 32px;
`;

const LessonVideoNotFount = styled.div`
  display: flex;
  aspect-ratio: 16 / 9;
  align-items : center;
  justify-content: center;
`
