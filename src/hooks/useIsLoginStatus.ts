import { ACCESS_TOKEN, REFRESH_TOKEN } from '@common/constant';
import { useRecoilState } from 'recoil';
import { isLoginState } from '@common/recoil';
import { useCallback, useEffect } from 'react';
import { localStore } from '@common/storage';

export default useCallback(
  function useIsLoginStatus(): boolean {
    const [ isLogin, setIsLogin ] = useRecoilState(isLoginState);

    useEffect(() => {
      const at = localStore.getItem(ACCESS_TOKEN);
      const rt = localStore.getItem(REFRESH_TOKEN);
      setIsLogin(!!at && !!rt);
    }, [ isLogin ]);

    return isLogin;
  },
  [],
);
