import { POST } from '@common/httpClient';
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
  return await POST('/auth/signup/common', { ...params });
}
