import { DELETE, GET, POST, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { YN } from '@common/constant';
import { FetchPaginationResponse, PaginationResult } from 'types/fetch';
import { S3Files } from 'types/file';
import { Content } from '@common/api/content';
import { Lesson } from '@common/api/lesson';
import { businessType, courseCategoryType, courseType ,courseSubCategoryType } from './courseClass';
import { CourseDetailClientResponseDto } from './Api';

export enum ProductStatus {
  APPROVE = 1,
  REJECT = -1,
}

// 20220808 CourseInput
// export type CourseInput = Partial<CourseRes>;
export type CourseInput = Partial<Course>;

export interface CourseRes {
  seq: number;
  content: Content;
  courseCategoryType: courseCategoryType;
  courseName: string;
  courseSubCategoryType: courseSubCategoryType;
  courseBusinessType: businessType;
  courseType: courseType;
  createdDtime: string;
  displayYn: YN;
  lessonTime: number;
  lessons: Lesson[];
  modifiedDtime: string;
  s3Files: S3Files;
  status: ProductStatus;
}

// 20220808 Course interface
export interface Course {
  content: Content;
  // contentName: string;
  // contentSeq: number;
  courseBusinessType: businessType;
  courseCategoryType: courseCategoryType;
  courseName: string;
  courseSubCategoryType: courseSubCategoryType;
  courseType: courseType;
  createdDtime: string;
  displayYn: YN,
  fileName: string;
  lessonTime: number;
  modifiedDtime: string;
  s3Files: S3Files
  seq: number,
  status: ProductStatus
}

// 20220808 courseList
export function courseList({ contentTitle, elementCnt, page } : {
  contentTitle?: string;
  elementCnt?: number;
  page: number;
}) {
  const { data, error, mutate } = useSWR<SWRResponse<PaginationResult<Course[]>>> ([
    `/course`, {
      params: { contentTitle, elementCnt, page }
    }
  ], GET)
  
  return {
    data: data?.data,
    error,
    mutate
  }
}

// 20220808 courseAdmList
export function courseAdmList({ contentTitle, elementCnt, page } : {
  contentTitle?: string;
  elementCnt?: number;
  page: number;
}) {
  const { data, error, mutate } = useSWR<SWRResponse<PaginationResult<Course[]>>> ([
    `/course/adm`, {
      params: { contentTitle, elementCnt, page }
    }
  ], GET)
  
  return {
    data: data?.data,
    error,
    mutate
  }
}

// 20220808 courseUpload
export async function courseUpload(courseInput : CourseInput) {
  return await POST(`/course/adm`, courseInput)
}

// 20220808 courseRemove
export async function courseRemove(seq: number) {
  return await DELETE(`/course/adm/${seq}`);
}

// 20220809 courseDetail
export function courseDetail(seq: number | null) {
  const { data, error, mutate } = useSWR<SWRResponse<Course>>(seq? `/course/adm/${seq}` : null, GET);
  return {
    data: data?.data,
    error,
    mutate
  };
}

// 20220809 courseModify
export async function courseModify({seq, courseInput} : {
  seq: number,
  courseInput: CourseInput
}) {
  return await PUT(`/course/adm/${seq}`, courseInput);
}



export function useCourse(courseSeq?: number) {
  const { data, error, mutate } = useSWR<SWRResponse<CourseDetailClientResponseDto>>(courseSeq ? `/course/${courseSeq}` : null, GET);
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
  const { data, error } = useSWR<FetchPaginationResponse<CourseDetailClientResponseDto[]>>(
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

export function courseEnroll(courseSeq: number) {
  return POST(`/course/enroll/${courseSeq}`);
}
