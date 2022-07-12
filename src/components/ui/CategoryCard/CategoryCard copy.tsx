import styles from '@styles/common.module.scss';
import styled from '@emotion/styled';
import { Button, Container, Grid, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';
import { Link } from '@components/common';

// const categoryData = [
//   {
//     id: 1,
//     img : '',
//     title: "운수종사자 교육일정",
//     description: 'description 1',
//   },
//   {
//     id: 2,
//     img : '',
//     title: "운수종사자 교육예약",
//     description: 'description 2',
//   },
//   {
//     id: 3,
//     img : '',
//     title: "운수종사자 학습하기",
//     description: 'description 3',
//   },
//   {
//     id: 4,
//     img : '',
//     title: "운수종사자 수료확인",
//     description: 'description 4',
//   }
// ]

export function CategoryCard() {

  return (
    <ContentContainer className={styles.globalContainer}>

      <Grid
        container={true}
        spacing={0}
        columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
      >

        <GridContainer>
          <CalendarMonthIcon className='categoryIcon'/>
          <Typography>운수종사자</Typography>
          <Typography>교육 일정</Typography>
          <Link href="/calendar" underline="none">
            <Button>확인하기</Button>
          </Link>
        </GridContainer>

        <GridContainer>
          <SecondIcon />
          <Typography>운수종사자</Typography>
          <Typography>교육 예약</Typography>
          <Button>예약하기</Button>
        </GridContainer>

        <GridContainer>
          <ThirdIcon />
          <Typography>운수종사자</Typography>
          <Typography>학습하기</Typography>
          <Button>학습하기</Button>
        </GridContainer>

        <GridContainer>
          <FourthIcon />
          <Typography>운수종사자</Typography>
          <Typography>수료 확인</Typography>
          <Button>수료확인</Button>
        </GridContainer>

      </Grid>

    </ContentContainer>
  )
}


const GridContainer = styled(Container)`
  display: flex;
  width: 250px;
  height: 280px;
  border-radius: 20px;
  background-color: rgb(255, 0, 0, 0.1);
  justify-content: center;
  align-items: center;

  .categoryIcon {
    width: 100px;
    height: 100px;
    display: block;
  }
`

const ContentContainer = styled.div`
  padding: 35px 0px 0 20px !important;
`

const FirstIcon = styled(CalendarMonthIcon)`
  width: 100px;
  height: 100px;
  display: block;
`

const SecondIcon = styled(DirectionsCarIcon)`
  width: 100px;
  height: 100px;
`

const ThirdIcon = styled(MenuBookOutlinedIcon)`
  width: 100px;
  height: 100px;
`

const FourthIcon = styled(FeaturedPlayListOutlinedIcon)`
  width: 100px;
  height: 100px;
`