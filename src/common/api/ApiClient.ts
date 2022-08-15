// SWAGGER HTTP CLIENT
//
// TODO: 기존 모든 API 클라이언트를 이걸로 바꿔주세요.
// TODO: 기존 인터셉터 코드 수정하여 작성하였습니다.
//
// TODO: API 응답 인터페이스가 없습니다.

import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { localStore } from '@common/storage';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '@common/constant';
import { axiosHeaders, axiosSetting } from '@common/httpClient'; // 이거는 따로 여기에 옮기는게 좋을 것 같아요.
import { STATUS_CODE } from 'types/fetch';
import { Api } from './Api';

// 클라이언트.

const ApiClient = new Api({
  baseURL: axiosSetting.server(),
  headers: axiosHeaders,
});

export default ApiClient;

// 리퀘스트 인터셉터.

ApiClient.instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {

    const accessToken = localStore.getItem('ACCESS_TOKEN');

    config.headers = {
      ...config.headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    };
    
  },
);

// 리스폰스 인터셉터.

ApiClient.instance.interceptors.response.use(
  (response: AxiosResponse<unknown>) => response,
  async (err: AxiosError<unknown>) => {

    if (!err.response) return err;

    if (err.response.status === STATUS_CODE.ACCESS_TOKEN_EXPIRED) {

      const accessToken = localStore.getItem(ACCESS_TOKEN);
      const refreshToken = localStore.getItem(REFRESH_TOKEN);

      if (accessToken && refreshToken) {

        await ApiClient.auth
          .accessTokenRefreshUsingPost({
            accessToken: `Bearer ${accessToken}`,
            refreshToken: refreshToken
          })
          .then((res: AxiosResponse<{ accessToken: string }>) => localStore.setItem(ACCESS_TOKEN, res.data.accessToken))
          .catch((e: AxiosError<unknown>) => {

            if (e.response?.status === STATUS_CODE.REFRESH_TOKEN_EXPIRED) {

              localStore.removeItem(ACCESS_TOKEN);
              localStore.removeItem(REFRESH_TOKEN);

            }

          });

      }

    }

  }
);
