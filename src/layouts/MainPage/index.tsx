import type { NextPage } from "next";
import styles from "@styles/common.module.scss";
import * as React from "react";
import styled from "@emotion/styled";
import { ContentCard, Carousel } from "@components/ui";
import cn from "clsx";

const MainPage: NextPage = (res) => {
  const bannerData = [
    {
      id: 1,
      img: "/assets/images/banner.jpg",
      title: "test 1",
      description: "description 1",
    },
    {
      id: 2,
      img: "/assets/images/banner.jpg",
      title: "test 2",
      description: "description 2",
    },
    {
      id: 3,
      img: "/assets/images/banner.jpg",
      title: "test 3",
      description: "description 3",
    },
  ];
  return (
    <Host>
      <Carousel datas={bannerData} />
      <div className={cn(styles.globalContainer, "padding-top")}>
        <ContentCardContainer>
          {[0, 0, 0, 0].map((v, idx) => (
            <ContentCard key={idx} />
          ))}
        </ContentCardContainer>
        <ContentCardContainer>
          {[0, 0, 0, 0].map((v, idx) => (
            <ContentCard key={idx} />
          ))}
        </ContentCardContainer>
        <ContentCardContainer>
          {[0, 0, 0, 0].map((v, idx) => (
            <ContentCard key={idx} />
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
  background: linear-gradient(
      270.44deg,
      rgb(255, 122, 0) 0.21%,
      rgba(255, 122, 0, 0.4) 99.18%
    )
    0% 0% / 100%;
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
