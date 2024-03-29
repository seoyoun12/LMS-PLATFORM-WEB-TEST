import { GET, POST, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { YN } from '@common/constant';
import { businessType, courseSubCategoryType } from './courseClass';
import { S3Files } from 'types/file';
import { UserFindPasswordRequestDto } from './Api';

export enum MemberType {
  TYPE_MEMBER = 'TYPE_MEMBER',
  TYPE_NON_MEMBER = 'TYPE_NON_MEMBER',
}

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

export enum ProgressStatus {
  TYPE_BEFORE = 'TYPE_BEFORE', //학습시작전
  TYPE_PROGRESSING = 'TYPE_PROGRESSING', //학습진행중
  TYPE_ENDED = 'TYPE_ENDED', //학습종료과정
}

export interface MyInfoCourseRes {
  courseClassSeq: number; //과정클래스 시퀀스
  courseSeq: number; //과정 시퀀스
  courseTitle: string; //과정 제목
  courseUserSeq: number; //과정신청 시퀀스
  leftDays: number; //교육만료까지 남은기간
  progress: number; //진도율
  progressStatus: ProgressStatus; //학습중인 과정 ,종료과정 구분
  step: number; //기수
  studyStartDate: string; //교육시작일
  studyEndDate: string; //교육만료일
  thumbnailImage: string; //썸네일 이미지 S3경로
  firstLessonSeq: number;
  recentLessonSeq: number;
}

export interface MyUser extends User {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  roles: UserRole[];
  credentialsNonExpired: boolean;
  enabled: boolean;
  learningCourses: MyInfoCourseRes[];
  pushToken: string;
}

export enum authoritiesType { // user Role
  ROLE_TRANS_USER = 'ROLE_TRANS_USER',
  ROLE_TRAFFIC_SAFETY_USER = 'ROLE_TRAFFIC_SAFETY_USER',
  ROLE_TRANS_MANAGER = 'ROLE_TRANS_MANAGER',
  ROLE_TRAFFIC_SAFETY_MANAGER = 'ROLE_TRAFFIC_SAFETY_MANAGER',
  ROLE_ADMIN = 'ROLE_ADMIN',
}

export enum regCategoryType {
  TYPE_TRANS_EDU = 'TYPE_TRANS_EDU',
  TYPE_TRAFFIC_SAFETY_EDU = 'TYPE_TRAFFIC_SAFETY_EDU',
}

// export enum registerType {
//   TYPE_TRANS_EDU = 'TYPE_TRANS_EDU',
//   TYPE_TRAFFIC_SAFETY_EDU = 'TYPE_TRAFFIC_SAFETY_EDU',
// }

export interface User {
  authorities: authoritiesType;
  birth: string;
  createdDtime: string;
  email: string;
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
  s3Files: S3Files;
  identityNumberFirst: number;
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
  identityNumberFirst: number;
}

export async function getMyUser(): Promise<{ data: MyUser }> {
  //안쓰는 친구
  return await GET<{ data: MyUser }>(`/user/myinfo`);
}

export function useMyUser() {
  const { data, error } = useSWR<SWRResponse<MyUser>>(`/user/myinfo`, GET, {
    revalidateOnFocus: false,
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error.status === 401) return;
      if (retryCount > 4) return;
    },
  });
  return {
    user: data?.data,
    error,
  };
}

export async function userLoginHistory() {
  return await POST(`/user/login-history`);
}

export async function findUserId(phone: string) {
  return await POST(`/user/find-id`, { phone });
}
/**
 * 받아온 정보로 유저가 있는지 확인합니다 (패스워드를 알려주는게 아닙니다.)
 * 패스워드는 반환하지 않습니다.(패스워드는 단방향 해싱되어있어 받아도 의미가 없습니다)
 */
export function findUserPw(findPwDto: UserFindPasswordRequestDto) {
  return POST(`/user/find-password`, findPwDto);
}
export async function existsUserId(username: string) {
  return await POST(`/user/exists-id`, { username });
}
export async function changeUserPW({
  name,
  phone,
  username,
  password,
}: {
  name: string;
  phone: string;
  username: string;
  password: string;
}) {
  return await PUT(`/user/change-password`, { phone, name, username, password });
}

export async function modifyMyUser({
  name,
  emailYn,
  smsYn,
}: {
  name: string;
  emailYn: YN;
  smsYn: YN;
}) {
  return await PUT(`/user/myinfo/modify`, {
    emailYn,
    smsYn,
  });
}

export async function modifyMyUserPassword({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) {
  return await PUT(`/user/myinfo/modify/password`, {
    currentPw: currentPassword,
    modifiedPw: newPassword,
  });
}

// deparcated
export async function transWorker({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) {
  return await PUT(`/user/myinfo/modify/password`, {
    currentPw: currentPassword,
    modifiedPw: newPassword,
  });
}

export interface provincailTrafficSafety {
  // company: string;
  // email: string;
  // firstGrade?: number; // 1학년
  // secondGrade?: number; // 2학년
  // thirdGrade?: number; // 3학년
  // fourthGrade?: number; // 4학년
  // fifthGrade?: number; // 5학년
  // sixthGrade?: number; // 6학년
  // thirdYearOldChild?: number; //만 3세
  // fourthYearOldChild?: number; //만 4세
  // fifthYearOldChild?: number; //만 5세
  // oldMan?: number; //어르신
  // selfDriver?: number; //자가운전자
  // name: string;
  // phone: string;
  // smsYn: string;
  // userRegistrationType: string;
  // userSeq: number;
  // userSubjectEducationDetailType: string;
  // userSubjectEducationType: string;
  // username: string;

  // carNumber: string;
  userSeq: number;
  company: string;
  email: string;
  name: string;
  phone: string;
  smsYn: YN;
  emailYn: YN;
  // userBusinessTypeOne: businessType;
  // userBusinessTypeTwo: courseSubCategoryType;
  userRegistrationType: userRegistrationType;
  username: string;
}

export function getProvincial() {
  return GET<{ data: provincailTrafficSafety }>(`/user/provincial`);
}

export async function modifyProvincialTrafficSafety(info: provincailTrafficSafety) {
  return await PUT(`/user/provincial`, info);
}

interface modifTransWorker {
  carNumber: string;
  company: string;
  name: string;
  phone: string;
  smsYn: string;
  userBusinessTypeOne: Omit<businessType, 'TYPE_ALL'>; //업종
  userBusinessTypeTwo: courseSubCategoryType; // 구분
  userRegistrationType: string; //지역
  s3Files: S3Files;
  // userSeq: number;
}

export function getTransport() {
  return GET<{ data: modifTransWorker }>(`/user/transport`);
}

export async function modifTransWorker(info: Omit<modifTransWorker, 's3Files'>) {
  return await PUT(`/user/transport`, info);
}

export interface LearningStatusRes {
  courseUserSeq: number;
  courseClassSeq: number;
  courseSeq: number;
  step: number;
  courseTitle: string;
  studyStartDate: string;
  studyEndDate: string;
  thumbnailImage: string;
  startLeftDays: number;
  leftDays: number;
  progress: number;
  firstLessonSeq: number;
  recentLessonSeq: number;
  progressStatus: ProgressStatus;
}

export function useLearningStatus() {
  const { data, error, mutate } = useSWR<SWRResponse<LearningStatusRes[]>>(
    `/user/myinfo/learning-status`,
    GET
  );
  return {
    data: data?.data,
    error,
    mutate,
  };
}
