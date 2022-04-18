import { api } from '@common/httpClient';

export const responseInterceptor = () => {
  api.interceptors.response.use(
    (response) => {
      // if (!!response && response.status !== 200 && response.status !== 201) {
      //   const { resMsg } = response.data;
      //   if (!resMsg) {
      //     response.data.resMsg = '네트워크 오류';
      //   }
      //   const error = { response };
      //   return Promise.reject(error);
      // }

      return response;
    },
    (error) => {
      console.error(`error`, error);

      if (!error?.response?.data) {
        error.response = { data: { resMsg: '네트워크 오류' } };
      }
      return Promise.reject(error);
    },
  );
};
