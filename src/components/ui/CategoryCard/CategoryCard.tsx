import styles from '@styles/common.module.scss';
import styled from '@emotion/styled';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { Link } from '@components/common';
import CalendarIcon from '/public/assets/svgs/calendarIcon.svg';
import PromiseIcon from '/public/assets/svgs/promiseIcon.svg';
import StudyIcon from '/public/assets/svgs/studyIcon.svg';
import CertificateIcon from '/public/assets/svgs/certificateIcon.svg';
import { courseType } from '@common/api/courseClass';

const categoryData = [
  {
    id: 1,
    title: '운수종사자',
    href: 'stebMove/steb1',
    icon: <CalendarIcon />,
    color: '#fff',
    btnText: '확인하기',
  },
  {
    id: 2,
    title: '운수종사자',
    href: 'stebMove/steb1',
    icon: <PromiseIcon />,
    color: '#fff',
    btnText: '예약하기',
  },
  {
    id: 3,
    title: '운수종사자',
    href: '/traffic/3',
    icon: <StudyIcon />,
    color: '#fff',
    btnText: '학습하기',
  },
  {
    id: 4,
    title: '운수종사자',
    href: '/traffic/4',
    icon: <CertificateIcon />,
    color: '#fff',
    btnText: '수료확인',
  },
];

export function CategoryCard() {
  // console.log("categoryData : ", categoryData);
  return (
    // <ContentContainer className={styles.globalContainer}>
    <Container>
      <GridWrap
        container={true}
        spacing={0}
        columns={{ xs: 1, sm: 2, md: 2, lg: 4, xl: 4 }}
        mt={6}
        mb={10}
        rowSpacing={6}
      >
        {categoryData.map(categoryData => (
          <GridItem
            item
            xs={1}
            sm={1}
            md={1}
            lg={1}
            key={categoryData.id}
            cardcolor={categoryData.color}
          >
            <GridLink href={categoryData.href} underline="none">
              <Box display="flex" alignItems="center" justifyContent="center">
                {categoryData.icon}
              </Box>
              <Box mt={2}>
                {/* <div className='categoryIcon'/> */}
                <GridTitleTypography fontWeight={500} fontSize="18px">
                  {/* {categoryData.title} */}
                  {typeof window !== 'undefined' &&
                  localStorage.getItem('site_course_type') ===
                    courseType.TYPE_TRANS_WORKER
                    ? '운수종사자'
                    : '저상버스'}
                </GridTitleTypography>
                <GridTitleTypography fontWeight={700} fontSize="24px">
                  {categoryData.btnText}
                </GridTitleTypography>
              </Box>
            </GridLink>
          </GridItem>
        ))}
      </GridWrap>
    </Container>
  );
}

const GridWrap = styled(Grid)``;

const GridContainer = styled(Container)<{ cardcolor: string }>`
  /* display: flex; */
  width: 200px;
  height: 200px;
  border-radius: 20px;
  /* background-color: rgb(255, 0, 0, 0.1); */
  background-color: ${({ cardcolor }) => cardcolor};

  .categoryIcon {
    width: 100px;
    height: 100px;
  }
`;

const ContentContainer = styled.div`
  padding: 35px 0px 0 20px !important;
`;

const GridTitleTypography = styled(Typography)`
  position: relative;
  top: 35%;
  text-align: center;
  /* border: 1px solid black; */

  .cardTitle1 {
    font-size: 3rem;
    color: red;
  }

  .cardTitle2 {
    font-size: 3rem;
    color: red;
  }
`;

const GridItem = styled(Grid)<{ cardcolor: string }>`
  /* display: flex; */
  border-radius: 20px;
  /* background-color: rgb(255, 0, 0, 0.1); */
  background-color: ${({ cardcolor }) => cardcolor};
`;
const GridLink = styled(Link)`
  text-align: center;
  color: black;
`;
