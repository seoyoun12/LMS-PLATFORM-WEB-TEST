import { RegisterType } from '@common/api/courseClass';
import { useCourseUser } from '@common/api/courseUser';
import { EduTargetMainType, EduTargetSubType } from '@common/api/learningMaterial';
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
    await enrollMutate(); // provincialEnroll.ts에 enrolllMutate로 되어있다. 20221227 변경
  };

  const imageRenderer = (eduTargetMain: EduTargetMainType) => {
    if (eduTargetMain === "TYPE_CHILDREN")return `/assets/images/domin.jpg`
    if (eduTargetMain === "TYPE_TEENAGER") return `/assets/images/teen.jpg`
    if (eduTargetMain === "TYPE_SELF_DRIVING") return `/assets/images/self.jpg`
    if (eduTargetMain === "TYPE_ELDERLY") return `/assets/images/old.png`
  }

  const titleRenderer = (eduTargetMain: EduTargetMainType, eduTargetSub: EduTargetSubType) => {
    if (eduTargetMain === "TYPE_CHILDREN"){
      if(eduTargetSub === 'TYPE_KINDERGARTEN') return '어린이 - 유치원'
      if(eduTargetSub === 'TYPE_ELEMENTARY') return '어린이 - 초등학교'
    }
    if (eduTargetMain === "TYPE_TEENAGER") {
      if(eduTargetSub === 'TYPE_MIDDLE') return '청소년 - 중학교'
      if(eduTargetSub === 'TYPE_HIGH') return '청소년 - 고등학교'
    }
    if (eduTargetMain === "TYPE_SELF_DRIVING") {
      if(eduTargetSub === 'TYPE_SELF_DRIVER') return '자가운전자'
    }
    if (eduTargetMain === "TYPE_ELDERLY") {
      if(eduTargetSub === 'TYPE_ELDERLY') return '어르신'
    }
  }
  // const eduTargetList: {
  //   title: string;
  //   borderBottomColor: string;
  //   target: EduTargetMainType;
  //   imgPath: string;
  // }[] = [
  //   {
  //     title: '어린이',
  //     borderBottomColor: '#f1c40f',
  //     target: 'TYPE_CHILDREN',
  //     imgPath: '/assets/images/domin.jpg',
  //   },
  //   {
  //     title: '청소년',
  //     borderBottomColor: '#2980b9',
  //     target: 'TYPE_TEENAGER',
  //     imgPath: '/assets/images/teen.jpg',
  //   },
  //   {
  //     title: '자가운전자',
  //     borderBottomColor: '#27ae60',
  //     target: 'TYPE_SELF_DRIVING',
  //     imgPath: '/assets/images/self.jpg',
  //   },
  //   {
  //     title: '어르신',
  //     borderBottomColor: '#c0392b',
  //     target: 'TYPE_ELDERLY',
  //     imgPath: '/assets/images/old.png',
  //   },
  // ];

  if (!data) return <Spinner />;
  if (!enrollData) return <Spinner />;

  return (
    <Box>
      <MyCourseContainer>
        <MyCourseTitle>온라인 교육 신청내역</MyCourseTitle>
        <MyCourseSubTitle>
          온라인 교육 신청내역을 확인하실 수 있습니다.
        </MyCourseSubTitle>
      </MyCourseContainer>
      <EnrollHistoryWrap>
        {data.length <= 0 && enrollData.length <= 0 && (
          <NotFound content='신청한 과정이 존재하지 않습니다!' />
        )}
        <Grid
          container
          rowSpacing={4}
          columnSpacing={4}
          columns={{ xs: 1, sm: 2, md: 4, lg: 4 }}
          mt={1}
        >
          {data.length > 0 &&
            data.map((item) => (
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
          {enrollData.map((r) => (
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
                  title={titleRenderer(r.eduTargetMain , r.eduTargetSub)}
                  image={imageRenderer(r.eduTargetMain)}
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
