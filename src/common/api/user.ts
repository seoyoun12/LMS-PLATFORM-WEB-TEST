import { get, post } from '@common/httpClient';

export type MyUser = {
  message: string;
  status: number;
  success: boolean;
  data: {
    createdAt: string;
    updatedAt: string;
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
}

export async function getMyUser(): Promise<MyUser> {
  try {
    return await get<MyUser>(`/api/v1/user/personal`);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function modifyMyUser({ name, emailYn, smsYn }: { name: string, emailYn: 'Y' | 'N', smsYn: 'Y' | 'N' }) {
  try {
    return await post(`/api/v1/user/modification/info`, {
      emailYn, smsYn
    });
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function modifyMyUserPassword(
  { currentPassword, newPassword }: { currentPassword: string, newPassword: string }
) {
  try {
    return await post(`/api/v1/user/modification/password`, {
      currentPw: currentPassword,
      modifiedPw: newPassword
    });
  } catch (err) {
    return Promise.reject(err);
  }
}
