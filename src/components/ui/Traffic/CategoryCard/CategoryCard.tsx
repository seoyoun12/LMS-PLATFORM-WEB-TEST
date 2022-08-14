import styled from '@emotion/styled';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { Link } from '@components/common';
import CalendarIcon from '/public/assets/svgs/calendarIcon.svg';
import PromiseIcon from '/public/assets/svgs/promiseIcon.svg';
import StudyIcon from '/public/assets/svgs/studyIcon.svg';
import CertificateIcon from '/public/assets/svgs/certificateIcon.svg';

const categoryData = [
  {
    id: 1,
    title: '도민교통',
    href: 'stebMove/steb2',
    icon: <CalendarIcon />,
    color: '#fff',
    // color: '#ffede9',
    btnText: '확인하기',
  },
  {
    id: 2,
    title: '도민교통',
    href: 'stebMove/steb2',
    icon: <PromiseIcon />,
    color: '#fff',
    // color: '#fff6e7',
    btnText: '예약하기',
  },
  {
    id: 3,
    title: '도민교통',
    title2: '학습하기',
    href: '/traffic/3',
    icon: <StudyIcon />,
    color: '#fff',
    // color: '#fffde2',
    btnText: '학습하기',
  },
  {
    id: 4,
    title: '도민교통',
    title2: '수료확인',
    href: '/traffic/4',
    icon: <CertificateIcon />,
    color: '#fff',
    // color: '#f8ffe2',
    btnText: '수료확인',
  },
];

export function CategoryCard() {
  // console.log("categoryData : ", categoryData);
  return (
    // <ContentContainer className={styles.globalContainer}>
    <Container>
      <GridWrap
        container
        spacing={0}
        columns={{ xs: 1, sm: 2, md: 2, lg: 4, xl: 4 }}
        mt={16}
        mb={10}
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
              {/* <div className='categoryIcon'/> */}
              <Box display="flex" alignItems="center" justifyContent="center">
                {categoryData.icon}
              </Box>
              <Box mt={2}>
                <GridTitleTypography fontWeight={500} fontSize="18px">
                  {categoryData.title}
                </GridTitleTypography>
                <GridTitleTypography fontWeight={700} fontSize="24px">
                  {categoryData.btnText}
                </GridTitleTypography>

                {/* <Button>{categoryData.btnText}</Button> */}
              </Box>
            </GridLink>
          </GridItem>
        ))}
      </GridWrap>
    </Container>
  );
}

const GridWrap = styled(Grid)``;

const GridItem = styled(Grid)<{ cardcolor: string }>`
  /* display: flex; */
  border-radius: 20px;
  /* background-color: rgb(255, 0, 0, 0.1); */
  background-color: ${({ cardcolor }) => cardcolor};
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

const GridLink = styled(Link)`
  text-align: center;
  color: black;
`;
