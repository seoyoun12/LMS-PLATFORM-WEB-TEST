import { LearningStatusRes, ProgressStatus, useLearningStatus } from '@common/api/user';
import { Spinner } from '@components/ui';
import { ContentCardV2 } from '@components/ui/ContentCard';
import { NotFound } from '@components/ui/NotFound';
import styled from '@emotion/styled';
import { Box, Grid } from '@mui/material';
import { useRouter } from 'next/router';

export function EndCourse() {
  const router = useRouter();
  const { data, error, mutate } = useLearningStatus();

  const onClickEnterCourseLesson = (res: LearningStatusRes) => {
    // console.log(res);
    const isStartStudy =
      new Date(res.studyStartDate.replaceAll('-', '/').split(' ')[0]).getTime() <
      new Date().getTime(); //현재시간이 크면 true 아니면 false
    const isEndedStudy =
      new Date(res.studyEndDate.replaceAll('-', '/').split(' ')[0]).getTime() <
      new Date().getTime(); //현재시간이 크면 true 아니면 false
    // console.log('isStart', isStartStudy);
    if (res.progressStatus === ProgressStatus.TYPE_BEFORE || !isStartStudy)
      return window.alert('아직 학습이 시작되지 않았습니다!');
    // if (res.progressStatus === ProgressStatus.TYPE_ENDED || isEndedStudy)
    //   return window.alert('종료된 학습입니다!');

    // if (res.progressStatus === ProgressStatus.TYPE_PROGRESSING) {
    // router.push(
    //   `/course/${res.courseUserSeq}/lesson/${
    //     !res.recentLessonSeq ? 1 : res.recentLessonSeq
    //   }`
    // );
    window.open(
      `/course/${res.courseUserSeq}/lesson/${
        !res.recentLessonSeq ? 1 : res.recentLessonSeq
      }`,
      // '',
      '_blank'
    );
    // }
  };

  if (!data) return <Spinner />;

  return (
    <EndCourseWrap>
      {data.length <= 0 ? (
        <NotFound content="신청한 과정이 존재하지 않습니다!" />
      ) : (
        data.filter(
          item =>
            new Date(item.studyEndDate.replaceAll('-', '/')).getTime() <
            new Date().getTime()
        ).length <= 0 && <NotFound content="종료된 과정이 존재하지 않습니다!" />
      )}
      <Grid
        container
        rowSpacing={4}
        columnSpacing={4}
        columns={{ xs: 1, sm: 2, md: 4, lg: 4 }}
      >
        {data
          .filter(fil => fil.progressStatus === ProgressStatus.TYPE_ENDED)
          .map(item => (
            <Grid item xs={1} sm={1} md={1} lg={1} key={item.courseClassSeq}>
              <Box
                // href={`/course/${res.seq}/lesson/${res.lessons[0].seq}`}
                onClick={() => onClickEnterCourseLesson(item)}
              >
                <ContentCardV2
                  image={item.thumbnailImage}
                  title={item.courseTitle}
                  content1={`학습 종료된 강의입니다.`}
                  content2={`진도율 ${item.progress}%`}
                />
              </Box>
            </Grid>
          ))}
      </Grid>
    </EndCourseWrap>
  );
}

const EndCourseWrap = styled(Box)`
  margin-top: 1rem;
`;
