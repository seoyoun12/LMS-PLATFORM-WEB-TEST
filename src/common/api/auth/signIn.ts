import { post } from '@common/httpClient';
import { localStore } from '@common/storage';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@common/constant';
import { userLoginHistory } from '@common/api/user';
import { useSnackbar } from '@hooks/useSnackbar';

export interface SignInResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export async function signIn(username: string, password: string): Promise<SignInResponse> {
  return await post('/auth/signin', { username, password })
    .then(onSignInSuccess)
    .then(getUserLoginHistory);
}

const onSignInSuccess = (response: SignInResponse) => {
  const { accessToken, refreshToken } = response.data;
  localStore.setItem(ACCESS_TOKEN, accessToken);
  localStore.setItem(REFRESH_TOKEN, refreshToken);

  return response;
};

const getUserLoginHistory = async (response: SignInResponse) => {
  await userLoginHistory();
  return response;
};

