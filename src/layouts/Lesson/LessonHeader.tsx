import ApiClient from '@common/api/ApiClient';
import { learningStatus } from '@common/recoil';
import styled from '@emotion/styled';
import { useDialog } from '@hooks/useDialog';
import { Box, Button, Container } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useRecoilState } from 'recoil';

export default function LessonHeader() {
  const dialog = useDialog();
  const [lessonVideoInfo, setLessonVideoInfo] = useRecoilState(learningStatus);
  const onCloseWindow = async () => {
    const isConfirm = await dialog({
      title: '학습종료하기',
      description: '정말로 학습을 종료하시겠습니까?',
      variant: 'confirm',
      confirmText: '확인',
      cancelText: '취소',
    });
    if (!isConfirm) return;
    // return;

    if (!lessonVideoInfo?.courseUserSeq) window.close();
    const { courseUserSeq, lessonSeq, studyTime, studyLastTime, courseProgressSeq } =
      lessonVideoInfo;

    await ApiClient.courseLog
      .createCourseModulesUsingPost1({
        courseUserSeq: courseUserSeq,
        lessonSeq: lessonSeq,
        studyTime: studyTime,
      })
      .then(() =>
        ApiClient.courseProgress.updateCourseProgressUsingPut({
          courseUserSeq: courseUserSeq,
          courseProgressSeq: courseProgressSeq,
          lessonSeq: lessonSeq,
          studyLastTime: studyLastTime,
        })
      );

    window.close();
  };

  return (
    <HeaderWrap>
      <HeaderContainer maxWidth="xl">
        <Box className="lesson-header-img">
          <Image
            src="/assets/images/cttsLogo.png"
            // width={224}
            // height={40}
            layout="fill"
            alt="Your Name"
          />
        </Box>
        <Button variant="contained" onClick={onCloseWindow}>
          학습종료
        </Button>
      </HeaderContainer>
    </HeaderWrap>
  );
}

const HeaderWrap = styled(Box)`
  border-bottom: 1px solid #3498db;
`;
const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 1rem;
  .lesson-header-img {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 224px;
    height: 40px;
  }
  @media (max-width: 450px) {
    .lesson-header-img {
      width: 180px;
      height: 32px;
    }
  }
`;
