import type { NextPage } from 'next';
import styles from '@styles/common.module.scss';
import * as React from 'react';
import styled from '@emotion/styled';
import { ContentCard } from '@components/ui';
import cn from 'clsx';

const MainPage: NextPage = (res) => {
  return (
    <Host>
      <BannerContainer>
        <div className={styles.globalContainer}>
          <img
            src="/assets/images/banner.jpg" alt=""
            width="676px"
          />
        </div>
      </BannerContainer>
      <div className={cn(styles.globalContainer, 'padding-top')}>
        <ContentCardContainer>
          {[ 0, 0, 0, 0 ].map((v, idx) => (
            <ContentCard key={idx}/>
          ))}
        </ContentCardContainer>
        <ContentCardContainer>
          {[ 0, 0, 0, 0 ].map((v, idx) => (
            <ContentCard key={idx}/>
          ))}
        </ContentCardContainer>
        <ContentCardContainer>
          {[ 0, 0, 0, 0 ].map((v, idx) => (
            <ContentCard key={idx}/>
          ))}
        </ContentCardContainer>
      </div>
    </Host>
  );
};

const Host = styled.div`
  .padding-top {
    padding: 76px 0;
  }
`;

const BannerContainer = styled.div`
  display: flex;
  width: 100%;
  background: linear-gradient(270.44deg, rgb(255, 122, 0) 0.21%, rgba(255, 122, 0, 0.4) 99.18%) 0% 0% / 100%;
  margin-bottom: 32px;

  img {
    padding-right: 16px;
    position: relative;
    top: 32px;
  }
`;

const ContentCardContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 32px;

  > *:not(:last-child) {
    margin-right: 24px;
  }
`;

export default MainPage;
