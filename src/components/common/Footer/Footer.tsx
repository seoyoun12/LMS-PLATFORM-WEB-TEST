import { FC } from 'react';
import styles from '@styles/common.module.scss';
import s from './Footer.module.scss';
import styled from '@emotion/styled';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';

interface Props {
  className?: string;
}

export const Footer: FC<Props> = () => {
  return (
    <footer className={s.root}>
      <div className={styles.globalContainer}>
        <ContentContainer>
          <IntroductionSection>
            <div className="logo">러닝핏</div>
            <Typography variant="body1" className="desc">
              미림미디어랩은 교육을 통하여 <br/>
              평등한 세상을 구현하고자 합니다.
            </Typography>
          </IntroductionSection>
          <ContentItem className="m-l-auto">
            <Typography variant="h6" className="desc">러닝핏</Typography>
            <Link href="/">
              <Button className="align-left" color="neutral" href="#text-buttons">홈</Button>
            </Link>
            <Link href="/">
              <Button className="align-left" color="neutral" href="#text-buttons">기업교육</Button>
            </Link>
            <Link href="/">
              <Button className="align-left" color="neutral" href="#text-buttons">채용</Button>
            </Link>
            <Link href="/">
              <Button className="align-left" color="neutral" href="#text-buttons">도움말</Button>
            </Link>
          </ContentItem>
          <ContentItem>
            <Typography variant="h6" className="logo">튜터</Typography>
            <Link href="/">
              <Button className="align-left" color="neutral" href="#text-buttons">튜터 센터</Button>
            </Link>
            <Link href="/">
              <Button className="align-left" color="neutral" href="#text-buttons">정큐 과정 지원하기</Button>
            </Link>
            <Link href="/">
              <Button className="align-left" color="neutral" href="#text-buttons">원포인트 과정 지원하기</Button>
            </Link>
            <Link href="/">
              <Button className="align-left" color="neutral" href="#text-buttons">도움말</Button>
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
  padding-top: 24px;
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
