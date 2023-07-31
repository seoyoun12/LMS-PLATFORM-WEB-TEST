import type { NextPage } from 'next';
import * as React from 'react';
import styled from '@emotion/styled';
import { Spinner } from '@components/ui';
import { Box,Button,Grid,Typography } from '@mui/material';
import { Container } from '@mui/system';
import Head from 'next/head';
import Image from 'next/image';
import { MainDisplayType, useMainDisplay } from '@common/api/mainDisplay';
import { pageRegType } from '@common/recoil/pageType/atom';
import { useIsLoginStatus } from '@hooks/useIsLoginStatus';
import {  useMyUser } from '@common/api/user';
import { useRouter } from 'next/router';
import { courseType } from '@common/api/courseClass';
import { logout } from '@common/api';
import useResponsive from '@hooks/useResponsive';
// import styles from '@styles/common.module.scss';
// import cn from 'clsx';
// import { Link } from '@components/common';
// import { useState } from 'react';
// import { useRecoilState } from 'recoil';
// import { pageType } from '@common/recoil';

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
    imgPath: '/assets/images/hub001.png',
    onClickCard: async () => {
      if (typeof window !== 'undefined' && !localStorage.getItem('site_course_type'))
        return localStorage.setItem('site_course_type', courseType.TYPE_TRANS_WORKER);
      if (
        typeof window !== 'undefined' &&
        localStorage.getItem('site_course_type') === courseType.TYPE_TRANS_WORKER
      )
        return;
      if (localStorage.getItem('site_course_type') !== courseType.TYPE_TRANS_WORKER) {
        if (!!localStorage.getItem('ACCESS_TOKEN')) {
          await logout();
          localStorage.setItem('site_course_type', courseType.TYPE_TRANS_WORKER);
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
    imgPath: '/assets/images/hub002.png',
    onClickCard: async () => {
      if (typeof window !== 'undefined' && !localStorage.getItem('site_course_type'))
        return localStorage.setItem('site_course_type', courseType.TYPE_LOW_FLOOR_BUS);
      if (
        typeof window !== 'undefined' &&
        localStorage.getItem('site_course_type') === courseType.TYPE_LOW_FLOOR_BUS
      )
        return;
      if (localStorage.getItem('site_course_type') !== courseType.TYPE_LOW_FLOOR_BUS) {
        if (!!localStorage.getItem('ACCESS_TOKEN')) {
          await logout();
          localStorage.setItem('site_course_type', courseType.TYPE_LOW_FLOOR_BUS);
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
    imgPath: '/assets/images/hub003.png',
    onClickCard: async () => {
      if (typeof window !== 'undefined' && !localStorage.getItem('site_course_type'))
        return localStorage.setItem('site_course_type', courseType.TYPE_PROVINCIAL);
      if (
        typeof window !== 'undefined' &&
        localStorage.getItem('site_course_type') === courseType.TYPE_PROVINCIAL
      )
        return;
      if (localStorage.getItem('site_course_type') !== courseType.TYPE_PROVINCIAL) {
        if (!!localStorage.getItem('ACCESS_TOKEN')) {
          await logout();
        } else {
          return localStorage.setItem('site_course_type', courseType.TYPE_PROVINCIAL);
        }
      }
      localStorage.setItem('site_course_type', courseType.TYPE_PROVINCIAL);
    },
  },
];
const MainPage: NextPage = () => {
  const router = useRouter();
  // const [screenHeight, setScreenHeight] = useState<number>();
  // const [userPageType, setUserPageType] = useRecoilState(pageType);
  const isLogin = useIsLoginStatus();
  const isDesktop = useResponsive(1100);
  const { user } = useMyUser();
  const { data } = useMainDisplay();
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
      
        <ContentBox>
          <LogoBox>
            <Image
              src="/assets/images/cttiLogo.png"
              height={48}
              width={320}
              alt="Your Name"
            />
          </LogoBox>
          <SubTitle>
            <Box>충남 교통안전&nbsp;</Box>
            <Box color="#236cef">온라인교육센터</Box>
          </SubTitle>
                <MainInfoBannerBox>
                  <Image
                    src='/assets/images/main_center_info.png'
                    alt='중앙 안내문'
                    layout='responsive'
                    width={1200}
                    height={280}
                    priority
                  />
                </MainInfoBannerBox>
          <Box position="relative">
            <CategoryGrid
              container={true}
              spacing={0}
              columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
              height={'100%'}
            >
              {data.map(item => {
                if (item.status === 1) {
                  const { href,color,textColor,displayWord,imgPath,lineColor,onClickCard } =
                  LinkList.filter(filter => filter.mainDisplayType === item.mainDisplayType)[0];
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
                          width='100%'
                          borderRadius="8px 8px 0 0"
                          overflow="hidden"
                          className="gg"
                        >
                          <Image
                            src={imgPath}
                            width="270"
                            height="184"
                            style={{ aspectRatio: '16 / 9', zIndex: -19999 }}
                            
                            objectFit="fill"
                            alt='메인 카드 이미지'
                          />
                        </Box>
                        <CardInContainer>
                          <Box>
                            <Typography
                              component="span"
                              fontSize={24}
                              fontWeight="bold"
                              color={textColor}
                              className='category-card-title'
                            >
                              {displayWord}
                            </Typography>
                            <Typography
                              component="span"
                              fontSize={24}
                              fontWeight="bold"
                              color="#000"
                              className='category-card-title'
                            >
                              교육
                            </Typography>
                          </Box>
                          <Button color="neutral" sx={{ position: 'relative' }}>
                            <Typography className='category-card-title' fontWeight="bold">바로가기</Typography>
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
      
      <FooterContainer>
        <FooterWord>CTTI</FooterWord>
      </FooterContainer>
    </WrapMainContainer>
  );
};
// Wrap
const WrapMainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: auto;
  min-height:100vh;
  .MuiButton-root.MuiButton-textNeutral:hover {
    background-color: #fff;
  }
  .MuiButton-root.MuiButton-textNeutral {
    width: 100%;
  }
  .category-card-title {
    font-size: 2.5rem;
    @media (max-width: 1500px) {
      font-size: 2rem;
    }
    @media (max-width: 1080px) {
      font-size: 1.5rem;
    }
    @media (max-width: 868px) {
      font-size: 1.25rem;
    }
    @media (max-width: 658px) {
      font-size: 1rem;
    }
    @media (max-width: 514px) {
      font-size: 2rem;
    }
  }
  .gg {
    position: relative;
    width: 100%;
    height: 180px;
    margin: 0 auto;
    
    @media (max-width: 1500px) {
      width: 100%;
      height: 180px;
    }
    @media (max-width: 1080px) {
      width: 100%;
      height: 180px;
    }
    @media (max-width: 868px) {
      width: 100%;
      height: 150px;
    }
    @media (max-width: 658px) {
      width: 100%;
      height: 90px;
    }
    @media (max-width: 514px) {
      width: 90%;
      height: 180px;
    }
  }
`;


// MainContainer
const MainInfoBannerBox = styled(Box)`
  
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

const CategoryGrid = styled(Grid)`
  /* position: relative; */
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 10rem;

  @media (max-width: 514px) {
      gap: 2rem;
    }
`;


const MainCategoryCard = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(30% + .5rem);
  height: auto;
  background: #fff;
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 2rem 1rem;
  
    @media (max-width: 514px) {
      width:86%;
    }
`;


const CardInContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding-top: 2rem;
  
  .button-bot-line {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .button-right-line {
    position: absolute;
    right:4.5%;
    bottom:-8.15%;
    height: 75%;
    transform: rotate(-40deg);
  }
`;
const FooterContainer = styled(Box)`
  position: absolute;
  bottom:0;
  width: 100%;
  height: 300px;
  background: #c53736;
  overflow: hidden;

  //23.07.26 **미디어 쿼리 기준**
  @media (max-width: 1500px) {
    height: 270px;
    }
  @media (max-width: 1080px) { 
    height: 240px;
    }
  @media (max-width: 868px) { 
    height: 210px;
    }
    @media (max-width: 658px) {
      height: 180px;
    }
    @media (max-width: 514px) {
      height: 120px;
    }
`;
const FooterWord = styled(Box)`
  position: absolute;
  right: 10%;
  bottom: 0%;
  font-size: 15rem;
  font-weight: bold;
  color: #e34546;
  transform: rotate(-15deg);
  @media (max-width: 1500px) {
   font-size: 12rem;
    }
  @media (max-width: 1080px) { 
   font-size: 10rem;
    }
  @media (max-width: 868px) { 
   font-size: 8rem;
    }
    @media (max-width: 658px) {
     font-size: 6rem;
    }
    @media (max-width: 514px) {
     font-size: 5rem;
    }
`;


export default MainPage;
