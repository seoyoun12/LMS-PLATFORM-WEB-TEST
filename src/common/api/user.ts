import { get, post, put } from '@common/httpClient';

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
    return await get<MyUser>(`/user/myinfo`);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function userLoginHistory() {
  try {
    return await post(`/user/login-history`);
  } catch(e) {
    return Promise.reject(e);
  }
}

export async function modifyMyUser({ name, emailYn, smsYn }: { name: string, emailYn: 'Y' | 'N', smsYn: 'Y' | 'N' }) {
  try {
    return await put(`/user/myinfo/modify`, {
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
    return await put(`/user/myinfo/modify/password`, {
      currentPw: currentPassword,
      modifiedPw: newPassword
    });
  } catch (err) {
    return Promise.reject(err);
  }
}
