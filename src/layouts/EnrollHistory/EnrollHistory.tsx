import { useMyUser } from '@common/api/user';
import { ContentCard, Spinner } from '@components/ui';
import styled from '@emotion/styled';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

export function EnrollHistory() {
  const router = useRouter();
  const { user, error } = useMyUser();
  console.log(user);
  if (!user) return <Spinner />;
  return (
    <Container>
      <EnrollHistoryWrap>
        <Typography variant="h5" fontWeight="bold">
          온라인 교육 신청내역
        </Typography>
        <Typography>온라인 교육 신청내역을 확인하실 수 있습니다.</Typography>
        <Grid container rowSpacing={4} columnSpacing={4} columns={{ xs: 1, sm: 2, md: 4, lg: 4 }}>
          {user.learningCourses.map(item => (
            <Grid item xs={1} sm={1} md={1} lg={1} key={item.seq}>
              <Box
                // href={`/course/${res.seq}/lesson/${res.lessons[0].seq}`}
                onClick={() => {
                  if (!item.lessons[0]?.seq) {
                    return window.alert('수업이 존재하지 않습니다. 관리자에게 문의해주세요.');
                  }
                  // router.push(`/course/${res.seq}/lesson/${res.lessons[0].seq}`);
                }}
              >
                <ContentCard title={item.courseName} content1={item.content.contentName} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </EnrollHistoryWrap>
    </Container>
  );
}

const EnrollHistoryWrap = styled(Box)`
  margin-top: 4rem;
`;
