import styled from '@emotion/styled';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Drawer, Typography } from '@mui/material';
import Image from 'next/image';
import { Link } from '@components/common';
import { useEffect, useState } from 'react';
import { courseType } from '@common/api/courseClass';
import { ProvintialHeaderList } from '../TrafficGlobalNavigationBar/NavBar/NavBarV2';
import { TransHeaderList } from '../NavBar/NavBarV2';
import { Accordion } from '@components/ui';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import { SiteMap } from '../SiteMap';
import { useIsLoginStatus } from '@hooks/useIsLoginStatus';
import { logout } from '@common/api';
import { siteMapList } from '../SiteMap/SiteMap';
import { useRecoilState } from 'recoil';
import { userInfo } from '@common/recoil';
import { regCategoryType } from '@common/api/user';

const hideNavList = [
  // { href: '/course/[courseSeq]' },
  { href: '/admin-center' },
  // { href: '/'}
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isLoginStatus = useIsLoginStatus();
  const [userInfoData, setUserInfoData] = useRecoilState(userInfo);
  const [list, setList] = useState(
    (typeof window !== 'undefined' &&
    localStorage.getItem('site_course_type') === courseType.TYPE_PROVINCIAL
      ? ProvintialHeaderList
      : TransHeaderList
    ).map(item => {
      return {
        name: item.category,
        children: item.items.map(menuitem => {
          return { name: menuitem.title, href: menuitem.href };
        }),
      };
    })
  );
  const [isHideNavbar, setIsHideNavbar] = useState(false);

  useEffect(() => {
    if (router.route === '/') {
      setIsHideNavbar(true);
    } else {
      const hide = hideNavList.some(e => router.route.includes(e.href));
      setIsHideNavbar(hide);
    }

    setList(
      (typeof window !== 'undefined' &&
      localStorage.getItem('site_course_type') === courseType.TYPE_PROVINCIAL
        ? ProvintialHeaderList
        : TransHeaderList
      ).map(item => {
        return {
          name: item.category,
          children: item.items.map(menuitem => {
            return { name: menuitem.title, href: menuitem.href };
          }),
        };
      })
    );
  }, [router]);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    handleClose();
  }, [router]);

  const onClickSignin = () => {
    if (localStorage.getItem('site_course_type') === courseType.TYPE_PROVINCIAL) {
      router.push('/traffic/sign-in');
    } else {
      router.push('/sign-in');
    }
  };

  const onClickLogout = () => {
    logout();
    handleClose();
  };

  const onClickSitemap = (item: {
    name: string;
    href: string;
    type: courseType;
    regCategory: regCategoryType;
  }) => {
    const isEqual = userInfoData.regCategory.includes(item.regCategory);

    if (isLoginStatus && !isEqual) {
      const isConfirm = window.confirm('정말로 이동하시겠습니까? 로그아웃됩니다.');
      try {
        if (!isConfirm) return;
        logout();
        router.push(item.href);
        localStorage.setItem('site_course_type', item.type);
        return;
      } catch (e: any) {
        window.alert(e.data.message);
      }
    }
    router.push(item.href);
    localStorage.setItem('site_course_type', item.type);
  };

  return (
    <Header>
      {!isHideNavbar && (
        <MobileContentContainer>
          <Link
            href="/"
            underline="none"
            height="100%"
            display="flex"
            alignItems="center"
          >
            <Image
              src="/assets/images/cttsLogo.png"
              height={40}
              width={224}
              alt="Your Name"
            />
          </Link>
          <MenuIcon
            fontSize="large"
            sx={{ color: 'black ' }}
            onClick={() => setOpen(true)}
          />
          <Drawer open={open} anchor="right" onClose={handleClose} sx={{ zIndex: 1202 }}>
            <DrawerTopBox>
              {isLoginStatus ? (
                <Box onClick={onClickLogout}>로그아웃</Box>
              ) : (
                <Box onClick={onClickSignin}>로그인</Box>
              )}
              <CloseIcon fontSize="large" onClick={() => handleClose()} />
            </DrawerTopBox>
            {/* <SiteMapTypo>사이트맵 이동하기</SiteMapTypo>
            <SiteMapWrap>
              {siteMapList.map(item => (
                <SiteMapItem key={item.href}>
                  <Link href={item.href} onClick={() => onClickSitemap(item)}>
                    {item.name}
                  </Link>
                </SiteMapItem>
              ))}
            </SiteMapWrap> */}
            <Accordion accordionList={list} />
          </Drawer>
        </MobileContentContainer>
      )}
    </Header>
  );
}

const Header = styled.header`
  width: 100%;
  height: 100%;
`;
const MobileContentContainer = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 48px);
  margin: auto;
  height: 72px;
  justify-content: space-between;

  @media screen and (min-width: 640px) {
    /* height: 56px; */
  }

  @media screen and (min-width: 1024px) {
    /* height: 78px; */
  }
`;

const DrawerTopBox = styled(Box)`
  display: flex;
  width: 360px;
  height: 64px;
  padding: 0 1rem;
  align-items: center;
  justify-content: space-between;
  background: #0065af;
  color: white;
`;

const SiteMapTypo = styled(Typography)`
  background: #548d33;
  color: white;
  padding: 8px 8px;
  border-bottom: 1px solid white;
`;

const SiteMapWrap = styled(Box)`
  display: flex;
  width: 100%;
  height: 48px;
`;
const SiteMapItem = styled(Box)`
  flex: 1 0 33%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #70c043;

  border-right: 1px solid white;
  :last-child {
    border-right: none;
  }
  a {
    color: white;
  }
`;
