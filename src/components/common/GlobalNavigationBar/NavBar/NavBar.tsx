import styled from '@emotion/styled';
import styles from '@styles/common.module.scss';
import Link from 'next/link';
import { DropdownItem } from '@components/common/GlobalNavigationBar/NavBar/DropdownItem/DropdownItem';

export function NavBar() {
  return (
    <nav className={styles.globalContainer}>
      <ContentContainer>
        <NavContainer>
          <DropdownItem/>
          <Link href="/">
            <a>네비게이션2</a>
          </Link>
          <Link href="/">
            <a>네비게이션3</a>
          </Link>
          <Link href="/">
            <a>네비게이션4</a>
          </Link>
          <Link href="/">
            <a>네비게이션5</a>
          </Link>
          <Link href="/">
            <a>네비게이션6</a>
          </Link>
          <Link href="/">
            <a>네비게이션7</a>
          </Link>
        </NavContainer>
      </ContentContainer>
    </nav>
  );
}

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding-bottom: 12px;
`;


const NavContainer = styled.div`
  display: flex;
  align-content: center;

  a {
    margin-left: 16px;

    &:first-child {
      margin-left: 0;
    }
  }
`;
