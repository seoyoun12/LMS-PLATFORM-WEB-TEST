import { YN } from '@common/constant';
import { DELETE, GET, POST } from '@common/httpClient';
import { FilterType } from '@layouts/Calendar/Calendar';
import useSWR, { SWRResponse } from 'swr';
import { ProductStatus } from './course';
import type { CourseDetailClientResponseDto, CourseResponseDto } from '@common/api/Api';

export enum businessType {
  TYPE_ALL = 'TYPE_ALL',
  TYPE_PASSENGER = 'TYPE_PASSENGER',
  TYPE_CARGO = 'TYPE_CARGO',
}

export enum userBusinessType {
  PASSENGER = 'PASSENGER',
  FREIGHT = 'FREIGHT',
}

export enum courseType {
  TYPE_TRANS_WORKER = 'TYPE_TRANS_WORKER', //운수종사자
  TYPE_LOW_FLOOR_BUS = 'TYPE_LOW_FLOOR_BUS', //저상버스
  TYPE_PROVINCIAL = 'TYPE_PROVINCIAL', //도민
}

export enum courseCategoryType {
  TYPE_NONE = 'NONE',
  TYPE_SUP_COMMON = 'TYPE_SUP_COMMON', //보수일반
  TYPE_SUP_CONSTANT = 'TYPE_SUP_CONSTANT', //보수수시
  TYPE_CONSTANT = 'TYPE_CONSTANT', //수시
  TYPE_NEW = 'TYPE_NEW', //신규
  TYPE_ILLEGAL = 'TYPE_ILLEGAL', //법령위반자
  TYPE_HANDICAPPED = 'TYPE_HANDICAPPED', //교통약자 이동편의 증진
  TYPE_DANGEROUS = 'TYPE_DANGEROUS', // 위험물진 운송차량 운전자
}

export enum courseSubCategoryType {
  BUS = 'BUS', //버스
  CHARTER_BUS = 'CHARTER_BUS', //전세버스
  SPECIAL_PASSENGER = 'SPECIAL_PASSENGER', //특수여객
  CORPORATE_TAXI = 'CORPORATE_TAXI', //법인택시
  GENERAL_CARGO = 'GENERAL_CARGO', //일반화물
  PRIVATE_TAXI = 'PRIVATE_TAXI', //개인택시
  INDIVIDUAL_CARGO = 'INDIVIDUAL_CARGO', //개별화물
  CONSIGNMENT = 'CONSIGNMENT', //용달화물
  SPECIAL_TRANSPORTATION = 'SPECIAL_TRANSPORTATION', //특별교통수단
  KNEELING_BUS = 'KNEELING_BUS', //저상버스
  DANGEROUS_GOODS = 'DANGEROUS_GOODS', //위험물
  DESIGNATED_WASTE = 'DESIGNATED_WASTE', //지정폐기물
  HAZARDOUS_CHEMICALS = 'HAZARDOUS_CHEMICALS', //유해화학물질
  HIGH_PRESSURE_GAS_FLAMMABLE = 'HIGH_PRESSURE_GAS_FLAMMABLE', //고압가스(가연성)
  HIGH_PRESSURE_GAS_TOXIC = 'HIGH_PRESSURE_GAS_TOXIC', //고압가스(독성)
}

export interface CourseClassRes {
  seq: number; //시퀀스
  enableToEnrollYn: YN;
  course: CourseResponseDto;
  year: number; //연도
  step: number; //기수
  requestStartDate: string; //신청일
  requestEndDate: string;
  studyStartDate: string; //시작일
  studyEndDate: string;
  enrolledPeopleCnt: number;
  limitPeople: number;
  limitPeopleYn: YN;
  eduStart: string;
  eduEnd: string;
  start: string;
  end: string;
  status: ProductStatus;
}

export interface CourseClassStepsRes {
  enrolledPeopleCnt: number;
  limitPeople: number;
  limitPeopleYn: YN;
  requestEndDate: string;
  requestStartDate: string;
  seq: number;
  step: number;
  studyEndDate: string;
  studyStartDate: string;
}

export function useCourseClass({
  courseType,
  businessType,
  date,
}: {
  courseType: courseType;
  businessType: businessType;
  date: string;
}) {
  const { data, error, mutate } = useSWR<SWRResponse<CourseClassRes[]>>(
    ['/course-class', { params: { courseType, businessType, date } }],
    GET
  );
  return {
    data: data?.data,
    error,
    mutate,
  };
}

export function useSingleCourseClass(classSeq: number) {
  const { data, error, mutate } = useSWR<SWRResponse<CourseClassRes>>(
    `/course-class/${classSeq}`,
    GET
  );
  return {
    data: data?.data,
    error,
    mutate,
  };
}
//기수
export function getSingleCourseClass(courseClassSeq: number) {
  return GET<{ data: CourseClassRes }>(`/course-class/${courseClassSeq}`);
}

export function getCourseClassStep(
  courseType: courseType,
  courseCategoryType: courseCategoryType,
  courseBusinessType: businessType
) {
  return GET<{ data: CourseClassStepsRes[] }>('/course-class/step', {
    params: { courseType, courseCategoryType, courseBusinessType },
  });
}

export enum RegisterType {
  TYPE_INDIVIDUAL = 'TYPE_INDIVIDUAL',
  TYPE_ORGANIZATION = 'TYPE_ORGANIZATION',
}

export enum ResidenceType {}

export interface UserTransSaveInputDataType {
  seq: number; //삭제용 구분 시퀀스
  businessName: string; //회사명
  businessSubType: courseSubCategoryType; //업종구분
  businessType: userBusinessType; //업종
  carNumber: string; //차량번호
  carRegisteredRegion: string; //차량 등록지
  courseClassSeq: number; //과정시퀀스
  firstIdentityNumber: string; //민증번호 앞
  secondIdentityNumber: string; //민증번호 뒤
  name: string; //이름
  phone: string;
  firstPhone: string;
  secondPhone: string;
  thirdPhone: string;
  registerType: RegisterType; //개인 단체 구분
  smsYn: YN;
  residence: string; //거주지
}

export function courseClassIndividualEnroll(
  userTransSaveData: Omit<
    UserTransSaveInputDataType,
    | 'firstIdentityNumber'
    | 'secondIdentityNumber'
    | 'seq'
    | 'firstPhone'
    | 'secondPhone'
    | 'thirdPhone'
  >
) {
  return POST(`/course-user/enroll/individual`, userTransSaveData);
}
export function courseClassOrganizationEnrll(
  userTransSaveData: Omit<
    UserTransSaveInputDataType,
    | 'firstIdentityNumber'
    | 'secondIdentityNumber'
    | 'seq'
    | 'firstPhone'
    | 'secondPhone'
    | 'thirdPhone'
  >
) {
  return POST(`/course-user/enroll/organization`, userTransSaveData);
}

//해당하는 교육과정을 수강 취소
export function courseUserOrganCancel(courseUserSeq: number) {
  return DELETE(`/course-user/cancel/organization/${courseUserSeq}`);
}
