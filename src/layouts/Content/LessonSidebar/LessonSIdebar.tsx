import { Box, BoxProps, Container, Divider, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { headerHeight } from "@styles/variables";
import { Spinner, Tabs } from "@components/ui";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { useRouter } from "next/router";
import { Link, VideoPlayer } from "@components/common";
import { CourseRes, useCourse } from "@common/api/course";
import { grey } from "@mui/material/colors";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import { totalSecToMinSec } from "@utils/totalSecToMinSec";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import FeedIcon from "@mui/icons-material/Feed";
import dateFormat, { masks } from "dateformat";
import { TuiViewer } from "@components/common/TuiEditor";
import { LessonTabs } from "@components/ui/Tabs";
import DownloadIcon from "@mui/icons-material/Download";
import { useRecoilState } from "recoil";
import { contentSeqState, revealVideoState } from "@common/recoil";

interface Props {
  course: CourseRes;
  tabsConfig: {
    label: string;
    value: string;
  }[];
  testList: {
    title: string;
    score: number;
    description: string;
    isTest: boolean;
    type: string;
    complete: boolean;
  }[];
  noticeConfig: {
    title: string;
    content: string;
    date: string;
    type: string;
    seq: number;
    complete: boolean;
  }[];
  fileList: {
    title: string;
  }[];
}

export function LessonSidebar({ course, tabsConfig, testList, noticeConfig, fileList }: Props) {
  const router = useRouter();
  const { query, pathname } = router;
  const { courseSeq, lessonId } = query;

  const [changeMenu, setChangeMenu] = useState(tabsConfig[0].value);
  const [check, setCheck] = useState(false);
  const [revealVideo, setRevealVideo] = useRecoilState(revealVideoState);
  const [contentSeq, setContentSeq] = useRecoilState(contentSeqState);

  const onChangeMenu = (menu?: string | string[]) => {
    let menuString = String(menu);
    setChangeMenu(menuString);
  };

  useEffect(() => {
    //강의 차수표시를 위한 라우터푸쉬
    router.push({
      pathname,
      query: {
        courseName: course?.courseName,
        ...router.query,
      },
    });
  }, []);

  return (
    <StickySideBar>
      <TabMenu
        tabsConfig={tabsConfig}
        showBorderBottom={false}
        onChangeMenu={onChangeMenu}
        rerender={false}
        // variant={"fullWidth"}
        changeMenu={changeMenu}
      />{" "}
      {/*메뉴바 헤더 */}
      {/*첫 메뉴 리스트 */}
      <TabPanel value={changeMenu} index={tabsConfig[0].value}>
        <MenuList>
          {course.lessons.map((lesson) => {
            const { min, sec } = totalSecToMinSec(lesson.totalTime);

            return (
              <MenuCellLink
                className={Number(lessonId) === lesson.seq ? "active" : ""}
                key={lesson.seq}
                href={`/course/${course.seq}/lesson/${lesson.seq}`}
                onClick={() => {
                  setRevealVideo(true);
                }}
                color={grey[900]}
              >
                <Box>
                  <LessonTitle variant="body1">{lesson.lessonNm}</LessonTitle>
                  <LessonInfo>
                    <PlayCircleOutlinedIcon fontSize="small" htmlColor={grey[500]} />
                    <Typography className="typo" variant="body2" color={grey[500]}>
                      {min}:{sec}
                    </Typography>
                  </LessonInfo>
                </Box>
                <LessonCheck>
                  <CheckCircleIcon sx={{ color: lesson.seq == 27 ? "text.secondary" : "#ff5600" }} />
                  {lesson.seq == 27 ? <PlayCircleIcon /> : ""}
                </LessonCheck>
              </MenuCellLink>
            );
          })}
          {/* <Divider variant='middle' />
        
        {testList.map((test,index)=>{
          return <MenuCellItem key={index} onClick={
            ()=>{
                setRevealVideo(false);
                router.push({
                  pathname,
                  query:{
                    ...router.query,
                    content:test.type
                  }
                })
            }}  color={grey[900]}>
            <Box>
                <LessonTitle variant="body1">{test.title}</LessonTitle>
              <LessonInfo>
                {test.isTest ? <LibraryBooksIcon sx={{color:grey[500]}} /> : <FeedIcon sx={{color:grey[500]}} />}
                <Typography className="typo" variant="body2" color={grey[500]}>{test.description}</Typography>
              </LessonInfo>
            </Box>
            <LessonCheck >
              <Typography>{test.score}점</Typography>
              <Typography sx={{color:grey[500]}} >/100점</Typography>
              <CheckCircleIcon sx={{color:test.complete ? "#ff5600":"text.secondary"}} />
            </LessonCheck>
          </MenuCellItem>
        })}
         */}
        </MenuList>
      </TabPanel>
      {/*두번째 메뉴 리스트 */}
      {/* <TabPanel value={changeMenu} index={tabsConfig[1].value}>
        <MenuList>
          {noticeConfig.map((notice, index) => {
            return (
              <>
                <MenuCellItem
                  key={index}
                  onClick={() => {
                    setRevealVideo(false);
                    router.push({
                      pathname,
                      query: {
                        ...router.query,
                        content: notice.type,
                        seq: notice.seq,
                      },
                    });
                    setContentSeq(notice.seq);
                  }}
                  color={grey[900]}
                >
                  <Box>
                    <LessonTitle variant="body1">{notice.title}</LessonTitle>
                    <LessonInfo>
                      <Typography className="typo" variant="body2" color={grey[500]}>
                        {dateFormat(notice.date, "yyyy.mm.dd")}
                      </Typography>
                    </LessonInfo>
                  </Box>
                  <LessonCheck>
                    <CheckCircleIcon sx={{ color: notice.complete ? "#ff5600" : "text.secondary" }} />
                  </LessonCheck>
                </MenuCellItem>
                {index === noticeConfig.length - 1 ? "" : <Divider sx={{ borderBottom: `2px solid ${grey[500]} ` }} />}{" "}
                
              </>
            );
          })}
        </MenuList>
      </TabPanel> */}
      {/*세번째 메뉴 리스트 */}
      {/* <TabPanel value={changeMenu} index={tabsConfig[2].value}>
        <MenuList>
          <Typography className="file-list-title" variant="h6">
            수업자료
          </Typography>
          {fileList.map((file, index) => {
            return (
              <MenuCellItem className="file-list-item" key={index} color={grey[900]}>
                <Box>{file.title}</Box>
                <LessonCheck>
                  <DownloadIcon />
                </LessonCheck>
              </MenuCellItem>
            );
          })}
        </MenuList>
      </TabPanel> */}
    </StickySideBar>
  );
}

interface TabPanelProps extends BoxProps {
  children: React.ReactNode;
  value: string;
  index: string;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...rest } = props;
  return (
    <Box hidden={value !== index} {...rest}>
      {children}
    </Box>
  );
};

const StickySideBar = styled.aside`
  position: sticky;
  top: ${headerHeight};
  margin-left: 40px;
  padding-top: 32px;
  width: 480px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  z-index: 1;
  flex-shrink: 0;
  overflow: hidden;
`;

const TabMenu = styled(LessonTabs)`
  padding-bottom: 30px;
`;

const LessonTitle = styled(Typography)`
  &.active {
    font-weight: 500;
  }
`;

const MenuList = styled(Box)`
  height: calc(100vh - 160px);
  .file-list-item {
    background: #efefef;
    margin: 0 1rem;
    margin-bottom: 1rem;
  }
  .file-list-title {
    font-weight: bold;
    margin-bottom: 1rem;
  }
`;

const MenuCellLink = styled(Link)`
  display: block;
  padding: 12px;
  min-height: 36px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;
const MenuCellItem = styled(Box)`
  display: block;
  padding: 12px;
  min-height: 36px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const LessonInfo = styled.div`
  display: flex;
  align-items: center;
  padding-top: 4px;

  .typo {
    margin-left: 4px;
  }
`;

const LessonCheck = styled(Box)`
  display: flex;
  align-items: center;
`;
