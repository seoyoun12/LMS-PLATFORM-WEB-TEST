import { Box, Container, Divider, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Spinner, Tabs } from "@components/ui";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Link, VideoPlayer } from "@components/common";
import { useCourse } from "@common/api/course";
import { TuiViewer } from "@components/common/TuiEditor";
import { LessonSidebar } from "./LessonSidebar";
import { useRecoilState } from "recoil";
import { MainContent } from "./MainContent";

const tabsConfig = [
  { label: "커리큘럼", value: "curriculum" },
  // { label: '공지사항', value: 'notice' },
  // { label: '수업자료', value: 'stuff' },
];

const testList = [
  { title: "중간평가입니다.", score: 70, description: "시험", type: "test", isTest: true, complete: true },
  // {title:"과제평가입니다." , score: 0 , description:"과제",type:"report", isTest:false , complete:false} 보류
];

const noticeConfig = [
  {
    seq: 0,
    title: "오쩔",
    type: "notice",
    content: "## 안녕하세요\n**수강완료!**\n잠이나 자세요!\n",
    date: "2022.04.12 18:46:21",
    complete: true,
  },
  {
    seq: 1,
    title: "오지사항 제목입니다.",
    type: "notice",
    content: "요를레히후.",
    date: "2022.04.15 9:46:21",
    complete: false,
  },
  {
    seq: 2,
    title: "오지사항 제목입니다.지사항 제목입니다.",
    type: "notice",
    content: "요를레히요를레히요를레히요를레히요를레히요를레히요를레히후.",
    date: "2022.04.19 14:46:21",
    complete: false,
  },
];

const fileList = [
  { seq: 0, title: "어쩔파일입니다.pdf" },
  { seq: 1, title: "어쩔파일입니다2.pdf" },
  { seq: 2, title: "어쩔파일입니다3.pdf" },
];

export function Lesson() {
  const router = useRouter();
  const { query, pathname } = router;
  const { courseId, lessonId } = query;
  const { course, courseError } = useCourse(Number(courseId));

  if (courseError) return <div>error</div>;
  if (!course) return <Spinner />;
  return (
    <ContentContainer maxWidth={false}>
      {/* <MainSection>
        {revealVideo ? <VideoPlayerContainer>
          <VideoPlayer
            config={{
              playlist: course.lessons.filter(lesson => lesson.seq === Number(lessonId))[0].s3Files[0].path,
              autostart: false
            }}
          />
        </VideoPlayerContainer> : <TuiViewer initialValue={noticeConfig[0].content} />}
      </MainSection> */}
      <MainContent course={course} noticeConfig={noticeConfig} />

      <LessonSidebar
        course={course}
        tabsConfig={tabsConfig}
        testList={testList}
        noticeConfig={noticeConfig}
        fileList={fileList}
      />
    </ContentContainer>
  );
}

const ContentContainer = styled(Container)`
  padding: 0 50px;
  display: flex;
  flex: 1 1 auto;
  position: relative;
  width: 100%;
  max-width: calc(100% - 68px);
`;

const MainSection = styled.div`
  flex: 1;
`;

// const StickySideBar = styled.aside`
//   position: sticky;
//   top: ${headerHeight};
//   margin-left: 40px;
//   padding-top: 32px;
//   width: 480px;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   background-color: #fff;
//   z-index: 1;
//   flex-shrink: 0;
//   overflow: hidden;
// `;

const VideoPlayerContainer = styled.div`
  height: calc(100vh - 160px);
`;

// const TabMenu = styled(Tabs)`
//   padding-bottom: 30px;
// `;

// const LessonTitle = styled(Typography)`
// &.active {
//     font-weight:500;
//   }
// `;

// const MenuCellLink = styled(Link)`
//   display: block;
//   padding: 12px;
//   min-height: 36px;
//   cursor: pointer;
//   display:flex;
//   justify-content:space-between;

// `;

// const LessonInfo = styled.div`
//   display: flex;
//   align-items: center;
//   padding-top: 4px;

//   .typo {
//     margin-left: 4px;
//   }
// `;

// const LessonCheck = styled(Box)`
//   display:flex;
//   align-items:center;
// `
