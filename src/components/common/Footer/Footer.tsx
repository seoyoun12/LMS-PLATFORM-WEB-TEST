import { FC, useEffect, useState } from 'react';
import styles from '@styles/common.module.scss';
import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import { Link } from '@components/common';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';

interface Props {
  className?: string;
}

const hideNavList = [
  { href: '/admin-center' },
  // { href: '' } // 메인에서 제거
  { href: '/sign-up' },
];

export const Footer: FC<Props> = () => {
  const router = useRouter();
  const [isHideFooter, setIsHideFooter] = useState(false);

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
    <footer>
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
            <Link
              className="uplineFoot"
              href="https://www.ctti.or.kr/kor/page.do?menuIdx=185&bbscd=0&tcd=0"
            >
              개인정보처리방침
            </Link>
            <Link
              className="uplineFoot"
              href="https://www.ctti.or.kr/kor/page.do?menuIdx=186&bbscd=0&tcd=0"
            >
              이메일무단수집거부
            </Link>
            <Link
              className="uplineFoot"
              href="https://www.ctti.or.kr/kor/memberClause.do?menuIdx=182"
            >
              이용약관
            </Link>
            <Link
              className="uplineFoot"
              href="https://www.ctti.or.kr/kor/page.do?menuIdx=130&bbscd=0&tcd=0"
            >
              찾아오시는길
            </Link>
          </UplineFootConatainer>

          <DownLineFootConatainer>
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

          {/* <RightFootContainer></RightFootContainer> */}

          {/* <ContentItem className="m-l-auto">
            <Typography variant="h6" className="desc">충남교통연수원</Typography>
            <Link href="/" underline="none">
              <Button className="align-left" color="neutral">TEST1</Button>
            </Link>
            <Link href="/" underline="none">
              <Button className="align-left" color="neutral">TEST2</Button>
            </Link>
            <Link href="/" underline="none">
              <Button className="align-left" color="neutral">TEST3</Button>
            </Link>
            <Link href="/" underline="none">
              <Button className="align-left" color="neutral">TEST4</Button>
            </Link>
          </ContentItem>
          <ContentItem>
            <Typography variant="h6" className="logo">충남교통연수원</Typography>
            <Link href="/" underline="none">
              <Button className="align-left" color="neutral">TEST5</Button>
            </Link>
            <Link href="/" underline="none">
              <Button className="align-left" color="neutral">TEST6</Button>
            </Link>
            <Link href="/" underline="none">
              <Button className="align-left" color="neutral">TEST7</Button>
            </Link>
            <Link href="/" underline="none">
              <Button className="align-left" color="neutral">TEST8</Button>
            </Link>
          </ContentItem> */}
        </ContentContainer>
      </div>
    </footer>
  );
};

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
  width: 100%;
  height: 50%;
  /* position: relative;
  float: left; */
  margin-bottom: 30px;
  margin-top: 15px;

  .uplineFoot:first-of-type {
    color: #1c80dc;
  }

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
`;

const FirstBox = styled(Box)`
  margin-bottom: 20px;
`;

const SecondBox = styled(Box)`
  float: left;
`;

const Hrhrhrhrhr = styled.hr`
  opacity: 30%;
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
