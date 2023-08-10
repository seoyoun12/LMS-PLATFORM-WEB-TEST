import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Spinner } from '@components/ui';
import { Box, Button, Typography } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import { MainDisplayType, useMainDisplay } from '@common/api/mainDisplay';
import { pageRegType } from '@common/recoil/pageType/atom';
import { useRouter } from 'next/router';
import { courseType } from '@common/api/courseClass';
import { logout } from '@common/api';
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
  const { data } = useMainDisplay();
  
  if (!data) return <Spinner />;
  return (
    <>
    <Head>
      <title>충남교통연수원</title>
    </Head>
    
    <Wrapper>
      
        <MainInfoBannerBox>
            <LogoBox>
              <Image
                src="/assets/images/cttiLogo.png"
                height={48}
                width={320}
                alt="충남교통연수원 로고"
              />
            </LogoBox>
            <SubTitle>
              <Typography className='word'>충남 교통안전&nbsp;</Typography>
              <Typography className='word accent-word'>온라인교육센터</Typography>
            </SubTitle>
            <InfoBanner>
              <ol>
                <li>
                본 온라인 과정은{' '}
                <span className='accent-word'>차량등록지가 충남 또는 세종시 운수종사자에 해당되는 교육</span>
                으로 타시∙도 차량은 교육을 이수할 수 없습니다.
                </li>
                <li>
                  <span className='accent-word'>운전 중 교육을 진행할 경우{' '}</span>
                  안전을 위해 {' '}
                  <span className='accent-word'>교육이 중단</span>
                  됩니다.
                </li>
                <li>
                  온라인 교육은 네트워크 상태에 따라 데이터 요금이 발생할 수 있습니다.
                  <span className='accent-word'>(Wi-Fi 사용 권장)</span>
                </li>
              </ol>
            </InfoBanner>
          </MainInfoBannerBox> 
            <CardContainer >
              {data.map(item => {
                if (item.status === 1) {
                  const { href,color,textColor,displayWord,imgPath,lineColor,onClickCard } =
                  LinkList.filter(filter => filter.mainDisplayType === item.mainDisplayType)[0];
                  return (
                    <MainCategoryCard bgColor={color}>
                      <Box
                        sx={{
                        cursor: 'pointer',
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        flexDirection:'column'
                        }}
                        onClick={() => {
                          onClickCard();
                          router.push(href);
                        }}
                      >
                        <Box
                          margin='0 1rem'
                        >
                          <Image
                            src={imgPath}
                            width={320}
                            height={180}
                            // style={{ aspectRatio: '16 / 9'}}
                            objectFit='fill'
                            alt='메인 카드 이미지'
                          />
                        </Box>
                        <CardText>
                          <Box>
                            <Typography
                              component="span"
                              fontWeight="bold"
                              color={textColor}
                              className='category-card-title'
                            >
                              {displayWord}
                            </Typography>
                            <Typography
                              component="span"
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
                        </CardText>
                      </Box>
                    </MainCategoryCard>
                  );
                }
              })}
            </CardContainer>
        
        <FooterContainer>
        <FooterWord>CTTI</FooterWord>
      </FooterContainer>
    </Wrapper>
  </>
  );
};
// Wrap
const Wrapper = styled.div`
  position:relative;
  display: flex;
  flex-direction: column;
  
  align-items: center;
  width: 100%;
  min-height: 100vh;
  height: auto;
  margin: 0 auto;
  .MuiButton-root.MuiButton-textNeutral:hover {
    background-color: #fff;
  }
  .MuiButton-root.MuiButton-textNeutral {
    width: 100%;
  }

  .category-card-title {
    font-size: 2rem;

    @media (max-width: 1500px) {
      font-size: 1.5rem;
    }
    @media (max-width: 1080px) {
      font-size: 1.25rem;
    }
    @media (max-width: 570px) {
      font-size: 1rem;
    }
  }
  
`;
const InfoBanner = styled.div`
  width: 60rem;
  min-height: 480px;
  background-size: contain;
  background-image: url('assets/images/hub_centerbox.png');
  background-repeat: no-repeat;
  padding: 2rem;
  ol {
  margin: 1.25rem auto;
  width: 51rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  list-style: disc;
  font-weight: bold;
  line-height: 1.15;
  }
  .accent-word {
    font-weight: bold;
    color: #f41;
  }
  li {
    font-size: 1.15rem;
  }
  @media (max-width: 1280px) {
    width: 54rem;
    min-height: 420px;
    ol {
      margin: 0.5rem auto;
      width: 45rem;
        li{
        font-size: 1.1rem;
        line-height: 1.25;
      }
    }
  }
  @media (max-width: 1080px) {
    width: 49rem;
    min-height: 450px;
    ol {
      width: 44rem;
      margin: 0.25rem auto;
      margin-left: 1rem;
      
        li{
        font-size: 1rem;
        line-height: 1.3;
      }
    }
  }

  @media (max-width: 868px) {
    width: 45rem;
    min-height: 360px;
    /* margin-top: 5rem; */
    
    ol {
      margin: 0.25rem auto;
      margin-left: .75rem;
      width: 40rem;
        li{
        font-size: .85rem;
        line-height: 1.15;
      }
    }
  }
  @media screen and (max-width: 684px) {
    width: 100%;
    min-height: 240px;
    background-image: url('assets/images/hub_mobile_centerbox.png');
    background-size: 100% 100%;
    
    ol {
    margin: 1rem;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    margin-top: 2.5rem;
    gap: 1.5rem;
    padding: .75rem;
      li {
        font-weight: 400;
        width: 100%;
        font-size: 1.2rem;
        line-height: 1.6;
      }
    }
    
  }
`

const MainInfoBannerBox = styled.div`
  width: 90%;
  margin: .25rem auto;
  gap: .5rem;
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items:center;
  flex-direction: column;
`;


const LogoBox = styled(Box)`
  padding-top: 1rem;
  width: fit-content;
  margin: auto;
`;

const SubTitle = styled(Box)`
  font-size: 18px;
  
  padding: 0.5rem 2.5rem;
  text-align: center;
  width: fit-content;
  margin: auto;
  margin-top: 30px;
  /* color: white; */
  background: #f7f7f7;
  border: 1px solid #236cef;
  border-radius: 24px;
  display: flex;
   .word {
    font-weight: bold;
   }
    .accent-word {
      color: #236cef;
    }
  @media (max-width: 1500px) {
    .word {
    font-weight: bold;
    font-size: 18px;
   }
    
    }
  @media (max-width: 868px) { 
    .word {
    font-weight: bold;
    font-size: 16px;
   }
    }
    @media (max-width: 658px) {
      .word {
    font-weight: bold;
    font-size: 14px;
   }
    }
    @media (max-width: 514px) {
      .word {
    font-weight: bold;
    font-size: 12px;
   }
    }
`;

const CardContainer = styled.div`
  position:absolute;
  bottom: 0;
  left: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  gap: 2rem;
  @media (max-width: 684px) {
    bottom: -48px;
    position: relative;
    flex-direction: column; 
    width: 100%;
    left:0;
    right:0;
    transform: translate(0, 0);
  }
`;

const MainCategoryCard = styled.div<{bgColor: string}>`
  width: 300px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  z-index: 1;
  padding: 2rem 0;
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.2);
  border-top: ${(props) => (props.bgColor ? `7px solid ${props.bgColor}` : 'black')};
  
  @media screen and (max-width: 514px) {
    min-width: 348px;
  }
`;

const CardText = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding-top: 2rem;
  
  .button-bot-line {

    position: absolute;
    left: 10%;
    bottom: 0;
    width: 80%;
  }
  .button-right-line {
    position: absolute;
    right:13.5%;
    bottom:-8.15%;
    height: 75%;
    transform: rotate(-40deg);
  }
`;
const FooterContainer = styled(Box)`
  position: relative;
  width: 100%;
  min-height: 300px;
  height: 20%;
  
  background: #c53736;
  overflow: hidden;
  z-index: -1;
`;
const FooterWord = styled(Box)`
  position:absolute;
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
