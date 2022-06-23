import { DELETE, GET, POST, PUT } from '@common/httpClient';
import useSWR from 'swr';

export enum YN {
  YES = 'YES',
  NO = 'NO'
}

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

export interface User {
  birth: string;
  createdDtime: string;
  emailYn: string;
  failedYn: string;
  gender: string;
  lastPwUpdDtime: string;
  loginFailedCount: number;
  modifiedDtime: string;
  name: string;
  phone: string;
  regCategory: string;
  seq: number;
  smsYn: string;
  status: number;
  username: string;
}

export interface UserInput {
  seq: number;
  name?: string;
  emailYn?: string;
  smsYn?: string;
  gender?: string;
  phone?: string;
  birth?: string;
  password?: string;
}

export async function getMyUser(): Promise<MyUser> {
  return await GET<MyUser>(`/user/myinfo`);
}

export function useMyUser() {
  const { data, error } = useSWR<MyUser>(`/user/myinfo`, GET);
  return {
    user: data?.data,
    error
  };
}

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
