import styled from '@emotion/styled';
import styles from '@styles/common.module.scss';
import { DropdownItem } from '@components/common/GlobalNavigationBar/NavBar/DropdownItem/DropdownItem';
import { grey } from '@mui/material/colors';
import { Typography } from '@mui/material';
import { Link } from '@components/common';

export function NavBar() {
  return (
    <nav className={styles.globalContainer}>
      <ContentContainer>
        <NavContainer>
          <DropdownItem className="dropdown"/>
          <Link
            href="/me"
            underline="none"
            color={grey[800]}
          >
            <Typography variant="subtitle2" className="bold-600">마이페이지</Typography>
          </Link>
          <Link
            href="/"
            underline="none"
            color={grey[800]}
          >
            <Typography variant="subtitle2" className="bold-600">학습지원</Typography>
          </Link>
          {/* <Link
            href="/"
            underline="none"
            color={grey[800]}
          >
            <Typography variant="subtitle2" className="bold-600">네비게이션3</Typography>
          </Link>
          <Link
            href="/"
            underline="none"
            color={grey[800]}
          >
            <Typography variant="subtitle2" className="bold-600">네비게이션4</Typography>
          </Link>
          <Link
            href="/"
            underline="none"
            color={grey[800]}
          >
            <Typography variant="subtitle2" className="bold-600">네비게이션5</Typography>
          </Link>
          <Link
            href="/"
            underline="none"
            color={grey[800]}
          >
            <Typography variant="subtitle2" className="bold-600">네비게이션6</Typography>
          </Link>
          <Link
            href="/"
            underline="none"
            color={grey[800]}
          >
            <Typography variant="subtitle2" className="bold-600">네비게이션7</Typography>
          </Link> */}
        </NavContainer>
      </ContentContainer>
    </nav>
  );
}

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  /* padding-bottom: 12px; */

  .bold-600 {
    font-weight: 600;
  }
`;


const NavContainer = styled.div`
  display: flex;
  align-items: center;
  
  .dropdown {
    margin-right: 30px;
  }

  a {
    margin-right: 24px;

    &:first-of-type {
      margin-left: 0;
    }
  }
`;
