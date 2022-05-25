import { GET, POST } from '@common/httpClient';

export function healthCheck() {
  return POST('example', {
      title: '123123'
    },
  );
}

export function getProfile() {
  return POST('profile');
}
