import Axios, { AxiosError } from 'axios';

/**
 *  * Basic
 *  * Security scheme type:  HTTP
 *  * HTTP Authorization Scheme  basic
 */

const headers = {
  Accept: 'application/json',
  Pragma: 'no-cache',
  Authorization: 'accessToken',
};

export const axiosSetting = {
  baseURL: process.env.BASE_URL,
  scheme: process.env.NEXT_PUBLIC_SCHEME,
  host: process.env.NEXT_PUBLIC_HOST,
  api: process.env.NEXT_PUBLIC_API,
  port: process.env.NEXT_PUBLIC_PORT,
  server() {
    return `${this.scheme}://${this.host}${this.api}${this.port ? `:${this.port}` : ''}`;
  },
};

export const api = Axios.create({
  baseURL: axiosSetting.server(),
  headers,
  withCredentials: true,
  timeout: 100000,
});

export const requestGET = async (
  url: string,
  { params = {}, headers = {}, } = {}) => {
  try {
    const response = await api.get(url, { params, headers });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const requestPOST = async (
  url: string,
  data: object = {},
  { params = {}, headers = {}, } = {}
) => {
  try {
    const response = await api.post(url, data, { params, headers });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

const handleError = (error: AxiosError | any) => {
  if (error.response) {
    throw error.response;
  }

  throw (error);
};


// // Add a response interceptor
// api.interceptors.response.use(
//   (response) => {
//     const { resCode, resMsg } = response.data;
//
//     if (resCode !== 201) {
//       if (!resMsg) {
//         // eslint-disable-next-line no-param-reassign
//         response.data.resMsg = '네트워크 오류';
//       }
//       const error = { response };
//       return Promise.reject(error);
//     }
//     return response;
//   },
//   (error) => {
//     console.error(`error`, error);
//
//     if (!error?.response?.data) {
//       // eslint-disable-next-line no-param-reassign
//       error.response = { data: { resMsg: '네트워크 오류' } };
//     }
//     return Promise.reject(error);
//   },
// );
