import { GET, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { PaginationResult } from 'types/fetch';

import {
  CourseLearningInfoCoursesResponseDto,
  CourseLearningInfoStepResponseDto,
  UserCourseInfoDetailCourseInfoDto,
  UserCourseInfoDetailLearningStatusDto,
  UserCourseInfoDetailProgressStatusDto,
} from '../Api';
import { YN } from '@common/constant';
import { CourseType } from './courseClass';
import { courseSubCategoryType } from '../courseClass';

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
  birth: string; //생년월일
  businessSubType: courseSubCategoryType; //업종
  phone: string; //폰
  businessName: string; //업체명
  carRegisteredRegion: string // 차량등록지역
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
  businessType?: string;
  carRegitRegion?: string;
}

export interface CourseLearningInfoInput {
  businessName?: string;
  businessSubType?: string;
  carNumber?: string;
  carRegistrationRegion?: string;
  phone?: string;
  residence?: string;
}

export function useLearningInfo({ page, ...rest }: CourseLearningInfoRequestDto) {
  const extractValidParams = {}

  for(const key in rest) {
    // year 파라미터가 0일시 쿼리에서 제거
    if(rest[key] || rest[key] !== 0) {
      extractValidParams[key] = rest[key];
    }
  }

  
  const { data, error, mutate } = useSWR<SWRResponse<PaginationResult<LearningInfoRes[]>>>(
    [
      `/course/adm/learning-info/`,
      {
        params: { page, ...extractValidParams },
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

export function useLearningInfoCourses(year:number) {
  const { data, error, mutate } = useSWR<SWRResponse<CourseLearningInfoCoursesResponseDto[]>
  >(`/course/adm/learning-info/courses${year ? `?year=${year}` : ''}`, GET, {
    revalidateOnFocus: false,
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error.status === 401) return;
      if (retryCount > 4) return;
    },
  });
  return {
    courses: data?.data,
    coursesError: error,
  };
}

export function useLearningInfoStep(courseSeq: number) {
  const { data, error, mutate } = useSWR<
    SWRResponse<CourseLearningInfoStepResponseDto[]>
  >(`/course/adm/learning-info/step/${courseSeq}`, GET, {
    revalidateOnFocus: false,
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error.status === 401) return;
      if (retryCount > 4) return;
    },
  });
  return {
    steps: data?.data,
    stepsError: error,
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
