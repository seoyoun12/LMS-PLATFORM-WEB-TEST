import { FC, useEffect, useState } from 'react';
import styles from '@styles/common.module.scss';
import styled from '@emotion/styled';
import { Container, Grid, Typography } from '@mui/material';
import { Link } from '@components/common';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import useResponsive from '@hooks/useResponsive';
import Logo from '/public/assets/svgs/logo.svg';
import HomeIcon from '@mui/icons-material/Home';
import Image from 'next/image';

const LinkList = [
  {
    href: 'https://www.ctti.or.kr/kor/page.do?menuIdx=185&bbscd=0&tcd=0',
    name: '개인정보처리방침',
  },
  {
    href: 'https://www.ctti.or.kr/kor/page.do?menuIdx=186&bbscd=0&tcd=0',
    name: '이메일무단수집거부',
  },
  {
    href: 'https://www.ctti.or.kr/kor/page.do?menuIdx=339&bbscd=0&tcd=0',
    name: '이용약관',
  },
  {
    href: 'https://www.ctti.or.kr/kor/page.do?menuIdx=130&bbscd=0&tcd=0',
    name: '찾아오시는길',
  },
];

interface Props {
  className?: string;
}

const hideNavList = [
  { href: '/admin-center' },
  // { href: '' } // 메인에서 제거
  { href: '/sign-up' },
  { href: '/course' },
];

const Footer: FC<Props> = () => {
  const router = useRouter();
  const [isHideFooter, setIsHideFooter] = useState(false);
  const isTablet = !useResponsive();

  useEffect(() => {
    if (router.route === '/') {
      setIsHideFooter(true);
    } else {
      const hide = hideNavList.some(e => router.route.includes(e.href));
      setIsHideFooter(hide);
    }
  }, [router]);

  if (isHideFooter) return null;
  return (
    <FooterWrap>
      {!isTablet && (
        <PCLinksFooter>
          <Container
            sx={{
              display: 'flex',
              height: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box width="260px">
              {/* <Link href="https://www.ctti.or.kr"> */}
              {/* <Logo /> */}
              <Image
                src="/assets/images/greyCttiLogo.png"
                height={46}
                width={260}
                alt="Your Name"
              />
              {/* </Link> */}
            </Box>
            <Box display="flex" gap={2}>
              {LinkList.map(item => (
                <Link
                  className="uplineFoot"
                  href={item.href}
                  color="#000"
                  fontWeight="bold"
                  key={item.name}
                >
                  {item.name}
                </Link>
              ))}
            </Box>
          </Container>
        </PCLinksFooter>
      )}
      <Hrhrhrhrhr />
      <div className={styles.globalContainer}>
        <ContentContainer>
          {/* <IntroductionSection> */}
          {/* <div className="logo">충남교통연수원</div> */}
          {/* <Typography variant="body1" className="desc">개인정보처리방침</Typography>
            <Typography variant="body1" className="desc">1</Typography>
            <Typography variant="body1" className="desc">1</Typography>
            <Typography variant="body1" className="desc">1</Typography> */}
          {/* </IntroductionSection> */}

          <UplineFootConatainer>
            {isTablet &&
              LinkList.map(item => (
                <Link
                  className="uplineFoot"
                  key={item.name}
                  href={item.href}
                  color="#000"
                >
                  {item.name}
                </Link>
              ))}
          </UplineFootConatainer>

          <DownLineFootConatainer>
            <span>
              <a
                href={`https://www.ctti.or.kr/`}
                target="_blank"
                className="move-chungnam"
              >
                <HomeIcon />
                충청남도교통연수원 바로가기
              </a>
            </span>
            <Typography className="boldTypo">
              [32589] 충청남도 공주시 연수원길 83 (금흥동 110-2)
            </Typography>
            <FirstBox>
              <Typography className="boldTypo">
                교육문의(연수과) : 041.854.2101~2 | 임대문의(총무과) : 041.854.2106 |
                연수원 운영문의 : 041.854.2107
              </Typography>
            </FirstBox>
            <SecondBox>
              <Typography className="boldTypo">
                Copyright ⓒ 2022 Chungcheongnamdo Traffic Training Institute All Rights
                Reserved.
              </Typography>
            </SecondBox>
          </DownLineFootConatainer>
        </ContentContainer>
      </div>
    </FooterWrap>
  );
};

const FooterWrap = styled.footer``;

const PCLinksFooter = styled(Box)`
  background: #fbfbfb;
  border-top: 2px solid #ebebeb;
  border-bottom: 2px solid #ebebeb;
  height: 80px;
  padding: 0 12px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding-top: 224px; */
  /* box-sizing: border-box;
  border: 1px solid black; */
  margin-bottom: 20px;
  overflow: hidden;

  .boldTypo {
    font-weight: 500;
    font-size: 0.95rem;
  }
  @media (max-width: 1200px) {
    text-align: center;
  }
`;

const UplineFootConatainer = styled(Grid)`
  /* box-sizing: border-box;
  border: 1px solid black; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  height: 50%;
  /* position: relative;
  float: left; */
  margin-bottom: 30px;
  margin-top: 15px;

  .uplineFoot {
    margin-right: 20px;
    font-weight: bold;
    font-size: 1.05rem;
  }
`;

const DownLineFootConatainer = styled.div`
  /* box-sizing: border-box;
  border: 1px solid black; */
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
  /* float: left;
  position: relative; */
  .move-chungnam {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    /* width: 100%; */
    // margin: 'auto',
  }
  @media (max-width: 1200px) {
    .move-chungnam {
      display: flex;
      align-items: center;
      justify-content: center;
      /* width: 100%; */
      // margin: 'auto',
    }
  }
`;

const FirstBox = styled(Box)`
  margin-bottom: 20px;
`;

const SecondBox = styled(Box)`
  float: left;
`;

const Hrhrhrhrhr = styled.hr`
  opacity: 30%;
  margin: 0;
`;

// const ContentItem = styled.div`
//   display: flex;
//   flex-grow: 0;
//   flex-direction: column;
//   justify-content: center;
//   margin-left: 12px;
//   width: 100%;
//   max-width: 272px;

//   &.m-l-auto {
//     margin-left: auto;
//   }

//   h6 {
//     padding-left: 8px;
//     margin-bottom: 8px;
//   }

//   .align-left {
//     justify-content: flex-start;
//   }
// `;

// const IntroductionSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   flex-basis: 398px;
//   flex-shrink: 0;

//   .logo {
//     font-size: 26px;
//     font-weight: 700;
//   }

//   .desc {
//     margin-top: 20px;
//   }
// `;

export default Footer;
