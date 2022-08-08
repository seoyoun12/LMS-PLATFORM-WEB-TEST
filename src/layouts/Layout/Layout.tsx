import cn from 'clsx';
import s from './Layout.module.css';
import { Footer, GlobalNavigationBar } from '@components/common';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { TrafficGlobalNavigationBar } from '@components/common/GlobalNavigationBar/TrafficGlobalNavigationBar';
import { useRecoilState } from 'recoil';
import { pageType } from '@common/recoil';
import { pageRegType } from '@common/recoil/pageType/atom';
import { useRouter } from 'next/router';
import { allowUserPahtList, notNeededLoginPathList } from '@utils/loginPathList';
import { useSnackbar } from '@hooks/useSnackbar';
import { getMyUser, MyUser, UserRole } from '@common/api/user';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const snackbar = useSnackbar();
  const [userPageType, setUserPageType] = useRecoilState(pageType);
  const [user, setUser] = useState<MyUser>(null);
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

        const currentPageNotNeedLogin = notNeededLoginPathList.some(item => router.route.includes(item.href));

        if (currentPageNotNeedLogin && !localStorage.getItem('ACCESS_TOKEN')) return;

        if (!currentPageNotNeedLogin && !localStorage.getItem('ACCESS_TOKEN')) {
          window.alert('로그인이 필요한 서비스입니다.');
          return router.push(userPageType === pageRegType.TYPE_TRANS_EDU ? '/category' : '/traffic/category');
        }

        const { data }: { data: MyUser } = await getMyUser();
        setUser(data);
        const allowUserPage = allowUserPahtList.filter(item => router.route.includes(item.href))[0];
        if (allowUserPage) {
          console.log(allowUserPage, allowUserPahtList);
          console.log(data.roles.filter(item => allowUserPage.roles.includes(item)));
          if (data.roles.filter(item => allowUserPage.roles.includes(item)).length === 0) {
            window.alert('로그인이 필요합니다!');
            return router.back();
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

    //if you trans user , block access traffic page
    if (isTraffic && user) {
      const imTrans = user.roles.some(item => item === UserRole.ROLE_TRANS_USER || item === UserRole.ROLE_TRANS_MANAGER);
      if (!imTrans) return;
      window.alert('잘못된 접근입니다! 로그아웃 후 해당 페이지로 다시 로그인하세요! Trans');
      router.push('/category');
    }
    //if you traffic user , block access trans page
    else if (!isTraffic && user) {
      const imSafe = user.roles.some(item => item === UserRole.ROLE_TRAFFIC_SAFETY_USER || item === UserRole.ROLE_TRAFFIC_SAFETY_MANAGER);
      if (!imSafe) return;
      window.alert('잘못된 접근입니다! 로그아웃 후 해당 페이지로 다시 로그인하세요! Domin');
      router.push('/traffic/category');
    }
  }, [router, user]);

  return (
    <div className={cn(s.root)}>
      {/* <GlobalNavigationBar /> */}
      {userPageType === pageRegType.TYPE_TRANS_EDU ? <GlobalNavigationBar /> : <TrafficGlobalNavigationBar />}

      <main className="fit">{children}</main>
      <Footer />
    </div>
  );
};
