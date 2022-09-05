import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@mui/system';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { headerHeight } from '@styles/variables';
import { LESSON_TABS, LessonTabs, LESSON_CONTENT_TYPES } from './Lesson.types';
import {
  CourseModuleFindResponseDto,
  CourseProgressResponseDto,
  LessonDetailClientResponseDto,
} from '@common/api/Api';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Tab,
} from '@mui/material';
import { useRouter } from 'next/router';
import LessonSidebarModule from './LessonSidebarModule';
import LessonSidebarItem from './LessonSidebarItem';

interface Props {
  courseUserSeq: number;
  courseTotalProgress: number;
  courseProgresses: CourseProgressResponseDto[];
  courseModules: CourseModuleFindResponseDto[] | null;
  courseLessonsCompleted: boolean[];
  courseModulesCompleted: boolean[];
  courselessons: LessonDetailClientResponseDto[];
  courseLessonSeq: number | null;
}

export default function LessonSidebar(props: Props) {
  const router = useRouter();

  // 스테이트.

  const [tabMenu, setTabMenu] = React.useState<LessonTabs['value']>(LESSON_TABS[0].value);
  const [dialog, setDialog] = React.useState<'NEXT' | 'PROGRESS' | null>(null);

  // 컴포넌트.

  const DialogNext = (
    <Dialog open={dialog === 'NEXT'} onClose={() => setDialog(null)}>
      <DialogContent>
        <DialogContentText>
          현재 학습 완료 후 다음 학습으로 이동 가능합니다.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialog(null)}>확인</Button>
      </DialogActions>
    </Dialog>
  );

  const DialogProgress = (
    <Dialog open={dialog === 'PROGRESS'} onClose={() => setDialog(null)}>
      <DialogContent>
        <DialogContentText>
          모든 차시가 종료(학습완료)가 된 후 만족도 조사를 참여하실 수 있습니다.{' '}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialog(null)}>확인</Button>
      </DialogActions>
    </Dialog>
  );

  // 렌더링.

  return (
    <StickySideBar>
      <TabContext value={tabMenu}>
        <TabMenu onChange={(v: unknown) => setTabMenu(Array.isArray(v) ? v[0] : v)}>
          {LESSON_TABS.map(tab => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </TabMenu>
        <TabItem value={LESSON_TABS[0].value}>
          <LessonItemContainer>
            {props.courselessons.map((lesson, lessonIndex) => (
              <LessonSidebarItem
                active={lesson.seq === props.courseLessonSeq}
                completed={props.courseLessonsCompleted[lessonIndex]}
                lesson={lesson}
                key={lesson.seq}
                onClick={() => {
                  if (lesson.seq === props.courseLessonSeq) return;
                  if (lessonIndex !== 0 && !props.courseLessonsCompleted[lessonIndex - 1])
                    return setDialog('NEXT');
                  router.push(
                    `/course/${
                      props.courseUserSeq
                    }/${LESSON_CONTENT_TYPES[0].toLowerCase()}/${
                      props.courselessons[lessonIndex].seq
                    }`
                  );
                }}
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
                    onSelect={() => {
                      const module = props.courseModules[moduleIndex];

                      if (
                        module.limitProgress !== 0 &&
                        props.courseTotalProgress < module.limitProgress
                      )
                        return setDialog('PROGRESS');

                      switch (module.moduleType) {
                        case 'COURSE_MODULE_PROGRESS_RATE':
                          break;
                        case 'COURSE_MODULE_SURVEY':
                          router.push(
                            `/course/${
                              props.courseUserSeq
                            }/${LESSON_CONTENT_TYPES[1].toLowerCase()}/${
                              module.surveySeq
                            }`
                          );
                          break;
                        case 'COURSE_MODULE_TEST':
                          break;
                      }
                    }}
                  />
                ))}
              </LessonModuleContainer>
            )}
          </LessonItemContainer>
        </TabItem>
      </TabContext>
      {DialogNext}
      {DialogProgress}
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
  background: #f7f7f7;
  padding: 1rem;
`;
