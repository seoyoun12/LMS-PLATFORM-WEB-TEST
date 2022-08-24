import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import { headerHeight } from "@styles/variables";
import { LessonTabs } from "@components/ui/Tabs";
import { tabsConfig, TabsConfig } from "./Lesson.types";
import { CourseModuleFindResponseDto, CourseProgressResponseDto, LessonDetailClientResponseDto } from "@common/api/Api";
import { grey } from "@mui/material/colors";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Typography } from "@mui/material";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useRouter } from "next/router";

interface Props {
  courseUserSeq: number;
  courseProgresses: CourseProgressResponseDto[];
  lessonSeq: number;
  lessons: LessonDetailClientResponseDto[];
  modules: CourseModuleFindResponseDto[] | null;
}

export function LessonSidebar(props: Props) {

  const router = useRouter();

  // 스테이트.

  const [tabMenu, setTabMenu] = useState<TabsConfig["value"]>(tabsConfig[0].value);
  const [switchLessonSeq, setSwitchLessonSeq] = useState<number | null>(null);

  // 렌더링.

  return (
    <StickySideBar>
      <TabMenu
        tabsConfig={tabsConfig as unknown as Parameters<typeof TabMenu>[0]["tabsConfig"]}
        showBorderBottom={false}
        rerender={false}
        changeMenu={tabMenu}
        onChangeMenu={(v: unknown) => setTabMenu(Array.isArray(v) ? v[0] : v)}
      />
      <Tab hidden={tabMenu !== "curriculum"}>
        <LessonItemContainer>
          {props.lessons.map((lesson) => (
            <TabItem
              className={props.lessonSeq === lesson.seq ? "active" : ""}
              color={grey[900]}
              key={lesson.seq}
              onClick={() => setSwitchLessonSeq(lesson.seq)}
            >
              <Box>
                <LessonTitle variant="body1">{lesson.lessonNm}</LessonTitle>
                <LessonInfo>
                  <PlayCircleOutlinedIcon fontSize="small" htmlColor={grey[500]} />
                  <Typography className="typo" variant="body2" color={grey[500]}>
                    {Math.floor(lesson.totalTime / 60)}:{lesson.totalTime % 60}
                  </Typography>
                </LessonInfo>
              </Box>
              <LessonCheck>
                {props.lessonSeq === lesson.seq && <PlayCircleIcon sx={{ color: "text.secondary" }} style={{ marginRight: 8 }} />}
                <CheckCircleIcon sx={{ color: lesson.completedYn === "Y" ? "#256aef" : "text.secondary" }} />
              </LessonCheck>
            </TabItem>
          ))}
        </LessonItemContainer>
        {props.modules !== null && props.modules.length > 0 && (
          <LessonModuleContainer>
            {props.modules.map((module) => {

              switch (module.moduleType) {

                case "COURSE_MODULE_PROGRESS_RATE": return <div>{module.moduleType}</div>;
                case "COURSE_MODULE_SURVEY": return <div>{module.moduleType}</div>;
                case "COURSE_MODULE_TEST": return <div>{module.moduleType}</div>

              }

            })}
          </LessonModuleContainer>
        )}
      </Tab>
      <Dialog
        open={switchLessonSeq !== null}
        onClose={() => setSwitchLessonSeq(null)}
      >
        {/* <DialogTitle id="alert-dialog-title">정말 페이지를 이동하시겠습니까?</DialogTitle> */}
        <DialogContent>
          <DialogContentText>
            정말 페이지를 이동하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSwitchLessonSeq(null)} autoFocus>취소</Button>
          <Button
            onClick={() => {

              router.push(`/course/${props.courseUserSeq}/lesson/${switchLessonSeq}`);
              setSwitchLessonSeq(null);

            }}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </StickySideBar>
  );

}

const StickySideBar = styled.aside`
  position: sticky;
  top: ${headerHeight};
  margin-left: 40px;
  width: 520px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  z-index: 1;
  flex-shrink: 0;
  overflow: hidden;
`;

const TabMenu = styled(LessonTabs)`
  padding-bottom: 30px;
  font-weight: bold;
`;

const Tab = styled(Box)`
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

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

const TabItem = styled.div`
  padding: 12px;
  min-height: 36px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`

const LessonTitle = styled(Typography)`
  .active & {
    font-weight: 700;
  }
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

const LessonItemContainer = styled(Box)`
  flex-grow: 1;
`;

const LessonModuleContainer = styled(Box)`
  margin-top: 2rem;
  border-top: 1px solid #272727;
  background: #F7F7F7;
  padding: 10px;
`
