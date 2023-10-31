import ApiClient from '@common/api/ApiClient';
import { learningStatus } from '@common/recoil';
import styled from '@emotion/styled';
import { useDialog } from '@hooks/useDialog';
import { Box, Button } from '@mui/material';
import Image from 'next/image';
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
    <Wrapper>
      <Container maxWidth="xl">
        <Box className="lesson-header-img">
          <Image
            src="/assets/images/cttsLogo.png"
            layout="fill"
            alt="충청남도교통연수원 로고"
            priority
          />
        </Box>
        <Button variant="contained" onClick={onCloseWindow}>
          학습종료
        </Button>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled(Box)`
  border-bottom: 1px solid #3498db;
`;
const Container = styled(Box)`
  display: flex;
  width: 100%;
  margin: 0 auto; 
  justify-content: space-between;
  align-items: center;
  padding: 12px 1rem;
  .lesson-header-img {
    position: relative;
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
