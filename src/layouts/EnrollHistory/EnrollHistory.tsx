import { RegisterType } from '@common/api/courseClass';
import { useCourseUser } from '@common/api/courseUser';
import { Modal, Spinner } from '@components/ui';
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
    courseUserSeq: number;
    regType: RegisterType;
  }>();

  const handleClose = () => {
    setOpen(false);
  };
  if (!data) return <Spinner />;
  return (
    <Container>
      <EnrollHistoryWrap>
        <Typography variant="h5" fontWeight="bold">
          온라인 교육 신청내역
        </Typography>
        <Typography>온라인 교육 신청내역을 확인하실 수 있습니다.</Typography>
        <Grid
          container
          rowSpacing={4}
          columnSpacing={4}
          columns={{ xs: 1, sm: 2, md: 4, lg: 4 }}
          mt={1}
        >
          {data.map(item => (
            <Grid item xs={1} sm={1} md={1} lg={1} key={item.seq}>
              <Box
                onClick={() => {
                  setOpen(true);
                  setModalData({
                    courseUserSeq: item.seq,
                    regType:
                      item.regType === RegisterType.TYPE_INDIVIDUAL
                        ? RegisterType.TYPE_INDIVIDUAL
                        : RegisterType.TYPE_ORGANIZATION,
                  });
                }}
              >
                <EnrollHistoryCard title={'개발중'} seq={item.seq} item={item} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </EnrollHistoryWrap>
      {open && (
        <EnrollHistoryModal
          open={open}
          handleClose={handleClose}
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
