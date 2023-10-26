import { RegisterType } from '@common/api/courseClass';
import { useCourseUser } from '@common/api/courseUser';
import { Spinner } from '@components/ui';
import { NotFound } from '@components/ui/NotFound';
import styled from '@emotion/styled';
import { Box, Container, Grid } from '@mui/material';
import { useState } from 'react';
import { EnrollHistoryCard } from './EnrollHistoryCard/EnrollHistoryCard';
import { EnrollHistoryModal } from './EnrollHistoryModal/EnrollHistoryModal';
import Image from 'next/image';

export function EnrollHistory() {
  
  const { data } = useCourseUser();
  const [open, setOpen] = useState(false);
  const [trafficOpen, setTrafficOpen] = useState(false);
  const [modalData, setModalData] = useState<{
    title: string;
    courseUserSeq: number;
    regType: RegisterType;
  }>();


  const handleClose = async () => {
    setOpen(false);
    setTrafficOpen(false);
  };

  if (!data) return <Spinner />;
  

  return (
    <Box>
      <Image src={'/assets/images/main_edu_application.png'} alt='신청내역' width={1920} height={282} layout='intrinsic'/>
      <EnrollHistoryWrap>
        {data.length <= 0 && <NotFound content='신청한 과정이 존재하지 않습니다!' />}
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
            {/* 도민데이터 */}
          
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
      
    </Box>
  );
}

const EnrollHistoryWrap = styled(Container)`
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 0 16px;
`;