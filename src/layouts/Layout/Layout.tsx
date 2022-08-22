import cn from 'clsx';
import s from './Layout.module.css';
import { Footer, GlobalNavigationBar } from '@components/common';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { TrafficGlobalNavigationBar } from '@components/common/GlobalNavigationBar/TrafficGlobalNavigationBar';
import { useRecoilState } from 'recoil';
import { pageType, userInfo } from '@common/recoil';
import { pageRegType } from '@common/recoil/pageType/atom';
import { useRouter } from 'next/router';
import { allowUserPahtList, notNeededLoginPathList } from '@utils/loginPathList';
import { useSnackbar } from '@hooks/useSnackbar';
import { getMyUser, MyUser, UserRole } from '@common/api/user';
import { MobileNav, SiteMap } from '@components/common/GlobalNavigationBar';
import { AppBar } from '@mui/material';
import { PopupBox } from '@components/common/PopupBox/PopupBox';
import { courseType } from '@common/api/courseClass';
import { regCategory } from '@common/recoil/user/atom';
import { CourseType } from '@common/api/adm/courseClass';
import useResponsive from '@hooks/useResponsive';
import MenuIcon from '@mui/icons-material/Menu';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const snackbar = useSnackbar();
  const isDesktop = useResponsive(1024);
  const [userPageType, setUserPageType] = useRecoilState(pageType);
  const [user, setUser] = useState<MyUser>(null);
  const [userInfoData, setUserInfo] = useRecoilState(userInfo);
  useEffect(() => {
    if (router.route.includes('/traffic')) {
      setUserPageType(pageRegType.TYPE_TRAFFIC_SAFETY_EDU);
    } else {
      setUserPageType(pageRegType.TYPE_TRANS_EDU);
    }
  }, [router]);

  //추후 훅스로 이동
  useLayoutEffect(() => {
    (async function () {
      try {
        if (router.route === '/') return;

        const currentPageNotNeedLogin = notNeededLoginPathList.some(item =>
          router.route.includes(item.href)
        );
        // if (router.route.includes('stebMove')) {
        //null or undefined check
        const isCourseType = localStorage.getItem('site_course_type');
        if (!isCourseType) router.push('/');

        //validate
        const isValid = Object.values(courseType).some(item => item === isCourseType);
        // if (isValid) return
        if (!isValid) return router.push('/');
        // }

        if (currentPageNotNeedLogin && !localStorage.getItem('ACCESS_TOKEN')) return;

        if (!currentPageNotNeedLogin && !localStorage.getItem('ACCESS_TOKEN')) {
          console.log(currentPageNotNeedLogin, notNeededLoginPathList, '머양');
          window.alert('로그인이 필요한 서비스입니다.');
          return router.push(
            localStorage.getItem('site_course_type') === CourseType.TYPE_PROVINCIAL
              ? '/traffic/sign-in'
              : '/sign-in'
          );
        }

        const { data }: { data: MyUser } = await getMyUser();
        console.log('user Data', data);
        setUserInfo({
          name: data.name,
          role: [...data.roles],
          regCategory: data.regCategory,
        });
        setUserInfo({
          name: data.name,
          role: [...data.roles],
          regCategory: data.regCategory,
        });
        console.log('recoilData', userInfoData);
        setUser(data);
        const allowUserPage = allowUserPahtList.filter(item =>
          router.route.includes(item.href)
        )[0];
        if (allowUserPage) {
          console.log(allowUserPage, allowUserPahtList);
          console.log(data.roles.filter(item => allowUserPage.roles.includes(item)));
          if (
            data.roles.filter(item => allowUserPage.roles.includes(item)).length === 0
          ) {
            window.alert('로그인이 필요합니다!');
            return router.push(
              localStorage.getItem('site_course_type') === CourseType.TYPE_PROVINCIAL
                ? '/traffic/sign-in'
                : '/sign-in'
            );
          }
        }
      } catch (e: any) {
        console.dir(e);
        if (e.data?.status === 401) {
          window.alert('잘못된 로그인정보 입니다. 로그아웃 합니다.');
          localStorage.removeItem('ACCESS_TOKEN');
          localStorage.removeItem('REFRESH_TOKEN');
          return router.push('/');
        }
        snackbar({ variant: 'error', message: e.data.message });
      }
    })();
  }, [router]);

  useEffect(() => {
    const isTraffic = router.route.includes('/traffic');

    //have a local useState(user) when logout
    if (!localStorage.getItem('ACCESS_TOKEN') && user) {
      return setUser(null);
    }
    //if you admin, ignore alert.
    if (user && user.roles.some(item => item === UserRole.ROLE_ADMIN)) return;

    //if not needed signin , ignore.
    if (notNeededLoginPathList.some(path => router.route.includes(path.href))) return;

    //if you trans user , block access traffic page
    if (isTraffic && user) {
      const imTrans = user.roles.some(
        item => item === UserRole.ROLE_TRANS_USER || item === UserRole.ROLE_TRANS_MANAGER
      );
      if (!imTrans) return;
      window.alert('잘못된 접근입니다! 로그아웃 후 해당 페이지로 다시 로그인하세요!');
      router.push('/category');
    }
    //if you traffic user , block access trans page
    else if (!isTraffic && user) {
      const imSafe = user.roles.some(
        item =>
          item === UserRole.ROLE_TRAFFIC_SAFETY_USER ||
          item === UserRole.ROLE_TRAFFIC_SAFETY_MANAGER
      );
      if (!imSafe) return;
      window.alert('잘못된 접근입니다! 로그아웃 후 해당 페이지로 다시 로그인하세요!');
      router.push('/traffic/category');
    }
  }, [router, user]);

  return (
    <div className={cn(s.root)}>
      {/* <GlobalNavigationBar /> */}
      <AppBar
        position="sticky"
        sx={{
          zIndex: theme => theme.zIndex.drawer + 1,
          backgroundColor: '#FFFFFF',
          borderColor: '#E5E5E5',
          boxShadow: 'rgb(0 0 0 / 12%) 0 1px 0 0',
        }}
      >
        {isDesktop && <SiteMap />}
        {typeof window !== 'undefined' && isDesktop ? (
          localStorage.getItem('site_course_type') === CourseType.TYPE_PROVINCIAL ? (
            <TrafficGlobalNavigationBar />
          ) : (
            <GlobalNavigationBar />
          )
        ) : (
          <MobileNav />
        )}
      </AppBar>
      {router.route.includes('/category') && !router.route.includes('/admin') && (
        <PopupBox />
      )}
      {/* category에 넣으면 css 붕괴. 이유 알수없음.(popupBox 넣으면 여러 상관없는 컴포넌트의 css들이 무작위로 지정됨. ex)카드 리스트에 Spinner의 스타일이 지정 ) */}

      <main className="fit">{children}</main>
      <Footer />
    </div>
  );
};
