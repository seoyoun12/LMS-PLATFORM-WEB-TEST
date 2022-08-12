import { useCourseUser } from '@common/api/courseUser';
import { useMyUser } from '@common/api/user';
import { ContentCard, Spinner } from '@components/ui';
import styled from '@emotion/styled';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

export function EnrollHistory() {
  // const router = useRouter();
  // const { data, error, mutate } = useCourseUser();
  // console.log(data, data[0].seq);
  // if (!data) return <Spinner />;
  return (
    <Container>
      <EnrollHistoryWrap>
        폐강(빌드오류)
        {/* <Typography variant="h5" fontWeight="bold">
          온라인 교육 신청내역
        </Typography>
        <Typography>온라인 교육 신청내역을 확인하실 수 있습니다.</Typography>
        <Grid container rowSpacing={4} columnSpacing={4} columns={{ xs: 1, sm: 2, md: 4, lg: 4 }} mt={1}>
          {data.map(item => (
            <Grid item xs={1} sm={1} md={1} lg={1} key={item.seq}>
              <Box
                onClick={() => {
                  return window.alert('수업이 존재하지 않습니다. 관리자에게 문의해주세요.');
                }}
              >
                <ContentCard
                  title={'개발중'}
                />
              </Box>
            </Grid>
          ))}
        </Grid> */}
      </EnrollHistoryWrap>
    </Container>
  );
}

const EnrollHistoryWrap = styled(Box)`
  margin-top: 4rem;
`;
