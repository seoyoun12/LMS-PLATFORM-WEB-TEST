import { POST } from '@common/httpClient';
import { localStore } from '@common/storage';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@common/constant';
import { userLoginHistory } from '@common/api/user';
import { useSnackbar } from '@hooks/useSnackbar';
import { regCategory } from './signUp';

export interface SignInResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    username:string;
    accessToken: string;
    refreshToken: string;
    roles:regCategory[]
  };
};

export async function signIn(username: string, password: string , loginType: string): Promise<SignInResponse> {
  return await POST('/auth/signin', { username, password, loginType })
    .then(onSignInSuccess)
    .then(getUserLoginHistory);
}

const onSignInSuccess = (response: SignInResponse) => {
  const { accessToken, refreshToken } = response.data;
  console.log(response.data);
  localStore.setItem(ACCESS_TOKEN, accessToken);
  localStore.setItem(REFRESH_TOKEN, refreshToken);

  return response;
};

const getUserLoginHistory = async (response: SignInResponse) => {
  await userLoginHistory();
  return response;
};

