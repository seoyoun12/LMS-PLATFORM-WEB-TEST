import { revealVideoState } from "@common/recoil";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { CourseRes, useCourse } from "@common/api/course";
import { TuiViewer } from "@components/common/TuiEditor";
import { Link, VideoPlayer } from "@components/common";
import { useRouter } from "next/router";
import { Spinner } from "@components/ui";
import { TestContent } from "./TestContent";
import { useEffect } from "react";
import { NoticeContent } from "./NoticeContent";
import { Box, Typography } from "@mui/material";

interface Props {
  course: CourseRes;
  noticeConfig: {
    title: string;
    content: string;
    date: string;
    complete: boolean;
  }[];
}

export function MainContent({ course, noticeConfig }: Props) {
  const router = useRouter();
  const { query } = router;
  const { courseId, lessonId } = query;
  // const { course, courseError } = useCourse(Number(courseId));
  const [revealVideo, setRevealVideo] = useRecoilState(revealVideoState);

  useEffect(() => {
    console.log("실행여부", query);
    if (query.content) {
      setRevealVideo(false);
    } else {
      setRevealVideo(true);
    }
  }, [query.content]);

  return (
    <MainSection>
      {/* {revealVideo ? 
    <VideoPlayerContainer>
      <VideoPlayer
        config={{
          playlist: course.lessons.filter(lesson => lesson.seq === Number(lessonId))[0].s3Files[0].path,
          autostart: false
        }}
      />
      <Box>
        <Typography sx={{fontWeight:"bold" , marginBottom:"0.25rem"}} >{course.lessons.filter((lesson)=>lesson.seq === Number(lessonId))[0].lessonNm}</Typography>
        <Typography sx={{fontWeight:"bold"}} variant="h6" >{course.courseSubName}</Typography>
      </Box>
    </VideoPlayerContainer> : router.query.content === "test" ?<TestContent noticeConfig={noticeConfig} /> : <NoticeContent course={course} />} */}
      네
    </MainSection>
  );
}

const MainSection = styled.div`
  flex: 1;
  padding-top: 32px;
`;

const VideoPlayerContainer = styled.div`
  height: calc(100vh - 160px);
`;
