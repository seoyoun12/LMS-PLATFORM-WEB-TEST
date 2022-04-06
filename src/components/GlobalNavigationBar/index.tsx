import styled from 'styled-components';
import styles from '@styles/common.module.scss';
import Link from 'next/link';

export function GlobalNavigationBar() {
  return (
    <Header>
      <ContentContainer className={styles.globalContainer}>
        <img
          src="/assets/images/logo.png"
          height={24}
          alt="Your Name"
        />
        <NavContainer>
          <Link href="/">
            <a>네비게이션1</a>
          </Link>
          <Link href="/">
            <a>네비게이션2</a>
          </Link>
          <Link href="/">
            <a>네비게이션3</a>
          </Link>
        </NavContainer>
      </ContentContainer>
    </Header>
  );
}

const Header = styled.header`
  border-radius: 0;
  width: 100%;
  height: auto;
  background-color: #FFFFFF;
  border-color: #E5E5E5;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 101;
  box-shadow: rgb(0 0 0 / 4%) 0px 1px 0px 0px;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  @media screen and (min-width: 640px) {
    height: 56px;
  }

  @media screen and (min-width: 1024px) {
    height: 78px;
  }
`;

const NavContainer = styled.div`
  display: flex;
  align-content: center;
  margin-left: 20px;

  a {
    margin-left: 16px;
  }
`;
