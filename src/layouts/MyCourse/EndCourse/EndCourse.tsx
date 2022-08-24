import { progressStatus, useMyUser } from '@common/api/user';
import { ContentCard, Spinner } from '@components/ui';
import { ContentCardV2 } from '@components/ui/ContentCard';
import { NotFound } from '@components/ui/NotFound';
import styled from '@emotion/styled';
import { Box, Grid } from '@mui/material';

export function EndCourse() {
  const { user, error } = useMyUser();
  console.log(user);
  if (!user) return <Spinner />;
  return (
    <EndCourseWrap>
    {user.learningCourses.length  <= 0 ? <NotFound content='신청한 과정이 존재하지 않습니다!' /> : user.learningCourses.filter((item)=>new Date(item.studyEndDate.replace('-','.')).getTime() < new Date().getTime()).length <= 0 && <NotFound content='종료된 과정이 존재하지 않습니다!' />}
      <Grid container rowSpacing={4} columnSpacing={4} columns={{ xs: 1, sm: 2, md: 4, lg: 4 }}>
        {user.learningCourses
          .filter(fil => fil.progressStatus === progressStatus.TYPE_ENDED)
          .map(item => (
            <Grid item xs={1} sm={1} md={1} lg={1} key={item.courseClassSeq}>
              <Box
                // href={`/course/${res.seq}/lesson/${res.lessons[0].seq}`}
                onClick={() => {
                  return window.alert('학습이 종료되었습니다.');

                  // router.push(`/course/${res.seq}/lesson/${res.lessons[0].seq}`);
                }}
              >
                <ContentCardV2 image={item.thumbnailImage} title={item.courseTitle} content1={`학습 종료된 강의입니다.`} content2={`진도율 ${item.progress}%`} />
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
