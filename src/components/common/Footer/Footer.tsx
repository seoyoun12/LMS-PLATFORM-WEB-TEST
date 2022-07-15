import { FC, useEffect, useState } from 'react';
import styles from '@styles/common.module.scss';
import s from './Footer.module.scss';
import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import { Link } from '@components/common';
import { useRouter } from 'next/router';

interface Props {
  className?: string;
}

const hideNavList = [
  { href: '/admin-center' },
  // { href: '' } // 메인에서 제거
];

export const Footer: FC<Props> = () => {
  const router = useRouter();
  const [ isHideFooter, setIsHideFooter ] = useState(false);

  useEffect(
    () => {
      const hide = hideNavList.some(e => router.route.includes(e.href));
      setIsHideFooter(hide);
    },
    [ router ]
  );

  if (isHideFooter) return null;
  return (
    <footer className={s.root}>
      <div className={styles.globalContainer}>
        <ContentContainer>
          <IntroductionSection>
            <div className="logo">충남교통연수원</div>
            <Typography variant="body1" className="desc">
              충남교통연수원 <br/>
              충남교통연수원
            </Typography>
          </IntroductionSection>
          <ContentItem className="m-l-auto">
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
          </ContentItem>
        </ContentContainer>
      </div>
    </footer>
  );
};

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 224px;
`;

const ContentItem = styled.div`
  display: flex;
  flex-grow: 0;
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;
  width: 100%;
  max-width: 272px;

  &.m-l-auto {
    margin-left: auto;
  }

  h6 {
    padding-left: 8px;
    margin-bottom: 8px;
  }

  .align-left {
    justify-content: flex-start;
  }
`;

const IntroductionSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-basis: 398px;
  flex-shrink: 0;

  .logo {
    font-size: 26px;
    font-weight: 700;
  }

  .desc {
    margin-top: 20px;
  }
`;
