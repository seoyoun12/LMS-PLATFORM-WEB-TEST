import styled from '@emotion/styled';
import styles from '@styles/common.module.scss';
import { Box, Stack } from '@mui/material';
import { Link } from '@components/common';
import { useIsLoginStatus } from '@hooks/useIsLoginStatus';
import { useMyUser, UserRole } from '@common/api/user';
import { AccountMenu } from '@components/ui';
import Image from 'next/image';
import { NavBarV2 } from '../NavBar';
import SigninIcon from '/public/assets/svgs/signin.svg';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


const hideNavList = [
  { href: '/terms' },
];

export function HeaderBar() {
  const router = useRouter();
  const [isHideNavbar, setIsHideNavbar] = useState(false);
  const isLogin = useIsLoginStatus();
  const { user } = useMyUser();
  
  useEffect(() => {
    if (router.route === '/') {
      setIsHideNavbar(true);
    } else {
      const hide = hideNavList.some(e => router.route.includes(e.href));
      setIsHideNavbar(hide);
    }
  }, [router]);

  return (
    <Header className={styles.globalContainer}>
      <ContentContainer>
        <Link
          href="/"
          underline="none"
          height="100%"
          flexBasis={230}
          display="flex"
          alignItems="center"
        >
          <Image
            src="/assets/images/ctsoecLogo.png"
            height={40}
            width={230}
            alt="Your Name"
          />
        </Link>
       
        {!isHideNavbar && <NavBarV2 /> }

        {!isHideNavbar && 
        <RightSection>
          {!isLogin ? (
            <SignBoxes>
              <Link
                href="/sign-in"
                underline="none"
                display="flex"
                alignItems="center"
                width="80px"
              >
                <SigninIcon />
                <Box color="black" fontWeight="bold" ml={1}>
                  로그인
                </Box>
              </Link>
            </SignBoxes>
          ) : (
            <Stack direction="row" alignItems="center">
              {!!user?.roles?.length &&
              user.roles.some(
                role =>
                  role === UserRole.ROLE_ADMIN ||
                  role === UserRole.ROLE_TRANS_MANAGER ||
                  role === UserRole.ROLE_TRAFFIC_SAFETY_MANAGER
              )
                ? ''
                : null}
              <AccountMenu />
            </Stack>
          )}
        </RightSection>
        }
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
  max-width: 1200px;
  margin: auto;

  @media screen and (min-width: 640px) {
    height: 56px;
  }

  @media screen and (min-width: 1024px) {
    height: 78px;
  }
`;

const SignBoxes = styled(Box)`
  display: flex;
`;

const RightSection = styled.div`
  flex-basis: 200px;
`;
