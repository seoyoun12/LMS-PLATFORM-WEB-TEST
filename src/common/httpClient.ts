import Axios, { AxiosError } from 'axios';
import { jwpInterceptor, responseInterceptor } from '@common/httpInterceptor';
import { tokenInterceptor } from '@common/httpInterceptor/tokenInterceptor';
import { HttpError } from '@common/errors';

/**
 *  * Basic
 *  * Security scheme type:  HTTP
 *  * HTTP Authorization Scheme  basic
 */

const headers = {
  'Api-Key': 'bWlyaW06MTIzNA==',
  'Content-Type': 'application/json',
  withCredentials: true
};

export const axiosSetting = {
  baseURL: process.env.BASE_URL,
  scheme: process.env.NEXT_PUBLIC_SCHEME,
  host: process.env.NEXT_PUBLIC_HOST,
  port: process.env.NEXT_PUBLIC_PORT,
  server() {
    return `${this.scheme}://${this.host}${this.port ? `:${this.port}` : ''}/api/v1`;
  },
};

export const api = Axios.create({
  baseURL: axiosSetting.server(),
  headers,
});
triggerInterceptors();

export const get = async <T>(
  url: string,
  { params = {}, headers = {}, } = {}
): Promise<T> => {
  try {
    const response = await api.get(url, { params, headers });
    return response.data;
  } catch (error: any) {
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
    console.log('POST response', response);
    return response.data;
  } catch (error: any) {
    return handleError(error);
  }
};

export const put = async (
  url: string,
  data: object = {},
  { params = {}, headers = {}, } = {}
) => {
  try {
    const response = await api.put(url, data, { params, headers });
    return response.data;
  } catch (error: any) {
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
  responseInterceptor();
  tokenInterceptor();
}



