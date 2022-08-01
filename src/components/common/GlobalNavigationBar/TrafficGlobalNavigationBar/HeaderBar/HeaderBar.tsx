import styled from '@emotion/styled';
import styles from '@styles/common.module.scss';
import { Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Link, Searchbar } from '@components/common';
import { grey } from '@mui/material/colors';
import * as React from 'react';
import { useIsLoginStatus } from '@hooks/useIsLoginStatus';
import { useMyUser, UserRole } from '@common/api/user';
import { AccountMenu } from '@components/ui';
import Image from 'next/image';
import { NavBar, NavBarV2 } from '../NavBar';

export function HeaderBar() {
  const router = useRouter();
  const isLogin = useIsLoginStatus();
  const { user } = useMyUser();

  return (
    <Header className={styles.globalContainer}>
      <ContentContainer>
        <Link href="/" underline="none">
          <Image src="/assets/images/cttsLogo.png" height={24} width={160} alt="Your Name" />
        </Link>
        {/* <Link href="/" underline="none" color={grey[800]}>
          <TitleTypography>충남교통연수원</TitleTypography>
        </Link> */}
        {/* <NavContainer>
          <Link
            href="/"
            underline="none"
            color={router.pathname === '/' ? 'primary' : grey[800]}
          >
            <Typography variant="h6" className="bold-600">강의</Typography>
          </Link>
        </NavContainer> */}
        {/* <SearchbarContainer>
          <Searchbar />
        </SearchbarContainer> */}
        {/* <NavBar></NavBar> */}
        <NavBarV2 />

        <RightSection>
          {!isLogin ? (
            <div>
              <Link href="/admin-center/apply-tutor" underline="none">
                <Button className="align-left" color="neutral">
                  튜터 지원
                </Button>
              </Link>
              <Link href="/traffic/sign-in" underline="none">
                <Button className="align-left" color="neutral">
                  로그인
                </Button>
              </Link>
            </div>
          ) : (
            <Stack direction="row" alignItems="center">
              {!!user?.roles?.length &&
              user.roles.some(
                role =>
                  role === UserRole.ROLE_ADMIN || role === UserRole.ROLE_TRANS_MANAGER || role === UserRole.ROLE_TRAFFIC_SAFETY_MANAGER
              ) ? (
                <Link href="/admin-center/dashboard" underline="none">
                  <Button className="align-left" color="neutral" size="large">
                    관리 센터
                  </Button>
                </Link>
              ) : null}
              <AccountMenu />
            </Stack>
          )}
        </RightSection>
      </ContentContainer>
    </Header>
  );
}

const Header = styled.header`
  width: 100%;
  height: 100%;
`;

const TitleTypography = styled(Typography)`
  /* box-sizing: border-box;
  border: 1px solid black; */
  color: black;
  width: 150px;
  font-weight: bold;
  font-size: 1.3rem;
  white-space: nowrap;
  margin-left: 50px;
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

  a:not(:first-of-type) {
    margin-left: 16px;
  }

  .bold-600 {
    font-weight: 600;
  }
`;

const SearchbarContainer = styled.div`
  padding: 0 0 0 36px;
`;

const RightSection = styled.div`
  margin-left: auto;
`;