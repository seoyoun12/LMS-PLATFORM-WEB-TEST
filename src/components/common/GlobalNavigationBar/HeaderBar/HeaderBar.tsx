import styled from '@emotion/styled';
import styles from '@styles/common.module.scss';
import { Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Link, Searchbar } from '@components/common';
import { grey } from '@mui/material/colors';
import * as React from 'react';
import { useIsLoginStatus } from '@hooks/useIsLoginStatus';
import { useEffect, useState } from 'react';
import { getMyUser } from '@common/api/user';
import { AccountMenu } from '@components/ui';

export function HeaderBar() {
  const router = useRouter();
  const isLogin = useIsLoginStatus();
  const [ myUser, setMyUser ] = useState({});


  useEffect(() => {
    (async () => {
      const res = await getMyUser();
      setMyUser(res);
    })();
  }, [ myUser ]);

  return (
    <Header className={styles.globalContainer}>
      <ContentContainer>
        <img
          src="/assets/images/logo.png"
          height={24}
          alt="Your Name"
        />
        <NavContainer>
          <Link
            href="/"
            underline="none"
            color={router.pathname === '/' ? 'primary' : grey[800]}
          >
            <Typography variant="h6" className="bold-600">클래스</Typography>
          </Link>
          <Link
            href="/link2"
            underline="none"
            color={router.pathname === '/link2' ? 'primary' : grey[800]}
          >
            <Typography variant="h6" className="bold-600">Link2</Typography>
          </Link>
        </NavContainer>
        <SearchbarContainer>
          <Searchbar/>
        </SearchbarContainer>
        <RightSection>
          {!isLogin ? (
            <div>
              <Link href="/apply-tutor" underline="none">
                <Button
                  className="align-left"
                  color="neutral"
                >튜터 지원</Button>
              </Link>
              <Link href="/sign-in" underline="none">
                <Button
                  className="align-left"
                  color="neutral"
                >로그인</Button>
              </Link>
            </div>
          ) : (
            <Stack
              direction="row"
              alignItems="center"
            >
              <Link href="/apply-tutor" underline="none">
                <Button
                  className="align-left"
                  color="neutral"
                >튜터 센터</Button>
              </Link>
              <AccountMenu/>
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

  a:not(:first-child) {
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
