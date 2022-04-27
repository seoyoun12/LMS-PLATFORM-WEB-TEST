import { get, post } from '@common/httpClient';

export function healthCheck() {
  return post('http://192.168.0.145:8080/example', {
      title: 'blabla'
    },
  );
}

export function getProfile() {
  return post('api/v1/profile');
}
