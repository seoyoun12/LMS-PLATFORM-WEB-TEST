import { ACCESS_TOKEN, REFRESH_TOKEN } from '@common/constant';
import { useRecoilState } from 'recoil';
import { isLoginState } from '@common/recoil';
import { useEffect } from 'react';
import { localStore } from '@common/storage';

export function useIsLoginStatus(): boolean {
  const [ isLogin, setIsLogin ] = useRecoilState(isLoginState);

  useEffect(() => {
    const aT = localStore.getItem(ACCESS_TOKEN);
    const rT = localStore.getItem(REFRESH_TOKEN);
    setIsLogin(!!aT && !!rT);
  }, [ isLogin ]);

  return isLogin;
}
