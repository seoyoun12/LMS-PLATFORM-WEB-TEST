import { useRouter } from 'next/router';
import {
  LearningStatusRes,
  ProgressStatus,
  useLearningStatus,
  useMyUser,
} from '@common/api/user';
import { Spinner } from '@components/ui';
import { ContentCardV2 } from '@components/ui/ContentCard';
import styled from '@emotion/styled';
import { Box, Grid } from '@mui/material';
import { NotFound } from '@components/ui/NotFound';

export function LearningCourse() {
  const router = useRouter();
  const { data, error, mutate } = useLearningStatus();

  const onClickEnterCourseLesson = (res: LearningStatusRes) => {
    const isStartStudy =
      new Date(res.studyStartDate.replaceAll('-', '/').split(' ')[0]).getTime() <
      new Date().getTime(); //현재시간이 크면 true 아니면 false
    const isEndedStudy =
      new Date(res.studyEndDate.replaceAll('-', '/').split(' ')[0]).getTime() <
      new Date().getTime(); //현재시간이 크면 true 아니면 false
    if (res.progressStatus === ProgressStatus.TYPE_BEFORE || !isStartStudy)
      return window.alert('아직 학습이 시작되지 않았습니다!');
    // if (res.progressStatus === ProgressStatus.TYPE_ENDED || isEndedStudy)
    //   return window.alert('종료된 학습입니다!');

    if (res.progressStatus === ProgressStatus.TYPE_PROGRESSING) {
      router.push(
        `/course/${res.courseUserSeq}/lesson/${
          !res.recentLessonSeq ? 1 : res.recentLessonSeq
        }`
      );
    }
  };

  if (!data) return <Spinner />;
  return (
    <LearningCourseWrap>
      {data.length <= 0 ? (
        <NotFound content="신청한 과정이 존재하지 않습니다!" />
      ) : (
        data.filter(
          item =>
            new Date(item.studyEndDate.replaceAll('-', '/')).getTime() >
            new Date().getTime()
        ).length <= 0 && <NotFound content="학습중인 과정이 존재하지 않습니다!" />
      )}
      <Grid
        container
        rowSpacing={4}
        columnSpacing={4}
        columns={{ xs: 1, sm: 2, md: 4, lg: 4 }}
      >
        {data
          .filter(
            fil =>
              fil.progressStatus === ProgressStatus.TYPE_PROGRESSING ||
              fil.progressStatus === ProgressStatus.TYPE_BEFORE
          )
          .map(item => (
            <Grid item xs={1} sm={1} md={1} lg={1} key={item.courseClassSeq}>
              <Box
                // href={`/course/${res.seq}/lesson/${res.lessons[0].seq}`}
                onClick={() => onClickEnterCourseLesson(item)}
              >
                <ContentCardV2
                  image={item.thumbnailImage}
                  title={item.courseTitle}
                  // content1={`${item.leftDays === 0 ? '오늘마감 입니다!' : item.leftDays}`}
                  content2={`현재 진도율 ${item.progress}%`}
                />
              </Box>
            </Grid>
          ))}
      </Grid>
    </LearningCourseWrap>
  );
}

const LearningCourseWrap = styled(Box)`
  margin-top: 1rem;
`;
