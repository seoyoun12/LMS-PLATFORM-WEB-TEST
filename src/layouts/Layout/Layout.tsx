import cn from 'clsx';
import s from './Layout.module.css';
import { Footer, GlobalNavigationBar } from '@components/common';
import React, { useEffect } from 'react';
import { TrafficGlobalNavigationBar } from '@components/common/GlobalNavigationBar/TrafficGlobalNavigationBar';
import { useRecoilState } from 'recoil';
import { pageType } from '@common/recoil';
import { pageRegType } from '@common/recoil/pageType/atom';
import { useRouter } from 'next/router';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [userPageType, setUserPageType] = useRecoilState(pageType);
  useEffect(() => {
    if (router.route.includes('/traffic')) setUserPageType(pageRegType.TYPE_TRAFFIC_SAFETY_EDU);
  }, []);
  return (
    <div className={cn(s.root)}>
      {/* <GlobalNavigationBar /> */}
      {userPageType === pageRegType.TYPE_TRANS_EDU ? <GlobalNavigationBar /> : <TrafficGlobalNavigationBar />}

      <main className="fit">{children}</main>
      <Footer />
    </div>
  );
};
