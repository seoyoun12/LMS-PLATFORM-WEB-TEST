import { RegisterType } from '@common/api/courseClass';
import { useCourseUser } from '@common/api/courseUser';
import { Modal, Spinner } from '@components/ui';
import { NotFound } from '@components/ui/NotFound';
import styled from '@emotion/styled';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { EnrollHistoryCard } from './EnrollHistoryCard/EnrollHistoryCard';
import { EnrollHistoryModal } from './EnrollHistoryModal/EnrollHistoryModal';

export function EnrollHistory() {
  const router = useRouter();
  const { data, error, mutate } = useCourseUser();
  console.log(data);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    title: string;
    courseUserSeq: number;
    regType: RegisterType;
  }>();

  const handleClose = () => {
    setOpen(false);
    mutate();
  };
  if (!data) return <Spinner />;
  return (
    <Container>
      <EnrollHistoryWrap>
        <Typography variant="h5" fontWeight="bold">
          온라인 교육 신청내역
        </Typography>
        <Typography>온라인 교육 신청내역을 확인하실 수 있습니다.</Typography>
        {data.length <= 0 && <NotFound content="신청한 과정이 존재하지 않습니다!" />}
        <Grid
          container
          rowSpacing={4}
          columnSpacing={4}
          columns={{ xs: 1, sm: 2, md: 4, lg: 4 }}
          mt={1}
        >
          {data.length > 0 &&
            data.map(item => (
              <Grid item xs={1} sm={1} md={1} lg={1} key={item.seq}>
                <Box
                  onClick={() => {
                    setOpen(true);
                    setModalData({
                      title: item.courseTitle,
                      courseUserSeq: item.seq,
                      regType:
                        item.regType === RegisterType.TYPE_INDIVIDUAL
                          ? RegisterType.TYPE_INDIVIDUAL
                          : RegisterType.TYPE_ORGANIZATION,
                    });
                  }}
                >
                  <EnrollHistoryCard
                    title={item.courseTitle}
                    content1={
                      item.regType === RegisterType.TYPE_INDIVIDUAL ? '개인' : '단체'
                    }
                    seq={item.seq}
                    item={item}
                  />
                </Box>
              </Grid>
            ))}
        </Grid>
      </EnrollHistoryWrap>
      {open && (
        <EnrollHistoryModal
          open={open}
          handleClose={handleClose}
          courseTitle={modalData.title}
          courseUserSeq={modalData.courseUserSeq}
          regType={
            modalData.regType === RegisterType.TYPE_INDIVIDUAL
              ? RegisterType.TYPE_INDIVIDUAL
              : RegisterType.TYPE_ORGANIZATION
          }
        />
      )}
    </Container>
  );
}

const EnrollHistoryWrap = styled(Box)`
  margin-top: 4rem;
`;
