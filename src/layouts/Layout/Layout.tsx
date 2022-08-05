import cn from 'clsx';
import s from './Layout.module.css';
import { Footer, GlobalNavigationBar } from '@components/common';
import React, { useEffect } from 'react';
import { TrafficGlobalNavigationBar } from '@components/common/GlobalNavigationBar/TrafficGlobalNavigationBar';
import { useRecoilState } from 'recoil';
import { pageType } from '@common/recoil';
import { pageRegType } from '@common/recoil/pageType/atom';
import { useRouter } from 'next/router';
import { loginPathList } from '@utils/loginPathList';
import { useSnackbar } from '@hooks/useSnackbar';
import { getMyUser, MyUser } from '@common/api/user';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const snackbar = useSnackbar()
  const [userPageType, setUserPageType] = useRecoilState(pageType);
  useEffect(() => {
    if (router.route.includes('/traffic')) setUserPageType(pageRegType.TYPE_TRAFFIC_SAFETY_EDU);
    (async function(){
      try{
        if(!localStorage.getItem('ACCESS_TOKEN')) return;
        const {data} : {data:MyUser} = await getMyUser()
        if (router.route !== '/') {
          const currentPageNotNeedLogin = loginPathList.some((item) => router.route.includes(item.href));
          if (!currentPageNotNeedLogin && !data) {
            window.alert('로그인이 필요한 서비스입니다.');
            router.back();
          }
        }
      }
      catch(e:any){
        snackbar({variant:'error' , message:e.data.message})
      }
    })()
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
