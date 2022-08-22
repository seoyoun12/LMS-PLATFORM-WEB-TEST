import { regCategory } from '@common/api/auth/signUp';
import { SignUpRequestDto } from '@common/api/Api';
import { YN } from '@common/constant';
import { POST } from '@common/httpClient';

interface SignupAdmParams {
  name: string;
  username: string;
  password: string;
  phone: string;
  smsYn: YN;
  regCategory: regCategory;
  email: string;
  emailYn: YN;
}

export function SignupAdm(params: SignupAdmParams) {
  return POST(`/auth/signup/admin`, params);
}
