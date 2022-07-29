import { POST } from '@common/httpClient';
import { YN } from '@common/constant';

export type regCategory =
  | ''
  | 'TYPE_TRANS_EDU'
  | 'ROLE_TRANS_MANAGER'
  | 'TYPE_TRAFFIC_SAFETY_EDU'
  | 'ROLE_TRAFFIC_SAFETY_MANAGER'
  | 'ROLE_ADMIN';

interface Params {
  username: string;
  password: string;
  name: string;
  regCategory: regCategory;
  birth?: string;
  gender?: string;
  phone: string | null;
  email?: string;
  emailYn?: YN;
  smsYn?: YN;
}

export async function signUp(params: Params) {
  return await POST('/auth/signup/common', { ...params });
}
