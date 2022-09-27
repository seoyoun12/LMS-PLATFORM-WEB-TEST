import { DELETE, GET, POST, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { FetchPaginationResponse, PaginationResult } from 'types/fetch';
import { CourseInput, CourseRes } from '@common/api/course';
import {
  CourseDetailClientResponseDto,
  CourseModuleFindResponseDto,
  CourseUserMyInfoResponseDto,
  Pageable,
  UserCourseInfoDetailCourseInfoDto,
  UserCourseInfoDetailLearningStatusDto,
  UserCourseInfoDetailProgressStatusDto,
} from '../Api';
import { YN } from '@common/constant';
import { CourseType } from './courseClass';

interface LearningInfoRes {
  courseClassSeq: number; //과정클래스시퀀스
  courseName: string; //과정명
  courseUserSeq: number; //과정유저시퀀스
  displayClassLearningStatus: YN; //상태
  displayCompleteYn: string; //수료여부
  name: string; //실명
  regDate: string; //신청일
  studyDate: string; //학습기간 ~~로 옴
  userSeq: number; //유저시퀀스
  username: string; //아이디
  yearAndStep: string; //기수
  displayTotalProgress: string;
}

interface DetailCourse {
  courseInfo?: UserCourseInfoDetailCourseInfoDto;
  learningStatusList?: UserCourseInfoDetailLearningStatusDto[];
  progressStatusList?: UserCourseInfoDetailProgressStatusDto[];
}
export enum CompleteType {
  TYPE_INCOMPLETE = 'TYPE_INCOMPLETE',
  TYPE_COMPLETE = 'TYPE_COMPLETE',
}
export enum StatusType {
  TYPE_NORMAL = 'TYPE_NORMAL',
  TYPE_OUT = 'TYPE_OUT',
}

export interface CourseLearningInfoRequestDto {
  completeType?: CompleteType | string;
  courseClassSeq?: number;
  courseSeq?: number;
  courseType?: CourseType;
  elementCnt?: number;
  nameOrUsername?: string;
  page: number;
  statusType?: StatusType;
}

export interface CourseLearningInfoInput {
  businessName: string;
  businessSubType: string;
  carNumber: string;
  carRegistrationRegion: string;
  phone: string;
  residence: string;
}

export function useLearningInfo({ page, ...rest }: CourseLearningInfoRequestDto) {
  const { data, error, mutate } = useSWR<SWRResponse<PaginationResult<LearningInfoRes[]>>>(
    [
      `/course/adm/learning-info/`,
      {
        params: { page, ...rest },
      },
    ],
    GET
  );
  return {
    data: data?.data,
    error,
    mutate,
  };
}


// 상세
export function detailCourseInfo(courseUserSeq: number) {
  const { data, error, mutate } = useSWR<SWRResponse<DetailCourse>>(
    courseUserSeq ? `/user/adm/course-info/detail/${courseUserSeq}` : null,
    GET
  );
  return {
    data: data?.data,
    error,
    mutate,
  };
}

// 수정
export async function modifyLearningInfo({
  courseUserSeq, 
  courseLearningInfoInput
} : {
  courseUserSeq: number;
  courseLearningInfoInput: CourseLearningInfoInput
}) {
  return await PUT(`/user/adm/course-info/detail/${courseUserSeq}`, courseLearningInfoInput);

}

// export function detailCourseInfo({
//   courseUserSeq
// } : {
//   courseUserSeq: number;
// }) {
//   const { data, error, mutate } = useSWR<SWRResponse<DetailCourse>>(
//     courseUserSeq ? [`/user/adm/course-info/detail/${courseUserSeq}`] : null, GET);
//   return {
//     data: data?.data,
//     error,
//     mutate
//   }
// }



export function modifyCompleteAllCourseInfo(courseUserSeq: number) {
  return PUT(`/user/adm/course-info/progress/${courseUserSeq}/all-complete`);
}
export function modifyCancelAllCourseInfo(courseUserSeq: number) {
  return PUT(`/user/adm/course-info/progress/${courseUserSeq}/all-cancel`);
}

export function modifyCompleteCourseInfo(
  courseUserSeq: number,
  courseProgressSeq: number
) {
  return PUT(
    `/user/adm/course-info/progress/${courseUserSeq}/${courseProgressSeq}/complete`
  );
}

export function modifyCancelCourseInfo(courseUserSeq: number, courseProgressSeq: number) {
  return PUT(
    `/user/adm/course-info/progress/${courseUserSeq}/${courseProgressSeq}/cancel`
  );
}
