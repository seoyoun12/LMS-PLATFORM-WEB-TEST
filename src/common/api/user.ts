import { GET, POST, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { CourseRes } from '@common/api/course';
import { YN } from '@common/constant';

export enum UserRole {
  ROLE_TRANS_USER = 'ROLE_TRANS_USER',
  ROLE_TRANS_MANAGER = 'ROLE_TRANS_MANAGER',
  ROLE_TRAFFIC_SAFETY_USER = 'ROLE_TRAFFIC_SAFETY_USER',
  ROLE_TRAFFIC_SAFETY_MANAGER = 'ROLE_TRAFFIC_SAFETY_MANAGER',
  ROLE_ADMIN = 'ROLE_ADMIN',
  // ROLE_MANAGER = 'ROLE_MANAGER',
  // ROLE_TUTOR = 'ROLE_TUTOR',
}

export enum userRegistrationType {
  CHEONAN = 'CHEONAN',
  PRINCESS = 'PRINCESS',
  BORYEONG = 'BORYEONG',
  ASAN = 'ASAN',
  SEOSAN = 'SEOSAN',
  NONSAN = 'NONSAN',
  GYERYONG = 'GYERYONG',
  DANGJIN = 'DANGJIN',
  GEUMSAN = 'GEUMSAN',
  GRANT = 'GRANT',
  SEOCHEON = 'SEOCHEON',
  CHEONGYANG = 'CHEONGYANG',
  HONGSEONG = 'HONGSEONG',
  BUDGET = 'BUDGET',
  TAEAN = 'TAEAN',
  CHUNGNAM = 'CHUNGNAM',
  SEJONG = 'SEJONG',
  SEOUL = 'SEOUL',
  BUSAN = 'BUSAN',
  DAEGU = 'DAEGU',
  INCHEON = 'INCHEON',
  GWANGJU = 'GWANGJU',
  DAEJEON = 'DAEJEON',
  ULSAN = 'ULSAN',
  GAME = 'GAME',
  GANGWON = 'GANGWON',
  CHUNGBUK = 'CHUNGBUK',
  JEONBUK = 'JEONBUK',
  JEONNAM = 'JEONNAM',
  GYEONGBUK = 'GYEONGBUK',
  GYEONGNAM = 'GYEONGNAM',
  JEJU = 'JEJU',
}

export enum userSubjectEducationType {
  CHILDREN = 'CHILDREN',
  TEENAGER = 'TEENAGER',
  SELF_DRIVER = 'SELF_DRIVER',
  OLD_MAN = 'OLD_MAN',
}

export enum userSubjectEducationDetailType {
  KINDER = 'KINDER',
  ELEMENTARY_SCHOOL = 'ELEMENTARY_SCHOOL',
  MIDDLE_SCHOOL = 'MIDDLE_SCHOOL',
  HIGH_SCHOOL = 'HIGH_SCHOOL',
  SELF_DRIVER = 'SELF_DRIVER',
  OLD_MAN = 'OLD_MAN',
}

export interface MyUser extends User {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  roles: UserRole[];
  credentialsNonExpired: boolean;
  enabled: boolean;
  learningCourses: CourseRes[];
  pushToken: string;
}

export enum regCategoryType {
  TYPE_TRANS_EDU = 'TYPE_TRANS_EDU',
  TYPE_TRAFFIC_SAFETY_EDU = 'TYPE_TRAFFIC_SAFETY_EDU',
}

export interface User {
  birth: string;
  createdDtime: string;
  emailYn: string;
  failedYn: string;
  gender: string;
  lastPwUpdDtime: string;
  loginFailedCount: number;
  identityNumber: string;
  modifiedDtime: string;
  name: string;
  phone: string;
  regCategory: regCategoryType;
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

export async function getMyUser(): Promise<{ data: MyUser }> {
  //안쓰는 친구
  return await GET<{ data: MyUser }>(`/user/myinfo`);
}

export function useMyUser() {
  const { data, error } = useSWR<SWRResponse<MyUser>>(`/user/myinfo`, GET);
  return {
    user: data?.data,
    error,
  };
}

export async function userLoginHistory() {
  return await POST(`/user/login-history`);
}

export async function modifyMyUser({ name, emailYn, smsYn }: { name: string; emailYn: YN; smsYn: YN }) {
  return await PUT(`/user/myinfo/modify`, {
    emailYn,
    smsYn,
  });
}

export async function modifyMyUserPassword({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) {
  return await PUT(`/user/myinfo/modify/password`, {
    currentPw: currentPassword,
    modifiedPw: newPassword,
  });
}

export async function transWorker({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) {
  return await PUT(`/user/myinfo/modify/password`, {
    currentPw: currentPassword,
    modifiedPw: newPassword,
  });
}

export interface provincailTrafficSafety {
  company: string;
  email: string;
  firstGrade?: number; // 1학년
  secondGrade?: number; // 2학년
  thirdGrade?: number; // 3학년
  fourthGrade?: number; // 4학년
  fifthGrade?: number; // 5학년
  sixthGrade?: number; // 6학년
  thirdYearOldChild?: number; //만 3세
  fourthYearOldChild?: number; //만 4세
  fifthYearOldChild?: number; //만 5세
  oldMan?: number; //어르신
  selfDriver?: number; //자가운전자
  name: string;
  phone: string;
  smsYn: string;
  userRegistrationType: string;
  userSeq: number;
  userSubjectEducationDetailType: string;
  userSubjectEducationType: string;
  username: string;
}

export async function modifyProvincialTrafficSafety(info: provincailTrafficSafety) {
  return await PUT(`/user/provincial-traffic/${info.userSeq}`, info);
}

interface modifTransWorker {
  carNumber: string;
  company: string;
  name: string;
  phone: string;
  smsYn: string;
  userBusinessTypeOne: string; //업종
  userBusinessTypeTwo: string; // 구분
  userRegistrationType: string; //지역
  userSeq: number;
}

export async function modifTransWorker(info: modifTransWorker) {
  return await PUT(`/user/trans-worker/${info.userSeq}`, info);
}
