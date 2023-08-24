import styled from '@emotion/styled';
import Image from 'next/image';
import useResponsive from '@hooks/useResponsive';
import { Box,Container,Grid,Typography } from '@mui/material';
import { Link } from '@components/common';
import { courseType } from '@common/api/courseClass';


const categoryData = [
  {
    id: 1,
    title: '운수종사자',
    href: 'stebMove/steb1',
    icon: 'assets/images/calendarTransIcon.png',
    // icon: <CalendarIcon />,
    color: '#F4DB83',
    btnText: '예약하기',
  },
  {
    id: 2,
    title: '운수종사자',
    href: 'me/enroll-history',
    icon: 'assets/images/promiseTransIcon.png',
    // icon: <PromiseIcon />,
    color: '#84B9EE',
    btnText: '예약내역확인',
  },
  {
    id: 3,
    title: '운수종사자',
    href: '/me/my-course?tab=ing',
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
  // const isDesktop = useResponsive(1440);
  const isTablet = useResponsive(1028);
  // const isMobile = useResponsive(450);

  return (
    // <ContentContainer className={styles.globalContainer}>
    <CardWrap>
      <Container>
        <GridWrap
          className="GridWraps"
          container={true}
          spacing={0}
          columns={{ xs: 2, sm: 2, md: 2, lg: 4, xl: 4 }}
          columnSpacing={2}
          rowSpacing={2}
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
              <GridLink href={categoryData.href} width="100px  " underline="none">
                <Box
                  sx={{
                    // border: '1px solid red',
                    border: `5px solid ${categoryData.color}`,
                    // width: 'fit-content',
                    margin: 'auto',
                    padding: '8px 32px',
                    borderRadius: '12px',
                    background: 'white',
                  }}
                >
                  <Box display="flex" alignItems="center" justifyContent="center">
                    {/* {categoryData.icon} */}
                    <Image src={'/' + categoryData.icon} width={100} height={100} alt=''/>
                  </Box>
                  <Box mt={2}>
                    {/* <div className='categoryIcon'/> */}
                    <GridTitleTypography fontWeight={500} fontSize="18px">
                      {/* {categoryData.title} */}
                      {typeof window !== 'undefined' &&
                      localStorage.getItem('site_course_type') === courseType.TYPE_TRANS_WORKER
                        ? '운수종사자'
                        : '저상버스'
                        }
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
    </CardWrap>
  );
}
const CardWrap = styled(Box)`
  background: #fafafa;
  padding: 0 8px;
  padding-top: 48px;
  @media (max-width: 1024px) {
    padding-top: 0px;
  }
`;

const GridWrap = styled(Grid)`
  /* margin: auto; */
  /* box-sizing: border-box; */
  /* width: 100%; */
  padding-top: 24px;
  padding-bottom: 40px;
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

  @media screen and (max-width: 500px) {
    
    font-size: 1rem;
  }
  @media screen and (max-width: 360px) {
    font-size: .8rem;
  }
`;

const GridItem = styled(Grid)<{ cardcolor: string }>`
  
  border-radius: 20px;

  @media screen and (max-width: 500px) {
    font-size: 1rem;
    
  }
  
`;
const GridLink = styled(Link)`
  text-align: center;
  color: black;
`;