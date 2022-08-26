import styles from '@styles/common.module.scss';
import styled from '@emotion/styled';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { Link } from '@components/common';
import CalendarIcon from '/public/assets/svgs/calendarIcon.svg';
import PromiseIcon from '/public/assets/svgs/promiseIcon.svg';
import StudyIcon from '/public/assets/svgs/studyIcon.svg';
import CertificateIcon from '/public/assets/svgs/certificateIcon.svg';
import { courseType } from '@common/api/courseClass';
import Image from 'next/image';

const categoryData = [
  {
    id: 1,
    title: '운수종사자',
    href: 'stebMove/steb1',
    icon: 'assets/images/calendarTransIcon.png',
        // icon: <CalendarIcon />,
    color: '#F4DB83',
    btnText: '교육일정',
  },
  {
    id: 2,
    title: '운수종사자',
    href: 'stebMove/steb1',
    icon: 'assets/images/promiseTransIcon.png',
        // icon: <PromiseIcon />,
    color: '#84B9EE',
    btnText: '예약하기',
  },
  {
    id: 3,
    title: '운수종사자',
    href: '/me/my-course',
    icon: 'assets/images/studyTransIcon.png',
        // icon: <StudyIcon />,
    color: '#F1C3C1',
    btnText: '학습하기',
  },
  {
    id: 4,
    title: '운수종사자',
    href: '/me/certificate',
    icon: 'assets/images/certificateTransIcon.png',
        // icon: <CertificateIcon />,
    color: '#BDB8F3',
    btnText: '수료확인',
  },
];

export function CategoryCard() {
  return (
    // <ContentContainer className={styles.globalContainer}>
    <Box sx={{background:'#fafafa'}} >
      <Container>

      <GridWrap
        container={true}
        spacing={0}
        columns={{ xs: 1, sm: 2, md: 2, lg: 4, xl: 4 }}
        rowSpacing={6}
        columnSpacing={-20}
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
            <GridLink href={categoryData.href} underline="none" >
              <Box sx={{border:`5px solid ${categoryData.color}` , width:'fit-content' , margin:'auto' , padding:'32px 58px' , borderRadius:'12px' , background:'white'}}>
                
              <Box display="flex" alignItems="center" justifyContent="center">
                {/* {categoryData.icon} */}
                <Image src={'/' + categoryData.icon} width={100} height={100} />
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
              </Box>
            </GridLink>
          </GridItem>
        ))}
      </GridWrap>
        </Container>
    </Box>
  );
}

const GridWrap = styled(Grid)`
margin:auto;
padding-top:24px;
padding-bottom:40px;
`;

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
  // background-color: ${({ cardcolor }) => cardcolor};
  // border: 5px solid ${({ cardcolor }) => cardcolor};
  
`;
const GridLink = styled(Link)`
  text-align: center;
  color: black;
`;
