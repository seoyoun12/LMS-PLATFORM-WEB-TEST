import { post } from '@common/httpClient';
import { YN } from '@common/constant';

interface Params {
  username: string;
  password: string;
  name: string;
  birth?: string;
  gender?: string;
  phone?: string;
  emailYn: YN;
  smsYn: YN;
}

export async function signUp(params: Params) {
  return await post('/auth/signup/common', { ...params });
}
