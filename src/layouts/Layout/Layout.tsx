import cn from 'clsx';
import s from './Layout.module.css';
import { Footer, GlobalNavigationBar } from '@components/common';
import React, { useEffect } from 'react';
import { TrafficGlobalNavigationBar } from '@components/common/GlobalNavigationBar/TrafficGlobalNavigationBar';
import { useRecoilState } from 'recoil';
import { pageType } from '@common/recoil';
import { pageRegType } from '@common/recoil/pageType/atom';
import { useRouter } from 'next/router';
import { allowUserPahtList, notNeededLoginPathList } from '@utils/loginPathList';
import { useSnackbar } from '@hooks/useSnackbar';
import { getMyUser, MyUser } from '@common/api/user';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const snackbar = useSnackbar();
  const [userPageType, setUserPageType] = useRecoilState(pageType);
  useEffect(() => {
    if (router.route.includes('/traffic')) setUserPageType(pageRegType.TYPE_TRAFFIC_SAFETY_EDU);
  }, [router]);

  useEffect(() => {
    (async function () {
      try {
        if (router.route === '/') return;

        if (!localStorage.getItem('ACCESS_TOKEN')) return;
        const { data }: { data: MyUser } = await getMyUser();
        const currentPageNotNeedLogin = notNeededLoginPathList.some(item => router.route.includes(item.href));
        if (!currentPageNotNeedLogin && !data) {
          window.alert('로그인이 필요한 서비스입니다.');
          router.back();
          return;
        }

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
  return (
    <div className={cn(s.root)}>
      {/* <GlobalNavigationBar /> */}
      {userPageType === pageRegType.TYPE_TRANS_EDU ? <GlobalNavigationBar /> : <TrafficGlobalNavigationBar />}

      <main className="fit">{children}</main>
      <Footer />
    </div>
  );
};
