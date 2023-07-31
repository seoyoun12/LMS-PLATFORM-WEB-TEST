import { LearningStatusRes,ProgressStatus,useLearningStatus } from '@common/api/user';
import { Spinner } from '@components/ui';
import { ContentCardV2 } from '@components/ui/ContentCard';
import styled from '@emotion/styled';
import { Box, Grid } from '@mui/material';
import { NotFound } from '@components/ui/NotFound';
import { useSnackbar } from '@hooks/useSnackbar';

export function LearningCourse() {
  const snackbar = useSnackbar();
  const { data } = useLearningStatus();

  const onClickEnterCourseLesson = (res: LearningStatusRes) => {
    const isStartStudy =
      new Date(res.studyStartDate.replaceAll('-', '/')).getTime() < new Date().getTime(); //현재시간이 크면 true 아니면 false
    const isEndedStudy =
      new Date(res.studyEndDate.replaceAll('-', '/')).getTime() < new Date().getTime(); //현재시간이 크면 true 아니면 false
    if (res.progressStatus === ProgressStatus.TYPE_BEFORE || !isStartStudy)
      return snackbar({ variant: 'error', message: '아직 학습이 시작되지 않았습니다!' });
    if (res.progressStatus === ProgressStatus.TYPE_ENDED || isEndedStudy)
      return snackbar({ variant: 'error', message: '종료된 학습입니다!' });
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
          .map(res => {
            const startDate = res.studyStartDate.slice(0, 10);
            const endDate = res.studyEndDate.slice(0, 10);

            return (
              <Grid item xs={1} sm={1} md={1} lg={1} key={res.courseClassSeq}>
                {/* <Link target="_blank"> */}
                <Box
                  // href={`/course/${res.seq}/lesson/${res.lessons[0].seq}`}
                  onClick={() => onClickEnterCourseLesson(res)}
                >
                  <ContentCardV2
                    image={res.thumbnailImage}
                    title={res.courseTitle}
                    // content1={`${item.leftDays === 0 ? '오늘마감 입니다!' : item.leftDays}`} 토나온다 진짜
                    // content1={
                    //   item.progress > 0
                    //     ? `현재 진도율 ${item.progress}% / 교육종료일까지 ${item.leftDays}일 남았습니다.(${startDate}~${endDate})`
                    //     : item.startLeftDays < 0
                    //     ? `지금바로 학습하기!(${startDate}~${endDate})`
                    //     : `${item.startLeftDays}일 남음(${startDate}~${endDate})`
                    // }

                    // content1={
                    //   res.progress > 0
                    //     ? `현재 진도율 ${res.progress}%`
                    //     : res.startLeftDays < 0
                    //     ? `지금바로 학습하기!(${startDate} ~ ${endDate})`
                    //     : `${res.startLeftDays}일 남음(${startDate} ~ ${endDate})`
                    // }
                    content1={
                      res.progress > 0
                        ? `지금 바로 학습하기!`
                        : res.startLeftDays <= 0
                        ? `지금 바로 학습하기!`
                        : `교육시작까지 ${res.startLeftDays}일 남음`
                    }
                    content2={
                      // res.startLeftDays <= 0
                      //   ? `현재 진도율${res.progress}% / 교육종료일까지 ${res.leftDays}일 남았습니다.`
                      //   : res.startLeftDays <= 0
                      //   ? `${startDate} ~ ${endDate}`
                      //   : `${startDate} ~ ${endDate}`

                      res.startLeftDays <= 0
                        ? `현재 진도율${res.progress}% / 교육종료일까지 ${res.leftDays}일 남았습니다.`
                        : `${startDate} ~ ${endDate}`
                    }
                  />
                </Box>
                {/* </Link> */}
              </Grid>
            );
          })}
      </Grid>
    </LearningCourseWrap>
  );
}

const LearningCourseWrap = styled(Box)`
  margin-top: 1rem;
`;
