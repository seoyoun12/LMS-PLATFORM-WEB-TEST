import { get, post } from '@common/httpClient';

export function healthCheck() {
  return post('example', {
      title: '123123'
    },
  );
}

export function getProfile() {
  return post('profile');
}
