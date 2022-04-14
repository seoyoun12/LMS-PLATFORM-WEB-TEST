import { post } from '@common/httpClient';

type Params = {
  username: string;
  password: string;
  name: string;
  birth: string;
  gender: string;
  phone: string;
  emailYn: boolean;
  smsYn: boolean;
}

export async function signUp(params: Params) {
  return await post('/api/v1/user/register/common', { data: params });
}
