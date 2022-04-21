import { get } from '@common/httpClient';

type Response = {
  created_at: string;
  updated_at: string;
  status: number;
  seq: number;
  username: string;
  name: string;
  birth: string;
  gender: string;
  phone: string;
  emailYn: string;
  smsYn: string;
  pushToken: string;
  lastPwUpdDtime: string;
  regCategory: string;
  loginFailedCount: number;
  failedYn: string;
}

export async function getMyUser(): Promise<Response> {
  try {
    return await get<Response>(`/api/v1/user/personal`);
  } catch (err) {
    return Promise.reject(err);
  }
}
