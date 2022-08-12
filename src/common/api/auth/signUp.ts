import { POST } from '@common/httpClient';
import { YN } from '@common/constant';

export type regCategory =
  | ''
  | 'TYPE_TRANS_EDU'
  | 'ROLE_TRANS_MANAGER'
  | 'TYPE_TRAFFIC_SAFETY_EDU'
  | 'ROLE_TRAFFIC_SAFETY_MANAGER'
  | 'ROLE_ADMIN';

export interface SignupParams {
  // username: string;
  // password: string;
  // name: string;
  // regCategory: regCategory;
  // birth?: string;
  // gender?: string;
  // phone: string | null;
  // email?: string;
  // emailYn?: YN;
  // smsYn?: YN;
  name: string;
  username: string;
  password: string;
  phone: string;
  smsYn: YN;
  regCategory: regCategory;
  email: string;
  emailYn: YN;
}

export async function signUp(params: SignupParams) {
  return await POST('/auth/signup/common', { ...params });
}
