import { DELETE, GET, POST, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { FetchPaginationResponse, PaginationResult } from 'types/fetch';
import { CourseInput, CourseRes } from '@common/api/course';
import {
  CourseDetailClientResponseDto,
  CourseLearningInfoCoursesResponseDto,
  CourseLearningInfoStepResponseDto,
  CourseModuleFindResponseDto,
  CourseUserMyInfoResponseDto,
  Pageable,
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

export function useLearningInfo({ page, ...rest }: CourseLearningInfoRequestDto) {
  const { data, error, mutate } = useSWR<
    SWRResponse<PaginationResult<LearningInfoRes[]>>
  >(
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

export function useLearningInfoCourses() {
  const { data, error, mutate } = useSWR<
    SWRResponse<CourseLearningInfoCoursesResponseDto[]>
  >(`/course/adm/learning-info/courses`, GET, {
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
