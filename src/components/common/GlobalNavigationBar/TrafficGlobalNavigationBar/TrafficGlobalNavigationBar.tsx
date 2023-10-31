import { HeaderBar } from './HeaderBar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AppBar } from '@mui/material';
import * as React from 'react';

const hideNavList = [
  // { href: '/course/[courseSeq]' },
  { href: '/admin-center' },
  // { href: '/sign-up' },
  // { href: '/'}
];

export function TrafficGlobalNavigationBar() {
  const router = useRouter();
  const [isHideNavbar, setIsHideNavbar] = useState(false);
  const [isHide, setIsHide] = useState(false);

  useEffect(() => {
    setIsHide(router.pathname.slice(1,7).includes('course'));
    if (router.route === '/') {
      setIsHideNavbar(true);
    } else {
      const hide = hideNavList.some(e => router.route.includes(e.href));
      setIsHideNavbar(hide);
    }
  }, [router]);


  if (isHideNavbar) return null; // 추가
  return (
    <>
      {
        isHide
        ? <></>
        : <AppBar
            position="sticky"
            sx={{
              zIndex: theme => theme.zIndex.drawer + 1,
              backgroundColor: '#FFFFFF',
              borderColor: '#E5E5E5',
              boxShadow: 'rgb(0 0 0 / 12%) 0 1px 0 0',
            }}
            >
          <HeaderBar />
          {/* {isHideNavbar || <NavBar />} */}
        </AppBar>
      }
    </>
    )
}
