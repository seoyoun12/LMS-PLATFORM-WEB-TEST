import dynamic from 'next/dynamic';
import useResponsive from '@hooks/useResponsive';
import cn from 'clsx';
import s from './Layout.module.css';
import { Footer, GlobalNavigationBar } from '@components/common';
import { useEffect, useLayoutEffect, useState } from 'react';
import { TrafficGlobalNavigationBar } from '@components/common/GlobalNavigationBar/TrafficGlobalNavigationBar';
import { useRecoilState } from 'recoil';
import { pageType, userInfo } from '@common/recoil';
import { pageRegType } from '@common/recoil/pageType/atom';
import { useRouter } from 'next/router';
import { allowCommonPahtLis,allowUserPahtList,notNeededLoginPathList,notNeededSiteCourseTypePathList } from '@utils/loginPathList';
import { useSnackbar } from '@hooks/useSnackbar';
import { getMyUser, MyUser, UserRole } from '@common/api/user';
import { MobileNav } from '@components/common/GlobalNavigationBar';
import { AppBar } from '@mui/material';
import { courseType } from '@common/api/courseClass';
import { CourseType } from '@common/api/adm/courseClass';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const snackbar = useSnackbar();
  const isDesktop = useResponsive(1024);
  const [userPageType, setUserPageType] = useRecoilState(pageType);
  const [user, setUser] = useState<MyUser>(null);
  const [userInfoData, setUserInfo] = useRecoilState(userInfo);
  
  useEffect(() => {
    router.route.includes('/traffic')
    ? setUserPageType(pageRegType.TYPE_TRAFFIC_SAFETY_EDU)
    : setUserPageType(pageRegType.TYPE_TRANS_EDU);
    
  }, [router, setUserPageType]);

  //추후 훅스로 이동
  useLayoutEffect(() => {
    (async function () {
      try {
        if (router.route === '/') return;
        if (router.query.type === 'unsu') {
          localStorage.setItem('site_course_type', courseType.TYPE_TRANS_WORKER);
          router.push('/category');
        } else if (router.query.type === 'jeosang') {
          localStorage.setItem('site_course_type', courseType.TYPE_LOW_FLOOR_BUS);
          router.push('/category');
        }

        const currentPageNotNeedLogin = notNeededLoginPathList.some(item =>
          router.route.includes(item.href)
        );
        
        const isNotNeededCourseType = notNeededSiteCourseTypePathList.some(item => router.route.includes(item.href))
        if(isNotNeededCourseType) return;

        
        const isCourseType = localStorage.getItem('site_course_type');
        if (!isCourseType) router.push('/');

        
        const isValid = Object.values(courseType).some(item => item === isCourseType);
        
        if (!isValid) return router.push('/');
        

        if (currentPageNotNeedLogin && !localStorage.getItem('ACCESS_TOKEN')) return;

        if (!currentPageNotNeedLogin && !localStorage.getItem('ACCESS_TOKEN')) {
          window.alert('로그인이 필요한 서비스입니다.');
          return router.push({
            pathname:
              localStorage.getItem('site_course_type') === CourseType.TYPE_PROVINCIAL
                ? '/traffic/sign-in'
                : '/sign-in',
            query: { redirect: router.asPath },
          });
        }

        const { data }: { data: MyUser } = await getMyUser();
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
        setUser(data);
        const allowUserPage = allowUserPahtList.filter(item =>
          router.route.includes(item.href)
        )[0];
        if (allowUserPage) {
          if (
            data.roles.filter(item => allowUserPage.roles.includes(item)).length === 0
          ) {
            window.alert('로그인이 필요합니다!');
            return router.push({
              pathname:
                localStorage.getItem('site_course_type') === CourseType.TYPE_PROVINCIAL
                  ? '/traffic/sign-in'
                  : '/sign-in',
              query: { redirect: router.asPath },
            });
          }
        }
      } catch (e) {
        if (e.data?.status === 401) {
          window.alert('중복로그인이 확인되어 로그아웃 됩니다.');
          localStorage.removeItem('ACCESS_TOKEN');
          localStorage.removeItem('REFRESH_TOKEN');
          return router.push('/');
        }
        snackbar({ variant: 'error', message: e.data.message });
      }
    })();
  }, [router, setUserInfo, snackbar]);

  useEffect(() => {
    const isTraffic = router.route.includes('/traffic');
    const isCommon = allowCommonPahtLis.some(item => router.route.includes(item.href));

    if (!localStorage.getItem('ACCESS_TOKEN') && user) {
      return setUser(null);
    }
    if (user && user.roles.some(item => item === UserRole.ROLE_ADMIN)) return;
    if (notNeededLoginPathList.some(path => router.route.includes(path.href))) return;
    if (isTraffic && user) {
      if (router.route === '/') return; 
      if (isCommon) return;
    }
    else if (!isTraffic && user) {
      if (router.route === '/') return; 
      if (isCommon) return; 
    }
  }, [router, user]);

  return (
    <div className={cn(s.root)}>
      
      <AppBar
        position="sticky"
        sx={{
          zIndex: theme => theme.zIndex.drawer + 1,
          backgroundColor: '#FFFFFF',
          borderColor: '#E5E5E5',
          boxShadow: 'rgb(0 0 0 / 12%) 0 1px 0 0',
        }}
      >
        <Header isDesktop={isDesktop} />
      </AppBar>
        <main className="fit">{children}</main>
      <Footer />
    </div>
  );
};

const Header = dynamic(
  () =>
    Promise.resolve(({ isDesktop }: { isDesktop: boolean }) => {
      if (typeof window !== 'undefined' && isDesktop) {
        if (localStorage.getItem('site_course_type') === CourseType.TYPE_PROVINCIAL)
          return <TrafficGlobalNavigationBar />;
        else return <GlobalNavigationBar />;
      } else return <MobileNav />;
    }),
  { ssr: false }
);
