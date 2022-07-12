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
    title: "운수종사자 교육일정",
    href: "/calendar",
    icon: "CalendarMonthIcon",
    color: "#ffede9",
    btnText: "확인하기"
  },
  {
    id: 2,
    title: "운수종사자 교육예약",
    href: "/2",
    icon: "DirectionsCarIcon",
    color: "#fff6e7",
    btnText: "예약하기"
  },
  {
    id: 3,
    title: "운수종사자 학습하기",
    href: "/3",
    icon: "MenuBookOutlinedIcon",
    color: "#fffde2",
    btnText: "학습하기"
  },
  {
    id: 4,
    title: "운수종사자 수료확인",
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
              <div className='categoryIcon'/>
              <div>{categoryData.title}</div>
              <Link href={categoryData.href} underline="none">
                <Button>{categoryData.btnText}</Button>
              </Link>
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
  display: flex;
  width: 200px;
  height: 200px;
  border-radius: 20px;
  background-color: rgb(255, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
  background-color: ${({cardcolor})=>cardcolor};

  .categoryIcon {
    width: 100px;
    height: 100px;
  }
`

const ContentContainer = styled.div`
  padding: 35px 0px 0 20px !important;
`
