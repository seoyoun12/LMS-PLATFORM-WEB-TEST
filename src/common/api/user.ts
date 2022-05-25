import { GET, POST, PUT } from '@common/httpClient';
import useSWR from 'swr';
import { YN } from '@common/constant';

export interface MyUser {
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
  };
}

export async function getMyUser(): Promise<MyUser> {
  return await GET<MyUser>(`/user/myinfo`);
}

// export function useMyUser(): { user: MyUser | undefined; isLoading: boolean; isError: any } {
//   const { data, error } = useSWR<MyUser>(`/user/myinfo`, get);
//   return {
//     isLoading: !data && !error,
//     user: data,
//     isError: error
//   };
// }

export async function userLoginHistory() {
  return await POST(`/user/login-history`);
}

export async function modifyMyUser({ name, emailYn, smsYn }: { name: string, emailYn: YN, smsYn: YN }) {
  return await PUT(`/user/myinfo/modify`, {
    emailYn, smsYn
  });
}

export async function modifyMyUserPassword(
  { currentPassword, newPassword }: { currentPassword: string, newPassword: string }
) {
  return await PUT(`/user/myinfo/modify/password`, {
    currentPw: currentPassword,
    modifiedPw: newPassword
  });
}
