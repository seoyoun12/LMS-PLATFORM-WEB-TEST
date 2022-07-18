import type { NextPage } from 'next';
import styles from '@styles/common.module.scss';
import * as React from 'react';
import styled from '@emotion/styled';
import { ContentCard, CategoryCarousel, Spinner } from '@components/ui';
import cn from 'clsx';
import { Link } from '@components/common';
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { useCourseList } from '@common/api/course';
import { useState } from 'react';
import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import Head from 'next/head';


const MainPage: NextPage = () => {
  return (

    
    <WrapMainContainer>

      <Head>
        <title>Main Page</title>
      </Head>

      <MainContainer>

        <TitleTypography variant='h4' align='center'>충남교통연수원</TitleTypography>

        <NoticeContainer>
          <NoticeTitle>
            <NoticeCircle/>
            <NoticeTitleTypography>{`충남교통연수원 \n알림판`}</NoticeTitleTypography>
          </NoticeTitle>
          <NoticeContent>
            <NoticeContentTypography>
              {`운수종사자의 경우 첫번째 "운수종사자교육"\n저상버스운전자의 경우 두번째 "저상버스운전자교육"\n도민교통안전교육자의 경우 세번째 "도민교통안전교육"을\n이용해주시기 바랍니다.`}
            </NoticeContentTypography>
          </NoticeContent>
        </NoticeContainer>

        <Grid
          container={true}
          spacing={0}
          columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
        >

          <MainCategoryCard>
            <Link href="/category" underline="none">
              <CardInContainer>
                <Button color="neutral">Move</Button>
              </CardInContainer>
            </Link>
          </MainCategoryCard>

          <MainCategoryCard>
            <Link href="/category" underline="none">
              <CardInContainer>
                <Button
                  color="neutral"
                >Move</Button>
              </CardInContainer>
            </Link>
          </MainCategoryCard>

          <MainCategoryCard>
            <Link href="/category" underline="none">
              <CardInContainer>
                <Button
                  color="neutral"
                >Move</Button>
              </CardInContainer>
            </Link>
          </MainCategoryCard>

        </Grid>
      </MainContainer>
    </WrapMainContainer>
  );
}



// Wrap
const WrapMainContainer = styled.div`
  display: flex;
  width : 100%;
  height: 70vh;
  background-color: #dcf3ff;
  align-content: flex-start;
`
// MainContainer
const MainContainer = styled(Container)`
  width: 45%;
`

// Title
const TitleTypography = styled(Typography)`
  box-sizing: border-box;
  font-weight: bold;
  font-size: 3rem;
  margin-top: 100px;
`

// Notice
const NoticeContainer = styled(Container)`
  width: 90%;
  height: 25%;
  margin-top: 50px;
  border-radius: 30px;
  display: flex;
`

const NoticeCircle = styled(Container)`
  width: 20px;
  height: 20px;
  background-color: yellow;
  border-radius: 100%;
  float: left;
  margin: 17px 0 0 17px;
`

const NoticeTitle = styled(Container)`
  width: 40%;
  height: 100%;
  border-radius: 30px 0 0 30px;
  background-color: rgb(63, 63, 198);
  position: relative;
`

const NoticeTitleTypography = styled(Typography)`
  white-space: pre-wrap;
  color: white;
  font-size: 1.5rem;
  text-align: center;
  margin: 40px 0 0 20px;  
`

const NoticeContent = styled(Container)`
  width: 60%;
  height: 100%;
  border-radius: 0 30px 30px 0;
  background-color: white;
`

const NoticeContentTypography = styled(Typography)`
  white-space: pre-wrap;
`


// Three section
const MainCategoryCard = styled(Container)`
  display: flex;
  width: 270px;
  height: 300px;
  border-radius: 70px 70px 30px 30px;
  background-color: rgb(28, 154, 41);
  justify-content: center;
  align-items: center;
  margin-top: 80px;
  box-shadow: 2px 2px 12px 3px rgba(0, 0, 0, 0.5);
`

const CardInContainer = styled(Container)`
  width: 270px;
  height: 130px;
  margin-top: 170px;
  border-radius: 0 0 30px 30px;
  background-color: white;
`


export default MainPage;