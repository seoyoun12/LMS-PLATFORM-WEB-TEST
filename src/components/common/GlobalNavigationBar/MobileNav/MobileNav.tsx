import styled from '@emotion/styled';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Drawer, MenuItem, Typography } from '@mui/material';
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
import { useRecoilState } from 'recoil';
import { userInfo } from '@common/recoil';
import { regCategoryType } from '@common/api/user';
import UnsuIcon from '/public/assets/svgs/unsuIcon.svg';
import LowFloorIcon from '/public/assets/svgs/lowFloorIcon.svg';
import DominIcon from '/public/assets/svgs/dominIcon.svg';
import { MainDisplayType, useMainDisplay } from '@common/api/mainDisplay';

const siteMapMobileList = [
  {
    name: '운수종사자 교육',
    href: '/category',
    type: courseType.TYPE_TRANS_WORKER,
    regCategory: regCategoryType.TYPE_TRANS_EDU,
    icon: <UnsuIcon />,
    bgColor: '#0A9A4E',
  },
  {
    name: '저상버스 운전자교육',
    href: '/category',
    type: courseType.TYPE_LOW_FLOOR_BUS,
    regCategory: regCategoryType.TYPE_TRANS_EDU,
    icon: <LowFloorIcon />,
    bgColor: '#236cef',
  },
  {
    name: '도민교통 안전교육',
    href: '/traffic/category',
    type: courseType.TYPE_PROVINCIAL,
    regCategory: regCategoryType.TYPE_TRAFFIC_SAFETY_EDU,
    icon: <DominIcon />,
    bgColor: '#FEC901',
  },
];

const hideNavList = [
  { href: '/course' },
  { href: '/admin-center' },
  // { href: '/'}
];

export function MobileNav() {
  const [open, setOpen] = useState(false); //헤더바 오픈여부
  const router = useRouter();
  const isLoginStatus = useIsLoginStatus();
  const [userInfoData, setUserInfoData] = useRecoilState(userInfo); //유저데이터. 전역에 저장된 정보
  const { data, error } = useMainDisplay();
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
  const [isHideNavbar, setIsHideNavbar] = useState(false); // 특정지역에서는 숨김처리
  const [categoryValue, setCategoryValue] = useState('');
  const [siteMapMobileListState, setSiteMapMobileListState] = useState(
    data?.map((item, idx) => {
      return { ...item, ...siteMapMobileList[idx] };
    })
  );
  const [topBoxBgColor, setTopBoxBgColor] = useState<string>('#236cef');

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
    setCategoryValue('');
  };

  //페이지 이동시 close
  useEffect(() => {
    handleClose();
  }, [router]);

  useEffect(() => {
    setSiteMapMobileListState(
      data?.map((item, idx) => {
        return { ...item, ...siteMapMobileList[idx] };
      })
    );
  }, [data]);

  useEffect(() => {
    if (window) {
      const bgColor = siteMapMobileList.filter(
        item => item.type === localStorage.getItem('site_course_type')
      )[0].bgColor;
      setTopBoxBgColor(bgColor);
    }
  }, []);

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
    router.push('/');
  };

  const handleChangeCategory = (name: string) => {
    setCategoryValue(name);
  };

  const onClickSitemap = (item: {
    name: string;
    href: string;
    type: courseType;
    regCategory: regCategoryType;
    mainDisplayType: MainDisplayType;
  }) => {
    const isEqual = userInfoData.regCategory.includes(item.regCategory);
    if (item.mainDisplayType === 'EDUCATION_GROUND_BUS_DRIVER')
      return window.alert('준비중 입니다.');
    if (item.mainDisplayType === 'EDUCATION_PROVINCIAL_TRAFFIC_SAFETY')
      return window.alert('준비중 입니다.');
    //로그인안되었거나 유저데이터가 앙 없거나 이상할때
    if (!isLoginStatus || userInfoData.regCategory === '' || !userInfoData.regCategory) {
      logout();
      localStorage.setItem('site_course_type', item.type);
      return router.push(item.href);
    }

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
              src="/assets/images/onlineCenterLogo.png"
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
            <DrawerTopBox topBoxBgColor={topBoxBgColor}>
              {isLoginStatus ? (
                <Box onClick={onClickLogout}>로그아웃</Box>
              ) : (
                <Box onClick={onClickSignin}>로그인</Box>
              )}
              <CloseIcon fontSize="large" onClick={() => handleClose()} />
            </DrawerTopBox>
            {/* <SiteMapTypo>사이트맵 이동하기</SiteMapTypo> */}
            <SiteMapWrap>
              {siteMapMobileListState?.map(item => {
                if (item.status === -1) return;
                return (
                  <SiteMapItem key={item.href}>
                    <Box onClick={() => onClickSitemap(item)}>
                      <SiteMapIconWrap>{item.icon}</SiteMapIconWrap>
                      <SiteMapName>
                        {item.name.split(' ').map(item => (
                          <Box lineHeight={1.2}>{item}</Box>
                        ))}
                      </SiteMapName>
                    </Box>
                  </SiteMapItem>
                );
              })}
            </SiteMapWrap>
            {/* <Accordion accordionList={list} /> */}
            <Box display="flex" height="100%">
              <CategoryLeftBox>
                {list.map(item => (
                  <CategoryLeftItem
                    onClick={() => handleChangeCategory(item.name)}
                    sx={{
                      background: item.name === categoryValue && '#fff',
                      color: item.name === categoryValue && '#000',
                    }}
                  >
                    {item.name}
                  </CategoryLeftItem>
                ))}
              </CategoryLeftBox>
              <CategoryRightBox>
                {list
                  .filter(fill => fill.name === categoryValue)[0]
                  ?.children.map(item => (
                    <Link href={item.href} sx={{ padding: '12px' }} color="black">
                      {item.name}
                    </Link>
                  ))}
              </CategoryRightBox>
            </Box>
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
  width: calc(100% - 32px);
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

const DrawerTopBox = styled(Box)<{ topBoxBgColor: string }>`
  display: flex;
  width: 360px;
  height: 64px;
  padding: 0 1rem;
  align-items: center;
  justify-content: space-between;
  background: ${({ topBoxBgColor }) => topBoxBgColor};
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
  width: 360px;
`;
const SiteMapItem = styled(Box)`
  flex: 1 0 33%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  /* border-right: 1px solid white; */
  /* :last-child {
    border-right: none;
  } */
`;
const SiteMapIconWrap = styled(Box)`
  width: 90px;
`;
const SiteMapName = styled(Box)`
  display: flex;
  flex-direction: column;
  text-align: center;
  color: black;
`;

const CategoryLeftBox = styled(Box)`
  width: 40%;
  height: 100%;
  background: #8b8b8b;
  padding-top: 16px;
  font-size: 18px;
  color: white;
`;
const CategoryLeftItem = styled(Box)`
  border-bottom: 1px solid #ababab;
  padding: 1rem;
  :first-child {
    border-top: 1px solid #ababab;
  }
`;

const CategoryRightBox = styled(Box)`
  width: 60%;
  display: flex;
  flex-direction: column;
`;
