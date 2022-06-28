import { DELETE, GET, POST, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { S3Files } from 'types/file';
import { Lesson } from '@common/api/lesson';
import { CourseRes } from '@common/api/course';

export enum YN {
  YES = 'YES',
  NO = 'NO'
}

export interface MyUser extends User {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: { authority: string; }[];
  credentialsNonExpired: boolean;
  enabled: boolean;
  learningCourses: CourseRes[];
  pushToken: string;
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
  const { data, error } = useSWR<SWRResponse<MyUser>>(`/user/myinfo`, GET);
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
