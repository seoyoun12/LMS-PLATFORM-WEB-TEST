import { revealVideoState } from "@common/recoil";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { CourseRes, useCourse } from "@common/api/course";
import { TuiViewer } from "@components/common/TuiEditor";
import { Link, VideoPlayer } from "@components/common";
import { useRouter } from "next/router";
import { Spinner } from "@components/ui";
import { TestContent } from "./TestContent";
import { useEffect, useState } from "react";
import { NoticeContent } from "./NoticeContent";
import { Box, LinearProgress, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

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
  const [progressValue, setProgressValue] = useState(50);

  // const period = new Date(course.createdDtime).setDate(course.lessonTerm);
  // const Days = Math.floor((period - new Date(course.createdDtime).getTime()) / (1000 * 60 * 60 * 24));

  useEffect(() => {
    setProgressValue(Math.floor((2 / course.lessons.length) * 100));
  }, []);

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
      
    </VideoPlayerContainer> : router.query.content === "test" ?<TestContent noticeConfig={noticeConfig} /> : <NoticeContent course={course} />} */}

      <VideoPlayerContainer>
        <VideoPlayer
          config={{
            playlist: course.lessons.filter((lesson) => lesson.seq === Number(lessonId))[0].s3Files[0].path,
            autostart: false,
          }}
        />
      </VideoPlayerContainer>

      <Box>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "0.25rem" }}>
          {course.lessons.filter((lesson) => lesson.seq === Number(lessonId))[0].lessonNm}
        </Typography>
        <Box>
          <Box sx={{ minWidth: 35 }} display="flex" justifyContent={"space-between"}>
            <Typography variant="h6" fontWeight={"bold"} color="#ff5600">{`${Math.round(progressValue)}% 수강완료`}</Typography>
            {/* <Typography variant="h6" color={grey[500]}>{`${Days}일 남음`}</Typography> */}
          </Box>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress variant="determinate" value={progressValue} />
          </Box>
        </Box>
      </Box>
    </MainSection>
  );
}

const MainSection = styled.div`
  flex: 1;
  padding-top: 32px;
`;

const VideoPlayerContainer = styled.div`
  /* height: calc(100vh - 160px); */
`;
// const VideoPlayerContainer = styled.div`
//   height: calc(100vh - 160px);
// `;
