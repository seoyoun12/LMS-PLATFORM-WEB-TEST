import styled from '@emotion/styled';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Link } from '@components/common';
import Image from 'next/image';

import useResponsive from '@hooks/useResponsive';


const categoryData = [
  {
    id: 1,
    title: '교통안전교육',
    title2: '자료실',
    href: '/traffic/learning-material/learning-guide',
    icon: 'assets/images/certificateTransIcon.png',
    color: '#00ffd2',
    btnText: '학습자료',
  },
  {
    id: 2,
    title: '교통안전교육',
    href: '/traffic/stebMove/steb1',
    icon: 'assets/images/calendarTransIcon.png',
    color: '#F4DB83',
    btnText: '신청',
  },
  {
    id: 3,
    title: '교통안전교육',
    title2: '학습하기',
    href: '/traffic/class-room',
    icon: 'assets/images/studyTransIcon.png',
    color: '#F1C3C1',
    btnText: '학습하기',
  },
  {
    id: 4,
    title: '교통안전교육',
    title2: '수료확인',
    href: '/me/certificate',
    icon: 'assets/images/certificateTransIcon.png',
    color: '#BDB8F3',
    btnText: '수료 확인',
  },
];



export default function CategoryCard() {
  const isTablet = useResponsive(1028);
  return (
    
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
            >
              <GridLink href={categoryData.href} width="100px" underline="none">
                <Box
                  sx={{
                    border: `5px solid ${categoryData.color}`,
                    margin: 'auto',
                    padding: `${!isTablet ? '8px  32px' : '32px 58px'}`,
                    borderRadius: '12px',
                    background: 'white',
                  }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image
                      src={'/' + categoryData.icon}
                      width={100}
                      height={100}
                      alt=''
                    />
                  </Box>
                  <Box mt={2}>
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
  padding-top: 24px;
  padding-bottom: 40px;
`;

const GridTitleTypography = styled(Typography)`
  position: relative;
  top: 35%;
  text-align: center;
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
  border-radius: 20px;
  /* background-color: ${props => props.cardcolor}; */
`;
const GridLink = styled(Link)`
  text-align: center;
  color: black;
`;
