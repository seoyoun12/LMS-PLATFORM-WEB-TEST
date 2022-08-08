import { DELETE, GET, POST } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { YN } from '@common/constant';
import { FetchPaginationResponse, PaginationResult } from 'types/fetch';
import { S3Files } from 'types/file';
import { ContentRes } from '@common/api/content';
import { Lesson } from '@common/api/lesson';
import { businessType, courseCategoryType, courseRegType, courseSubCategoryType } from './courseClass';
import { LargeNumberLike } from 'crypto';

export enum ProductStatus {
  APPROVE = 1,
  REJECT = -1,
}

export enum courseType {
  TYPE_TRANS_WORKER = 'TYPE_TRANS_WORKER', //운수종사자
  TYPE_LOW_FLOOR_BUS = 'TYPE_LOW_FLOOR_BUS', //저상버스
  TYPE_PROVINCIAL = 'TYPE_PROVINCIAL', //도민
}

// 20220808 CourseInput
// export type CourseInput = Partial<CourseRes>;
export type CourseInput = Partial<Course>;

export interface CourseRes {
  seq: number;
  content: ContentRes;
  courseCategoryType: courseCategoryType;
  courseName: string;
  courseSubCategoryType: courseSubCategoryType;
  courseBusinessType: businessType;
  courseType: courseRegType;
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
  contentName: string;
  contentSeq: LargeNumberLike;
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

// 20220808 courseDelete
export async function courseRemove(seq: number) {
  return await DELETE(`/course/adm/${seq}`);
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
