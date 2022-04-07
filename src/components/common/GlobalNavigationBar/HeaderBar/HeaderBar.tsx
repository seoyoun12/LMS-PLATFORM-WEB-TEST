import styled from '@emotion/styled';
import styles from '@styles/common.module.scss';
import Link from 'next/link';

export function HeaderBar() {
  return (
    <Header className={styles.globalContainer}>
      <ContentContainer>
        <img
          src="/assets/images/logo.png"
          height={24}
          alt="Your Name"
        />
        <NavContainer>
          <Link href="/">
            <a>Link1</a>
          </Link>
          <Link href="/">
            <a>Link2</a>
          </Link>
          <Link href="/">
            <a>Link3</a>
          </Link>
        </NavContainer>
      </ContentContainer>
    </Header>
  );
}

const Header = styled.header`
  width: 100%;
  height: 100%;
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
