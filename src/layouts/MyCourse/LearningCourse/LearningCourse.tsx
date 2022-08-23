import { useRouter } from 'next/router';
import { progressStatus, useMyUser } from '@common/api/user';
import { Spinner } from '@components/ui';
import { ContentCardV2 } from '@components/ui/ContentCard';
import styled from '@emotion/styled';
import { Box, Grid } from '@mui/material';
import { NotFound } from '@components/ui/NotFound';

export function LearningCourse() {
  const router = useRouter();
  const { user, error } = useMyUser();
  console.log(user);
  if (!user) return <Spinner />;
  return (
    <LearningCourseWrap>
    {user.learningCourses.length  <= 0 && <NotFound content='신청한 과정이 존재하지 않습니다!' />}
      <Grid container rowSpacing={4} columnSpacing={4} columns={{ xs: 1, sm: 2, md: 4, lg: 4 }}>
        {user.learningCourses
          .filter(fil => fil.progressStatus === progressStatus.TYPE_PROGRESSING)
          .map(item => (
            <Grid item xs={1} sm={1} md={1} lg={1} key={item.courseClassSeq}>
              <Box
                // href={`/course/${res.seq}/lesson/${res.lessons[0].seq}`}
                onClick={() => router.push(`/course/${item.courseUserSeq}`)}
              >
                <ContentCardV2
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
