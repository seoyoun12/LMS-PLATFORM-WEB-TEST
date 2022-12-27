import { RegisterType } from '@common/api/courseClass';
import { useCourseUser } from '@common/api/courseUser';
import { useEnrollProvincialList } from '@common/api/provincialEnroll';
import { Modal, Spinner } from '@components/ui';
import { NotFound } from '@components/ui/NotFound';
import styled from '@emotion/styled';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { EnrollHistoryCard } from './EnrollHistoryCard/EnrollHistoryCard';
import { EnrollHistoryModal } from './EnrollHistoryModal/EnrollHistoryModal';
import { EnrollHistoryTrafficModal } from './EnrollHistoryTrafficModal/EnrollHistoryTrafficModal';

export function EnrollHistory() {
  const router = useRouter();
  const { data, error, mutate } = useCourseUser();
  // 리스트
  const { enrollData, enrollError, enrollMutate } = useEnrollProvincialList();

  const [open, setOpen] = useState(false);
  const [trafficOpen, setTrafficOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    title: string;
    courseUserSeq: number;
    regType: RegisterType;
  }>();
  const [trafficModalData, setTrafficModalData] = useState<{
    enrollSeq: number;
    enrollOrganization: string;
  }>();

  const handleClose = async () => {
    setOpen(false);
    setTrafficOpen(false);
    await enrollMutate(); // provincialEnroll.ts에 enrullMutate로 되어있다. 20221227 변경
  };

  if (!data) return <Spinner />;
  if (!enrollData) return <Spinner />;

  return (
    <Box>
      <MyCourseContainer>
        <MyCourseTitle>온라인 교육 신청내역</MyCourseTitle>
        <MyCourseSubTitle>온라인 교육 신청내역을 확인하실 수 있습니다.</MyCourseSubTitle>
      </MyCourseContainer>
      <EnrollHistoryWrap>
        {data.length <= 0 && enrollData.length <= 0 && (
          <NotFound content="신청한 과정이 존재하지 않습니다!" />
        )}
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
                    image={item.thumbnailPath}
                    content1={'자세히보기'}
                    seq={item.seq}
                    item={item}
                  />
                </Box>
              </Grid>
            ))}
          {enrollData.map(r => (
            <Grid item xs={1} sm={1} md={1} lg={1} key={r.seq}>
              <Box
                onClick={() => {
                  setTrafficOpen(true);
                  setTrafficModalData({
                    enrollSeq: r.seq,
                    enrollOrganization: r.organization,
                  });
                  // setModalData({
                  //   title: r.organization,
                  //   courseUserSeq: r.seq,
                  //   regType:
                  //     r.regType === RegisterType.TYPE_INDIVIDUAL
                  //       ? RegisterType.TYPE_INDIVIDUAL
                  //       : RegisterType.TYPE_ORGANIZATION,
                  // });
                }}
              >
                <EnrollHistoryCard
                  title={r.organization}
                  image={''}
                  content1={'자세히보기'}
                  seq={r.seq}
                  item={{}}
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
      {trafficOpen && (
        <EnrollHistoryTrafficModal
          open={trafficOpen}
          handleClose={handleClose}
          enrollSeq={trafficModalData.enrollSeq}
          enrollOrganization={trafficModalData.enrollOrganization}
        />
      )}
    </Box>
  );
}

const EnrollHistoryWrap = styled(Container)`
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 0 16px;
`;

const MyCourseContainer = styled(Box)`
  width: 100%;
  height: 262px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 42px;
  color: white;
  background-image: url('/assets/images/currentStudy.png');
`;
const MyCourseTitle = styled(Box)`
  font-size: 48px;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 36px;
    font-weight: 500;
  }
`;
const MyCourseSubTitle = styled(Box)`
  font-size: 17px;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 14px;
    font-weight: 500;
  }
`;
const CourseContainer = styled(Box)`
  max-width: 1200px;
  padding-top: 2.5rem;
  padding-bottom: 3rem;
  margin: auto;
`;
