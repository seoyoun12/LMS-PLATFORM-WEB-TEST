import { ACCESS_TOKEN, REFRESH_TOKEN } from '@common/constant';
import { post } from '@common/httpClient';
import { localStore } from '@common/storage';

export async function logout() {
  return await post('/api/v1/auth/logout')
    .then(onLogoutSuccess)
    .catch(error => {
      console.log(error);
    });
}

const onLogoutSuccess = () => {
  localStore.removeItem(ACCESS_TOKEN);
  localStore.removeItem(REFRESH_TOKEN);
};

