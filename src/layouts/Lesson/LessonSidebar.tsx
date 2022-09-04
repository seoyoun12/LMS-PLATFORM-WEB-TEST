import React from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { headerHeight } from "@styles/variables";
import { LESSON_TABS, LessonTabs } from "./Lesson.types";
import { CourseModuleFindResponseDto, CourseProgressResponseDto, LessonDetailClientResponseDto } from "@common/api/Api";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Tab } from "@mui/material";
import { useRouter } from "next/router";
import LessonSidebarModule from "./LessonSidebarModule";
import LessonSidebarItem from "./LessonSidebarItem";

interface Props {
  courseUserSeq: number;
  courseProgresses: CourseProgressResponseDto[];
  courseModules: CourseModuleFindResponseDto[] | null;
  courseLessonsCompleted: boolean[];
  courseModulesCompleted: boolean[];
  lessonSeq: number | null;
  lessons: LessonDetailClientResponseDto[];
  onLessonSelect?: (lessonIndex: number) => void;
  onModuleSelect?: (moduleIndex: number) => void;
}

export default function LessonSidebar(props: Props) {

  const router = useRouter();

  // 스테이트.

  const [tabMenu, setTabMenu] = React.useState<LessonTabs["value"]>(LESSON_TABS[0].value);
  const [switchURL, setSwitchURL] = React.useState<string | null>(null);

  // 렌더링.

  return (
    <StickySideBar>
      <TabContext value={tabMenu}>
        <TabMenu onChange={(v: unknown) => setTabMenu(Array.isArray(v) ? v[0] : v)}>
          {LESSON_TABS.map((tab) => <Tab key={tab.value} label={tab.label} value={tab.value}/>)}
        </TabMenu>
        <TabItem value={LESSON_TABS[0].value}>
          <LessonItemContainer>
            {props.lessons.map((lesson, lessonIndex) => (
              <LessonSidebarItem
                active={lesson.seq === props.lessonSeq}
                completed={props.courseLessonsCompleted[lessonIndex]}
                lesson={lesson}
                key={lesson.seq}
                onClick={() => props.onLessonSelect(lessonIndex)}
              />
            ))}
            {props.courseModules !== null && props.courseModules.length > 0 && (
              <LessonModuleContainer>
                {props.courseModules.map((courseModule, moduleIndex) => (
                  <LessonSidebarModule
                    key={courseModule.courseModuleSeq}
                    courseUserSeq={props.courseUserSeq}
                    courseModule={courseModule}
                    completed={props.courseModulesCompleted[moduleIndex]}
                    onSelect={() => props.onModuleSelect(moduleIndex)}
                  />
                ))}
              </LessonModuleContainer>
            )}
          </LessonItemContainer>
        </TabItem>
        <Dialog
          open={switchURL !== null}
          onClose={() => setSwitchURL(null)}
        >
          <DialogContent>
            <DialogContentText>
              정말 페이지를 이동하시겠습니까?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSwitchURL(null)}>취소</Button>
            <Button
              onClick={() => {

                router.push(switchURL);
                setSwitchURL(null);

              }}
            >
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </TabContext>
    </StickySideBar>
  );

}

const StickySideBar = styled.aside`
  display: flex;
  position: sticky;
  top: ${headerHeight};
  flex-grow: 1;
  flex-direction: column;
  margin-left: 40px;
  min-width: 25rem;
  background-color: #fff;
  z-index: 1;
  overflow: hidden;

  @media (max-width: 1024px) {
    margin-left: unset;
    margin-top: 1rem;
    min-width: unset;
    font-size: 0.8rem;
  }
`;

const TabMenu = styled(TabList)`
  padding-bottom: 30px;
  font-weight: bold;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const TabItem = styled(TabPanel)`
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  padding: unset;
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

const LessonItemContainer = styled(Box)`
  flex-grow: 1;
`;

const LessonModuleContainer = styled(Box)`
  margin-top: 2rem;
  border-top: 1px solid #272727;
  background: #F7F7F7;
  padding: 1rem;
`;
