import { ACCESS_TOKEN, REFRESH_TOKEN } from '@common/constant';
import { useRecoilState } from 'recoil';
import { isLoginState } from '@common/recoil';
import { useEffect, useLayoutEffect } from 'react';
import { localStore } from '@common/storage';

export function useIsLoginStatus(): boolean {
  const [ isLogin, setIsLogin ] = useRecoilState(isLoginState);

  useLayoutEffect(() => {
    const at = localStore.getItem(ACCESS_TOKEN);
    const rt = localStore.getItem(REFRESH_TOKEN);
    setIsLogin(!!at && !!rt);
  }, [ isLogin ]);

  return isLogin;
}
