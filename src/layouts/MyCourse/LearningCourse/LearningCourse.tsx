import { progressStatus, useMyUser } from '@common/api/user';
import { ContentCard, Spinner } from '@components/ui';
import styled from '@emotion/styled';
import { Box, Grid } from '@mui/material';

export function LearningCourse() {
  const { user, error } = useMyUser();
  console.log(user);
  if (!user) return <Spinner />;
  return (
    <LearningCourseWrap>
      <Grid container rowSpacing={4} columnSpacing={4} columns={{ xs: 1, sm: 2, md: 4, lg: 4 }}>
        {user.learningCourses
          .filter(fil => fil.progressStatus === progressStatus.TYPE_PROGRESSING)
          .map(item => (
            <Grid item xs={1} sm={1} md={1} lg={1} key={item.courseClassSeq}>
              <Box
                // href={`/course/${res.seq}/lesson/${res.lessons[0].seq}`}
                onClick={() => {
                  return window.alert('수업이 존재하지 않습니다. 관리자에게 문의해주세요.');

                  // router.push(`/course/${res.seq}/lesson/${res.lessons[0].seq}`);
                }}
              >
                <ContentCard
                  title={item.courseTitle}
                  content1={`${item.leftDays === 0 ? '오늘마감 입니다!' : item.leftDays}`}
                  content2={`진도율 ${item.progress}%`}
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
