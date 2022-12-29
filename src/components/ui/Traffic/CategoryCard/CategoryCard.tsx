import styled from '@emotion/styled';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { Link } from '@components/common';
import CalendarIcon from '/public/assets/svgs/calendarIcon.svg';
import PromiseIcon from '/public/assets/svgs/promiseIcon.svg';
import StudyIcon from '/public/assets/svgs/studyIcon.svg';
import CertificateIcon from '/public/assets/svgs/certificateIcon.svg';
import Image from 'next/image';
import { courseType } from '@common/api/courseClass';
import useResponsive from '@hooks/useResponsive';

// 도민교육 3개의 카드

// const categoryData = [
//   {
//     id: 1,
//     title: '도민교통',
//     href: '/traffic/stebMove/steb2',
//     // icon: <CalendarIcon />,
//     icon: 'assets/images/calendarTransIcon.png',
//     // color: '#fff',
//     color: '#F4DB83',
//     // color: '#ffede9',
//     // btnText: '확인하기',
//     btnText: '예약하기',
//   },
//   {
//     id: 2,
//     title: '도민교통',
//     href: '/me/enroll-history',
//     // icon: <PromiseIcon />,
//     icon: 'assets/images/promiseTransIcon.png',
//     // color: '#fff',
//     color: '#84B9EE',
//     // color: '#fff6e7',
//     // btnText: '예약하기',
//     btnText: '내역확인',
//   },
//   {
//     id: 3,
//     title: '도민교통',
//     title2: '시청하기',
//     href: '/traffic/class-room',
//     // icon: <StudyIcon />,
//     icon: 'assets/images/studyTransIcon.png',
//     // color: '#fff',
//     color: '#F1C3C1',
//     // color: '#fffde2',
//     // btnText: '학습하기',
//     btnText: '시청하기',
//   },
//   {
//     id: 4,
//     title: '도민교통',
//     title2: '학습자료',
//     href: '/traffic/learning-material/learning-guide',
//     // icon: <CertificateIcon />,
//     icon: 'assets/images/certificateTransIcon.png',
//     // color: '#fff',
//     color: '#BDB8F3',
//     // color: '#f8ffe2',
//     // btnText: '수료확인',
//     btnText: '학습자료',
//   },
// ];

const categoryData = [
  {
    id: 1,
    title: '도민교통',
    title2: '학습자료',
    href: '/traffic/learning-material/learning-guide',
    // icon: <CertificateIcon />,
    icon: 'assets/images/certificateTransIcon.png',
    // color: '#fff',
    color: '#BDB8F3',
    // color: '#f8ffe2',
    // btnText: '수료확인',
    btnText: '학습자료',
  },
  {
    id: 2,
    title: '도민안전교육',
    href: '/traffic/stebMove/steb1',
    // icon: <CalendarIcon />,
    icon: 'assets/images/calendarTransIcon.png',
    // color: '#fff',
    color: '#F4DB83',
    // color: '#ffede9',
    // btnText: '확인하기',
    btnText: '교육신청하기',
  },
  {
    id: 3,
    title: '도민안전교육',
    title2: '학습하기',
    href: '/traffic/class-room',
    // icon: <StudyIcon />,
    icon: 'assets/images/studyTransIcon.png',
    // color: '#fff',
    color: '#F1C3C1',
    // color: '#fffde2',
    btnText: '학습하기',
  },
];

export function CategoryCard() {
  const isTablet = useResponsive(1028);
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
          justifyContent="center"
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
              // maxWidth="100%"
              // flexGrow={1}
              // style={{ maxWidth: '100%', flexGrow: 1 }}
              // isTablet이 적용안된다.
            >
              <GridLink href={categoryData.href} width="100px" underline="none">
                <Box
                  sx={{
                    border: `5px solid ${categoryData.color}`,
                    // width: 'fit-content',
                    margin: 'auto',
                    padding: `${!isTablet ? '8px  32px' : '32px 58px'}`,
                    // padding: '32px 58px',
                    borderRadius: '12px',
                    background: 'white',
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {/* {categoryData.icon} */}
                    <Image
                      src={'/' + categoryData.icon}
                      width={100}
                      height={100}
                    />
                  </Box>
                  <Box mt={2}>
                    {/* <div className='categoryIcon'/> */}
                    <GridTitleTypography fontWeight={500} fontSize="18px">
                      {categoryData.title}
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

// const GridWrap = styled(Grid)`
//   padding-top: 24px;
//   padding-bottom: 40px;
// `;

// const GridItem = styled(Grid)<{ cardcolor: string }>`
//   /* display: flex; */
//   border-radius: 20px;
//   /* background-color: rgb(255, 0, 0, 0.1); */
//   background-color: ${({ cardcolor }) => cardcolor};
// `;

// const ContentContainer = styled.div`
//   padding: 35px 0px 0 20px !important;
// `;

// const GridTitleTypography = styled(Typography)`
//   position: relative;
//   top: 35%;
//   text-align: center;
//   /* border: 1px solid black; */

//   .cardTitle1 {
//     font-size: 3rem;
//     color: red;
//   }

//   .cardTitle2 {
//     font-size: 3rem;
//     color: red;
//   }
// `;

// const GridLink = styled(Link)`
//   text-align: center;
//   color: black;
// `;
