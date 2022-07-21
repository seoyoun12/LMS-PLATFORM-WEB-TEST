import styles from '@styles/common.module.scss';
import styled from '@emotion/styled';
import { Box, Button, Container, Grid, Icon, ListItem, ListItemIcon, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';
import { Link } from '@components/common';

const categoryData = [
  {
    id: 1,
<<<<<<< HEAD
    title1: "운수종사자",
    title2: "교육일정",
    href: "/calendar",
=======
    title: "운수종사자 교육일정",
    href: "/stebMove/steb1",
>>>>>>> feat/calendar
    icon: "CalendarMonthIcon",
    color: "#ffede9",
    btnText: "확인하기"
  },
  {
    id: 2,
<<<<<<< HEAD
    title1: "운수종사자",
    title2: "교육예약",
    href: "/2",
=======
    title: "운수종사자 교육예약",
    href: "/stebMove/steb2",
>>>>>>> feat/calendar
    icon: "DirectionsCarIcon",
    color: "#fff6e7",
    btnText: "예약하기"
  },
  {
    id: 3,
    title1: "운수종사자",
    title2: "학습하기",
    href: "/3",
    icon: "MenuBookOutlinedIcon",
    color: "#fffde2",
    btnText: "학습하기"
  },
  {
    id: 4,
    title1: "운수종사자",
    title2: "수료확인",
    href: "/4",
    icon: "FeaturedPlayListOutlinedIcon",
    color: "#f8ffe2",
    btnText: "수료확인"
  }
]

export function CategoryCard() {
  // console.log("categoryData : ", categoryData);
  return (
    // <ContentContainer className={styles.globalContainer}>
    <Container>
      <GridWrap
        container={true}
        spacing={0}
        columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
      >
          {categoryData.map((categoryData) => (
            <GridContainer key={categoryData.id} cardcolor={categoryData.color}>
              {/* <div className='categoryIcon'/> */}
              <GridTitleTypography className="cardTitleOne">{categoryData.title1}</GridTitleTypography>
              <GridTitleTypography className='CardTitleTwo'>{categoryData.title2}</GridTitleTypography>
              <GridLink href={categoryData.href} underline="none">
                <Button>{categoryData.btnText}</Button>
              </GridLink>
            </GridContainer>
          ))}
      </GridWrap>
    </Container>
  )
}

const GridWrap = styled(Grid)`
  width: 90%;
  padding: 5%;
  margin-left: 5%;
`


const GridContainer = styled(Container)<{cardcolor:string}>`
  /* display: flex; */
  width: 200px;
  height: 200px;
  border-radius: 20px;
  /* background-color: rgb(255, 0, 0, 0.1); */
  background-color: ${({cardcolor})=>cardcolor};

  .categoryIcon {
    width: 100px;
    height: 100px;
  }
`

const ContentContainer = styled.div`
  padding: 35px 0px 0 20px !important;
`

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
`

const GridLink = styled(Link)`
  position: relative;
  top: 40%;
  left: 30%;
  text-align: center;
`