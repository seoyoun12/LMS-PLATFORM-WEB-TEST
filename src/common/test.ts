import { get, post } from '@common/httpClient';

export function healthCheck() {
  return get('api/v1/example');
}

export function getProfile() {
  return post('api/v1/profile');
}
