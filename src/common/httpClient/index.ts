import Axios, { AxiosError } from 'axios';
import { jwpInterceptor, responseInterceptor } from '@common/httpInterceptor';
import { tokenInterceptor } from '@common/httpInterceptor/tokenInterceptor';

/**
 *  * Basic
 *  * Security scheme type:  HTTP
 *  * HTTP Authorization Scheme  basic
 */

const headers = {
  'Api-Key': 'bWlyaW06MTIzNA==',
  withCredentials: true
};

export const axiosSetting = {
  baseURL: process.env.BASE_URL,
  scheme: process.env.NEXT_PUBLIC_SCHEME,
  host: process.env.NEXT_PUBLIC_HOST,
  port: process.env.NEXT_PUBLIC_PORT,
  server() {
    return `${this.scheme}://${this.host}${this.port ? `:${this.port}` : ''}`;
  },
};

export const api = Axios.create({
  baseURL: axiosSetting.server(),
  headers,
});
triggerInterceptors();

export const get = async (
  url: string,
  { params = {}, headers = {}, } = {}) => {
  try {
    const response = await api.get(url, { params, headers });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const post = async (
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

function triggerInterceptors() {
  // request interceptors
  jwpInterceptor();

  // response interceptors
  tokenInterceptor();
  responseInterceptor();
}



