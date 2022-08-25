import { ACCESS_TOKEN, REFRESH_TOKEN } from '@common/constant';
import { POST } from '@common/httpClient';
import { localStore } from '@common/storage';

export async function logout() {
  return await POST('/auth/signout')
    .then(onLogoutSuccess)
    .catch(err => {
      return Promise.reject(err);
    });
}

const onLogoutSuccess = () => {
  localStore.removeItem(ACCESS_TOKEN);
  localStore.removeItem(REFRESH_TOKEN);
};
