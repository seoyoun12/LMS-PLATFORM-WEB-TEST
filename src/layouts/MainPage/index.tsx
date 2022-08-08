import type { NextPage } from 'next';
import styles from '@styles/common.module.scss';
import * as React from 'react';
import styled from '@emotion/styled';
import { Spinner } from '@components/ui';
import cn from 'clsx';
import { Link } from '@components/common';
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { Container } from '@mui/system';
import Head from 'next/head';
import Image from 'next/image';
import { MainDisplayType, useMainDisplay } from '@common/api/mainDisplay';
import { useRecoilState } from 'recoil';
import { pageType } from '@common/recoil';
import { pageRegType } from '@common/recoil/pageType/atom';
import { useIsLoginStatus } from '@hooks/useIsLoginStatus';
import { regCategoryType, useMyUser, UserRole } from '@common/api/user';
import { useRouter } from 'next/router';

const LinkList = [
  {
    mainDisplayType: MainDisplayType.EDUCATION_TRANSPORT_WORKER,
    pageType: pageRegType.TYPE_TRANS_EDU,
    displayWord: '운수종사자',
    color: '#0A9A4E',
    href: '/category',
    imgPath: '/assets/images/unsu.png',
  },
  {
    mainDisplayType: MainDisplayType.EDUCATION_GROUND_BUS_DRIVER,
    pageType: pageRegType.TYPE_TRANS_EDU,
    displayWord: '저상버스',
    color: '#256AEF',
    href: '/category',
    imgPath: '/assets/images/lowFloor.png',
  },
  {
    mainDisplayType: MainDisplayType.EDUCATION_PROVINCIAL_TRAFFIC_SAFETY,
    pageType: pageRegType.TYPE_TRAFFIC_SAFETY_EDU,
    displayWord: '도민교통',
    color: '#FEC901',
    href: 'traffic/category',
    imgPath: '/assets/images/domin.png',
  },
];

const MainPage: NextPage = () => {
  const router = useRouter();
  const [screenHeight, setScreenHeight] = useState<number>();
  const [userPageType, setUserPageType] = useRecoilState(pageType);
  const isLogin = useIsLoginStatus();
  const { user, error: userError } = useMyUser();
  const { data, error } = useMainDisplay();

  React.useEffect(() => {
    if (isLogin && user) {
      if (user.roles.some(item => item === UserRole.ROLE_ADMIN)) return;
      if (user.regCategory === regCategoryType.TYPE_TRANS_EDU) {
        router.push('/category');
      } else if (user.regCategory === regCategoryType.TYPE_TRAFFIC_SAFETY_EDU) {
        router.push('/traffic/category');
      }
    }
    console.log(screen.availHeight);
    setScreenHeight(screen.availHeight);
  }, [isLogin, user]);

  if (!data) return <Spinner />;
  return (
    <WrapMainContainer
    // style={{height:screenHeight ? screenHeight : ''}}
    >
      <Head>
        <title>Main Page</title>
      </Head>

      <MainContainer>
        <ContentBox>
          <LogoBox>
            <Image src="/assets/images/cttsLogo.png" height={48} width={320} alt="Your Name" style={{ margin: 'auto' }} />
          </LogoBox>

          <NoticeContainer>
            <NoticeTitle>
              <NoticeTitleTypography>{`충남교통연수원 알림판`}</NoticeTitleTypography>
            </NoticeTitle>
            <NoticeContent>
              <NoticeContentTypography fontWeight="bold">
                {`운수종사자의 경우 첫번째 "운수종사자교육"\n저상버스운전자의 경우 두번째 "저상버스운전자교육"\n도민교통안전교육자의 경우 세번째 "도민교통안전교육"을\n이용해주시기 바랍니다.`}
              </NoticeContentTypography>
            </NoticeContent>
          </NoticeContainer>

          <Box position="relative">
            <CategoryGrid
              container={true}
              spacing={0}
              columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
              gap={1}
              position="relative"
              height={'100%'}
              top={60}
            >
              {data.map(item => {
                if (item.status === 1) {
                  const { href, color, displayWord, imgPath, pageType } = LinkList.filter(
                    filter => filter.mainDisplayType === item.mainDisplayType
                  )[0];
                  return (
                    <MainCategoryCard sx={{ borderTop: `4px solid ${color}` }}>
                      <Link href={href} onClick={() => setUserPageType(pageType)}>
                        <Box width="270px" borderRadius="8px 8px 0 0" overflow="hidden">
                          <Image src={imgPath} width="270" height="184" objectFit="fill" />
                        </Box>
                        <CardInContainer>
                          <Box>
                            <Typography component="span" fontSize={25} fontWeight="bold" color={color}>
                              {displayWord}
                            </Typography>
                            <Typography component="span" fontSize={25} fontWeight="bold" color="#000">
                              교육
                            </Typography>
                          </Box>
                          <Button color="neutral" sx={{ position: 'relative' }}>
                            <Typography>바로가기</Typography>
                            <Box className="button-bot-line" />
                            <Box className="button-right-line" />
                          </Button>
                        </CardInContainer>
                      </Link>
                    </MainCategoryCard>
                  );
                }
              })}

              {/* <MainCategoryCard>
            <Link href="/category" underline="none">
              <Box width='270px' borderRadius='8px 8px 0 0' overflow='hidden' >
              <Image src='/assets/images/banner.jpg' width='270' height='184' objectFit='fill' /></Box>
              <CardInContainer>
                <Button color="neutral">Move</Button>
              </CardInContainer>
            </Link>
          </MainCategoryCard>

          <MainCategoryCard>
            <Link href="/category" underline="none">
              <Box width='270px' borderRadius='8px 8px 0 0' overflow='hidden' >
              <Image src='/assets/images/banner.jpg' width='270' height='184' objectFit='fill' /></Box>
              <CardInContainer>
                <Button
                  color="neutral"
                >Move</Button>
              </CardInContainer>
            </Link>
          </MainCategoryCard>

          <MainCategoryCard>
            <Link href="/category" underline="none">
              <Box width='270px' borderRadius='8px 8px 0 0' overflow='hidden' >
              <Image src='/assets/images/banner.jpg' width='270' height='184' objectFit='fill' /></Box>
              <CardInContainer>
                <Button
                  color="neutral"
                  >Move</Button>
              </CardInContainer>
            </Link>
          </MainCategoryCard> */}
            </CategoryGrid>
          </Box>
        </ContentBox>
      </MainContainer>
      <FooterContainer sx={{ color: 'black' }}>
        <FooterWord>CTTS</FooterWord>
      </FooterContainer>
    </WrapMainContainer>
  );
};
// Wrap
const WrapMainContainer = styled.div`
  /* display: flex; */
  width: 100%;
  height: 100%;
  /* align-content: flex-start; */

  .MuiButton-root.MuiButton-textNeutral:hover {
    background-color: #fff;
  }
  .MuiButton-root.MuiButton-textNeutral {
    width: 100%;
  }
`;
// MainContainer
const MainContainer = styled(Box)`
  /* background: #dcf3ff; */
  height: 70%;
  min-height: 728px;
  padding-top: 4rem;
`;

const ContentBox = styled(Box)`
  width: 80%;
  margin: auto;
  @media (max-width: 1230px) {
    width: 95%;
  }
`;

const LogoBox = styled(Box)`
  width: fit-content;
  margin: auto;
`;

// Notice
const NoticeContainer = styled(Box)`
  position: relative;
  height: 25%;
  margin-top: 5rem;
  border-radius: 1rem;
  border: 2px solid #d7d7d7;
`;

const NoticeTitle = styled(Box)`
  position: absolute;
  /* top:-1.5rem; */
  width: 40%;
  right: 50%;
  color: black;
  background: #f9f9f9;
  box-sizing: border-box;
  border-radius: 1rem;
  border: 1px solid #d7d7d7;
  padding: 0.5rem 0.25rem;
  transform: translate(50%, -50%);
  /* border-radius: 30px 0 0 30px; */
  /* background-color: rgb(63, 63, 198); */
`;

const NoticeTitleTypography = styled(Typography)`
  /* white-space: pre-wrap; */
  width: 100%;
  font-size: 1.15rem;
  font-weight: bold;
  text-align: center;
`;

const NoticeContent = styled(Box)`
  /* width: 60%; */
  height: 100%;
  margin: 2rem;
  text-align: center;
  border-radius: 0 30px 30px 0;
  background-color: white;
`;

// line-break
const NoticeContentTypography = styled(Typography)`
  white-space: pre-wrap;
`;

// Category Grid
const CategoryGrid = styled(Grid)`
  gap: 4px;
  position: relative;
  top: 60px;
  height: 100%;
  display: flex;
  justify-content: center;
  gap: 14px;
`;

// Three section
const MainCategoryCard = styled(Container)`
  display: flex;
  width: 328px;
  height: 386px;
  /* border-radius: 70px 70px 30px 30px; */
  background: #fff;
  justify-content: center;
  align-items: center;
  margin: 0;
  margin-top: 80px;
  box-shadow: 2px 2px 12px 3px rgba(0, 0, 0, 0.2);
  z-index: 11;
`;

const CardInContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 185px;
  height: 130px;
  /* margin-top: 170px; */
  border-radius: 0 0 30px 30px;
  background-color: white;
  margin: auto;
  padding-top: 2rem;
  .button-bot-line {
    position: absolute;
    left: 0;
    top: 2rem;
    width: 100%;
    border-bottom: 2px solid #dadada;
  }
  .button-right-line {
    position: absolute;
    right: 9px;
    top: 0.5rem;
    height: 75%;
    border-right: 2px solid #dadada;
    transform: rotate(-40deg);
  }
`;

const FooterContainer = styled(Box)`
  position: relative;
  width: 100%;
  height: 250px;
  background: #144aaa;
  overflow: hidden;
`;

const FooterWord = styled(Box)`
  position: absolute;
  width: 435px;
  height: 214px;
  right: 25rem;
  bottom: 1rem;
  font-size: 13rem;
  font-weight: bold;
  color: #1a53ba;
  transform: rotate(-15deg);
`;

export default MainPage;
