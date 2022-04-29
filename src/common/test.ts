import { get, post } from '@common/httpClient';

export function healthCheck() {
  return post('api/v1/example', {
      title: '123123'
    },
  );
}

export function getProfile() {
  return post('api/v1/profile');
}
