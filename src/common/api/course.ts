import { GET, POST } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { YN } from '@common/constant';
import { FetchPaginationResponse, PaginationResult } from 'types/fetch';
import { S3Files } from 'types/file';
import { ContentRes } from '@common/api/content';
import { Lesson } from '@common/api/lesson';

export enum ProductStatus {
  APPROVE = 1,
  REJECT = -1,
}

export enum businessType {
  TYPE_ALL = 'TYPE_ALL',
  TYPE_PASSENGER = 'TYPE_PASSENGER',
  TYPE_CARGO = 'TYPE_CARGO',
}

export enum courseCategoryType {
  TYPE_SUP_COMMON = 'TYPE_SUP_COMMON', //보수일반
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

export enum courseType {
  TYPE_TRANS_WOKER = 'TYPE_TRANS_WOKER', //운수종사자
  TYPE_LOW_FLOOR_BUS = 'TYPE_LOW_FLOOR_BUS', //저상버스
  TYPE_PROVINCIAL = 'TYPE_PROVINCIAL', //도민
}

export type CourseInput = Partial<CourseRes>;

// old Interface
// export interface CourseRes {
//   content: ContentRes;
//   content1: string;
//   courseFile: string;
//   courseName: string;
//   courseSubName: string;
//   courseThumbLink: string;
//   createdDtime: string;
//   displayYn: YN;
//   fullScore: number;
//   lessonTerm: number;
//   lessonTime: number;
//   lessons: Lesson[];
//   limitPeople: number;
//   limitPeopleYn: string;
//   limitTotalScore: number;
//   modifiedDtime: string;
//   price: number;
//   restudyDay: number;
//   restudyYn: string;
//   saleYn: string;
//   seq: number;
//   status: ProductStatus;
//   s3Files: S3Files;

//   // 임시용 타입
//   curriculum: {
//     title: string;
//     panel: number;
//     contents: {
//       title: string;
//     }[];
//   }[];
// }

export interface CourseRes {
  seq: number;
  content: ContentRes;
  courseCategoryType: courseCategoryType;
  courseName: string;
  courseSubCategoryType: courseSubCategoryType;
  courseType: courseType;
  createdDtime: string;
  displayYn: YN;
  lessonTime: number;
  lessons: Lesson[];
  modifiedDtime: string;
  s3Files: S3Files;
  status: ProductStatus;
}

export interface CourseClassRes {
  // title: string;
  // eduTypeAndTime: string;
  // description: string;
  // year: number; step
  // jobType: string;
  // eduLegend: string;
  // currentJoin: number; enrolledPeopleCnt
  // limit: number; limitPeople
  // eduStart: string; studyStartDate
  // eduEnd: string; studyEndDate
  // start: string; requestStartDate
  // end: string; requestEndDate
  seq: number; //시퀀스
  course: CourseRes;
  year: number; //연도
  step: number; //기수
  requestStartDate: string; //신청일
  requestEndDate: string;
  studyStartDate: string; //시작일
  studyEndDate: string;
  enrolledPeopleCnt: number;
  limitPeople: number;
  eduStart: string;
  eduEnd: string;
  start: string;
  end: string;
  status: ProductStatus;
}

export function useCourse(courseId?: number) {
  const { data, error, mutate } = useSWR<SWRResponse<CourseRes>>(courseId ? `/course/${courseId}` : null, GET);
  return {
    course: data?.data,
    courseError: error,
    mutate,
  };
}

export function useCourseList({
  page,
  courseTitle,
  elementCnt,
  chapter,
}: {
  page: number;
  courseTitle?: string;
  elementCnt?: number;
  chapter?: string;
}) {
  const { data, error } = useSWR<FetchPaginationResponse<CourseRes[]>>(
    [
      `/course`,
      {
        params: { page, courseTitle, elementCnt, chapter },
      },
    ],
    GET
  );

  return {
    data: data?.data,
    error,
  };
}

export function courseEnroll(courseId: number) {
  return POST(`/course/enroll/${courseId}`);
}

export function useCourseClass({ businessType, date }: { businessType: businessType; date: string }) {
  const { data, error, mutate } = useSWR<SWRResponse<CourseClassRes[]>>(['/course-class', { params: { businessType, date } }], GET);
  return {
    data: data?.data,
    error,
    mutate,
  };
}
