import { YN } from '@common/constant';
import { DELETE, GET, POST, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { ProductStatus } from '../course';

export enum CourseModuleType {
  COURSE_MODULE_PROGRESS_RATE = 'COURSE_MODULE_PROGRESS_RATE', //진도율
  COURSE_MODULE_TEST = 'COURSE_MODULE_TEST', //시험
  COURSE_MODULE_SURVEY = 'COURSE_MODULE_SURVEY', //설문
}

export interface CourseModuleRequestDto {
  examSeq: number; //시험
  limitProgress: number; //진도율일떄
  limitScore: number; //시험일때
  moduleName: string; //모듈이름
  moduleType: CourseModuleType; //모듈타입
  status: ProductStatus; //사용여부
  submitYn: YN; //설문
  surveySeq: number; //설문
}

export interface CourseModuleFindRes {
  courseModuleSeq: number;
  courseSeq: number;
  limitProgress: number; //진도율일떄
  limitScore: number; //시험일때
  moduleName: string; //모듈이름
  moduleType: CourseModuleType; //모듈타입
  submitYn: YN; //설문
  status: ProductStatus; //사용여부
  surveySeq: number;
}

//swr get
export function useCourseModule(courseSeq: number) {
  const { data, error, mutate } = useSWR<SWRResponse<CourseModuleFindRes[]>>(
    [`/course-module/adm`, { params: { courseSeq } }],
    GET
  );
  return {
    data: data?.data,
    error,
    mutate,
  };
}

export function getDetailCourseModule(courseModuleSeq: number) {
  return GET<{ data: CourseModuleFindRes }>(`/course-module/adm/${courseModuleSeq}`);
}

export interface CourseModuleSaveReqDto {
  examSeq: number | null; //시험
  limitProgress: number; //진도율일떄
  limitScore: number; //시험일때
  moduleName: string; //모듈이름
  moduleType: CourseModuleType; //모듈타입
  status: ProductStatus; //사용여부
  submitYn: YN; //설문
  surveySeq: number | null; //설문
}

export interface CourseModuleSaveResDto {
  courseModuleSeq: number; //과정모듈시퀀스(myself)
  courseSeq: number; //과정 시퀀스
  limitProgress: number; //진도율일떄
  limitScore: number; //시험일때
  moduleName: string; //모듈이름
  moduleType: CourseModuleType; //모듈타입
  status: ProductStatus; //사용여부
  submitYn: YN; //설문
  surveySeq: number; //설문
}

export function uploadCourseModule(
  courseSeq: number,
  courseModuleSaveReqDto: CourseModuleSaveReqDto
) {
  return POST(`/course-module/adm/${courseSeq}`, courseModuleSaveReqDto);
}

export function deleteCourseModule(courseModuleSeq: number) {
  return DELETE(`/course-module/adm/${courseModuleSeq}`);
}

export interface CourseModuleUpdateReqDto {
  examSeq: number; //시험
  limitProgress: number; //진도율일떄
  limitScore: number; //시험일때
  moduleName: string; //모듈이름
  moduleType: CourseModuleType; //모듈타입
  status: ProductStatus; //사용여부
  submitYn: YN; //설문
  surveySeq: number; //설문
}

export function modifyCourseModule(
  courseModuleSeq: number,
  courseModuleUpdateReqDto: CourseModuleUpdateReqDto
) {
  return PUT(`/course-module/adm/${courseModuleSeq}`, courseModuleUpdateReqDto);
}
