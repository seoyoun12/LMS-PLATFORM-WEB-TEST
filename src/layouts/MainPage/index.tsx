import type { NextPage } from 'next';
import styles from '@styles/common.module.scss';
import * as React from 'react';
import styled from '@emotion/styled';
import { Spinner } from '@components/ui';
import cn from 'clsx';
import { Link } from '@components/common';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
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
import { courseType } from '@common/api/courseClass';
import { logout } from '@common/api';
import useResponsive from '@hooks/useResponsive';

// 메인 3개의 카드

const LinkList = [
  {
    mainDisplayType: MainDisplayType.EDUCATION_TRANSPORT_WORKER,
    pageType: pageRegType.TYPE_TRANS_EDU,
    displayWord: '운수종사자',
    textColor: '#0A9A4E',
    color: '#0A9A4E',
    lineColor: '#179b52',
    href: '/category',
    imgPath: '/assets/images/unsu.jpg',
    onClickCard: async () => {
      if (
        typeof window !== 'undefined' &&
        !localStorage.getItem('site_course_type')
      )
        return localStorage.setItem(
          'site_course_type',
          courseType.TYPE_TRANS_WORKER
        );
      if (
        typeof window !== 'undefined' &&
        localStorage.getItem('site_course_type') ===
          courseType.TYPE_TRANS_WORKER
      )
        return;
      if (
        localStorage.getItem('site_course_type') !==
        courseType.TYPE_TRANS_WORKER
      ) {
        if (!!localStorage.getItem('ACCESS_TOKEN')) {
          await logout();
          localStorage.setItem(
            'site_course_type',
            courseType.TYPE_TRANS_WORKER
          );
        } else {
        }
      }
      localStorage.setItem('site_course_type', courseType.TYPE_TRANS_WORKER);
    },
  },
  {
    mainDisplayType: MainDisplayType.EDUCATION_GROUND_BUS_DRIVER,
    pageType: pageRegType.TYPE_TRANS_EDU,
    displayWord: '저상버스',
    textColor: '#256AEF',
    color: '#256AEF',
    lineColor: '#2a6fe8',
    href: '/category',
    imgPath: '/assets/images/lowFloor.jpg',
    onClickCard: async () => {
      if (
        typeof window !== 'undefined' &&
        !localStorage.getItem('site_course_type')
      )
        return localStorage.setItem(
          'site_course_type',
          courseType.TYPE_LOW_FLOOR_BUS
        );
      if (
        typeof window !== 'undefined' &&
        localStorage.getItem('site_course_type') ===
          courseType.TYPE_LOW_FLOOR_BUS
      )
        return;
      if (
        localStorage.getItem('site_course_type') !==
        courseType.TYPE_LOW_FLOOR_BUS
      ) {
        if (!!localStorage.getItem('ACCESS_TOKEN')) {
          await logout();
          localStorage.setItem(
            'site_course_type',
            courseType.TYPE_LOW_FLOOR_BUS
          );
        } else {
        }
      }
      localStorage.setItem('site_course_type', courseType.TYPE_LOW_FLOOR_BUS);
    },
  },
  {
    mainDisplayType: MainDisplayType.EDUCATION_PROVINCIAL_TRAFFIC_SAFETY,
    pageType: pageRegType.TYPE_TRAFFIC_SAFETY_EDU,
    displayWord: '도민교통안전',
    textColor: '#711D14',
    color: '#FEC901',
    lineColor: '#57242b',
    href: 'traffic/category',
    // href: '',
    imgPath: '/assets/images/domin.jpg',
    onClickCard: async () => {
      if (
        typeof window !== 'undefined' &&
        !localStorage.getItem('site_course_type')
      )
        return localStorage.setItem(
          'site_course_type',
          courseType.TYPE_PROVINCIAL
        );
      if (
        typeof window !== 'undefined' &&
        localStorage.getItem('site_course_type') === courseType.TYPE_PROVINCIAL
      )
        return;
      if (
        localStorage.getItem('site_course_type') !== courseType.TYPE_PROVINCIAL
      ) {
        if (!!localStorage.getItem('ACCESS_TOKEN')) {
          await logout();
        } else {
          return localStorage.setItem(
            'site_course_type',
            courseType.TYPE_PROVINCIAL
          );
        }
      }
      localStorage.setItem('site_course_type', courseType.TYPE_PROVINCIAL);
    },
  },
];
const MainPage: NextPage = () => {
  const router = useRouter();
  const [screenHeight, setScreenHeight] = useState<number>();
  const [userPageType, setUserPageType] = useRecoilState(pageType);
  const isLogin = useIsLoginStatus();
  const isDesktop = useResponsive(1100);
  const { user, error: userError } = useMyUser();
  const { data, error } = useMainDisplay();
  const wrapRef = React.useRef<HTMLDivElement>();
  React.useEffect(() => {
    // if (isLogin && user) {
    //   if (user.roles.some(item => item === UserRole.ROLE_ADMIN)) return;
    //   if (user.regCategory === regCategoryType.TYPE_TRANS_EDU) {
    //     router.push('/category');
    //   } else if (user.regCategory === regCategoryType.TYPE_TRAFFIC_SAFETY_EDU) {
    //     router.push('/traffic/category');
    //   }
    // }
  }, [isLogin, user]);

  React.useEffect(() => {
    const htmlTag = document.querySelector('html');
    const bodyTag = document.querySelector('body');
    const idTag = document.querySelector('#__next') as HTMLElement;
    const idTagFirseChildStyle = idTag.childNodes[0] as HTMLElement;
    const mainTag = document.querySelector('main');

    if (isDesktop) {
      htmlTag.style.height = '100%';
      bodyTag.style.height = '100%';
      idTag.style.height = '100%';
      idTagFirseChildStyle.style.height = '100%';
      mainTag.style.height = '100%';
    }
    if (!isDesktop) {
      htmlTag.style.height = '';
      bodyTag.style.height = '';
      idTag.style.height = '';
      idTagFirseChildStyle.style.height = '';
      mainTag.style.height = '';
    }

    return () => {
      htmlTag.style.height = '';
      bodyTag.style.height = '';
      idTag.style.height = '';
      idTagFirseChildStyle.style.height = '';
      mainTag.style.height = '';
    };
  }, [isDesktop]);

  if (!data) return <Spinner />;
  return (
    <WrapMainContainer
      ref={wrapRef}
      // style={{ height: screenHeight ? screenHeight : '' }}
    >
      <Head>
        <title>충남교통연수원</title>
      </Head>
      <MainContainer>
        <ContentBox>
          <LogoBox>
            <Image
              src="/assets/images/cttiLogo.png"
              height={48}
              width={320}
              alt="Your Name"
              style={{ margin: 'auto' }}
            />
          </LogoBox>
          <SubTitle>
            <Box>충남 교통안전&nbsp;</Box>
            <Box color="#236cef">온라인교육센터</Box>
          </SubTitle>
          <NoticeContainer>
            {/* <NoticeTitle>
              <NoticeTitleTypography>{`충남교통연수원 알림판`}</NoticeTitleTypography>
            </NoticeTitle> */}
            <NoticeContent>
              <NoticeContentTypography>
                {/* <Box display="flex">
                  <Box>-&nbsp;</Box>
                  <Box>
                    본 온라인 과정은{' '}
                    <span style={{ color: '#fc4719' }}>
                      차량등록지가 충남 또는 세종시 운수종사자에 해당되는 교육
                    </span>
                    으로 타시‧도 차량은 교육을 이수 할 수 없습니다.
                  </Box>
                </Box>
                <Box display="flex">
                  <Box>-&nbsp;</Box>
                  <Box>
                    <span style={{ color: '#fc4719' }}>운전 중 교육을 진행할 경우</span>{' '}
                    안전을 위해 <span style={{ color: '#fc4719' }}>교육이 중단</span>
                    됩니다.
                  </Box>
                </Box>
                <Box display="flex">
                  <Box>-&nbsp;</Box>
                  <Box display="flex" flexWrap="wrap">
                    온라인교육은 네트워크 상태에 따라 데이터 요금이 발생할 수 있습니다.
                    <span>
                      (<span style={{ color: '#fc4719' }}>Wi-Fi 사용 권장</span>)
                    </span>
                  </Box>
                </Box> */}
                <ul>
                  <li>
                    본 온라인 과정은{' '}
                    <span style={{ color: '#c92f2f' }}>
                      차량등록지가 충남 또는 세종시 운수종사자에 해당되는 교육
                    </span>
                    으로 타시‧도 차량은 교육을 이수 할 수 없습니다.
                  </li>
                  <li>
                    <span style={{ color: '#c92f2f' }}>
                      운전 중 교육을 진행할 경우
                    </span>{' '}
                    안전을 위해{' '}
                    <span style={{ color: '#c92f2f' }}>교육이 중단</span>
                    됩니다.
                  </li>
                  <li>
                    온라인교육은 네트워크 상태에 따라 데이터 요금이 발생할 수
                    있습니다.
                    <span>
                      (<span style={{ color: '#c92f2f' }}>Wi-Fi 사용 권장</span>
                      )
                    </span>
                  </li>
                </ul>
              </NoticeContentTypography>
            </NoticeContent>
          </NoticeContainer>
          <Box position="relative">
            <CategoryGrid
              container={true}
              spacing={0}
              columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
              height={'100%'}
            >
              {data.map(item => {
                if (item.status === 1) {
                  const {
                    href,
                    color,
                    textColor,
                    displayWord,
                    imgPath,
                    pageType,
                    lineColor,
                    onClickCard,
                  } = LinkList.filter(
                    filter => filter.mainDisplayType === item.mainDisplayType
                  )[0];
                  return (
                    <MainCategoryCard sx={{ borderTop: `7px solid ${color}` }}>
                      <Box
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          // setUserPageType(pageType);
                          // if (displayWord === '도민교통' || displayWord === '저상버스')
                          // if (displayWord === '도민교통안전') {
                          //   return window.alert('준비중 입니다.');
                          // }
                          onClickCard();
                          router.push(href);
                        }}
                      >
                        <Box
                          width="270px"
                          height="150px"
                          borderRadius="8px 8px 0 0"
                          overflow="hidden"
                          className="gg"
                        >
                          <Image
                            src={imgPath}
                            // width="270"
                            // height="184"
                            style={{ aspectRatio: '16 / 9', zIndex: -19999 }}
                            layout="fill"
                            objectFit="fill"
                          />
                        </Box>
                        <CardInContainer>
                          <Box>
                            <Typography
                              component="span"
                              fontSize={25}
                              fontWeight="bold"
                              color={textColor}
                            >
                              {displayWord}
                            </Typography>
                            <Typography
                              component="span"
                              fontSize={25}
                              fontWeight="bold"
                              color="#000"
                            >
                              교육
                            </Typography>
                          </Box>
                          <Button color="neutral" sx={{ position: 'relative' }}>
                            <Typography fontWeight="bold">바로가기</Typography>
                            <Box
                              className="button-bot-line"
                              borderBottom={`2px solid ${lineColor}`}
                            />
                            <Box
                              className="button-right-line"
                              borderRight={` 2px solid ${lineColor}`}
                            />
                          </Button>
                        </CardInContainer>
                      </Box>
                    </MainCategoryCard>
                  );
                }
              })}
            </CategoryGrid>
          </Box>
        </ContentBox>
      </MainContainer>
      <FooterContainer sx={{ color: 'black' }}>
        <FooterWord>CTTI</FooterWord>
        <SecretTrafficTunnel
          onClick={async () => {
            await LinkList[2].onClickCard();
            router.push(LinkList[2].href);
          }}
        />
      </FooterContainer>
    </WrapMainContainer>
  );
};
// Wrap
const WrapMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .MuiButton-root.MuiButton-textNeutral:hover {
    background-color: #fff;
  }
  .MuiButton-root.MuiButton-textNeutral {
    width: 100%;
  }
  .gg {
    position: relative;
  }
`;
// MainContainer
const MainContainer = styled(Box)`
  height: 80%;
  /* min-height: 719px; */
  padding-top: 80px;
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

const SubTitle = styled(Box)`
  font-size: 19px;
  font-weight: 700;
  padding: 0.5rem 2.5rem;
  width: fit-content;
  margin: auto;
  margin-top: 30px;
  /* color: white; */
  background: #f7f7f7;
  border: 1px solid #236cef;
  border-radius: 24px;
  display: flex;
`;

// Notice
const NoticeContainer = styled(Box)`
  max-width: 930px;
  position: relative;
  height: 25%;
  margin: auto;
  margin-top: 40px;
  border-radius: 1rem;
  border: 2px solid #d7d7d7;
  // 알림판 중앙 정렬
`;

const NoticeTitle = styled(Box)`
  position: absolute;
  width: 236px;
  height: 46px;
  right: 50%;
  color: black;
  background: #f9f9f9;
  box-sizing: border-box;
  border-radius: 1rem;
  border: 1px solid #d7d7d7;
  padding: 0.5rem 0.25rem;
  transform: translate(50%, -50%);
`;
const NoticeTitleTypography = styled(Typography)`
  width: 100%;
  font-size: 1.15rem;
  font-weight: bold;
  text-align: center;
`;
const NoticeContent = styled(Box)`
  height: 100%;
  margin: 2rem;
  text-align: center;
  border-radius: 0 30px 30px 0;
  background-color: white;
`;
// line-break
const NoticeContentTypography = styled(Typography)`
  /* padding-top: 30px; */
  word-break: keep-all;
  font-weight: bold;
  text-align: start;
  /* white-space: pre-wrap; */
  li {
    list-style: disc;
  }
`;

// Category Grid
const CategoryGrid = styled(Grid)`
  /* position: relative; */
  height: 100%;
  display: flex;
  justify-content: center;
  gap: 13px;
`;
// Three section
const MainCategoryCard = styled(Container)`
  display: flex;
  width: 328px;
  height: 386px;
  background: #fff;
  justify-content: center;
  align-items: center;
  margin: 0;
  margin-top: 60px;
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
  border-radius: 0 0 30px 30px;
  background-color: white;
  margin: auto;
  padding-top: 2rem;

  .button-bot-line {
    position: absolute;
    left: 0;
    top: 2rem;
    width: 100%;
    /* border-bottom: 2px solid #dadada; */
  }
  .button-right-line {
    position: absolute;
    right: 9px;
    top: 0.5rem;
    height: 75%;
    /* border-right: 2px solid #dadada; */
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
  right: 10%;
  bottom: 1rem;
  font-size: 13rem;
  font-weight: bold;
  color: #1a53ba;
  transform: rotate(-15deg);

  /* @media (max-width: 1230px) {
    right: 10rem;
  } */
  @media (max-width: 768px) {
    width: fit-content;
    height: fit-content;
    right: 2%;
    bottom: -10%;
    font-size: 8rem;
  }
`;

const SecretTrafficTunnel = styled(Box)`
  position: absolute;
  width: 10px;
  height: 10px;
  left: 0px;
  bottom: 0px;
  /* border: 1px solid red; */
`;

export default MainPage;
