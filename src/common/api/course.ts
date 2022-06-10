import { DELETE, GET, POST, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { YN } from '@common/constant';
import { FetchPaginationResponse } from 'types/fetch';
import { S3Files } from 'types/file';
import { ContentRes } from '@common/api/content';

export enum ProductStatus {
  APPROVE = 1,
  REJECT = -1,
}

export interface CourseRes {
  content1: string;
  courseFile: string;
  courseName: string;
  courseSubName: string;
  courseThumbLink: string;
  createdDtime: string;
  displayYn: YN;
  fullScore: number;
  lessonTerm: number;
  lessonTime: number;
  limitPeople: number;
  limitPeopleYn: string;
  limitTotalScore: number;
  modifiedDtime: string;
  price: number;
  restudyDay: number;
  restudyYn: string;
  saleYn: string;
  seq: number;
  status: ProductStatus;
  s3Files: S3Files;
  content: ContentRes;

  // 임시용 타입
  curriculum: {
    title: string;
    panel: number;
    contents: {
      title: string
    }[];
  }[];
}

export async function uploadCourse(courseInput: FormData) {
  return await POST(`/course/adm`, courseInput, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  });
}

export async function modifyCourse({ courseId, courseInput }: { courseId: number, courseInput: FormData }) {
  return await PUT(`/course/adm/${courseId}`, courseInput, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  });
}

export function useCourse(courseId?: number) {
  const { data, error, mutate } = useSWR<SWRResponse<CourseRes>>(courseId ? `/course/${courseId}` : null, GET);
  return {
    data: data?.data,
    isLoading: !data && !error,
    isError: error,
    mutate
  };
}

export function removeCourse({ courseId }: { courseId: number }) {
  return DELETE(`/course/adm/${courseId}`);
}

export function useCourseList({ page, courseTitle, elementCnt, chapter }: {
  page: number,
  courseTitle?: string,
  elementCnt?: number,
  chapter?: string
}) {
  const { data, error } = useSWR<FetchPaginationResponse<CourseRes[]>>([
    `/course/adm`, {
      params: { page, courseTitle, elementCnt, chapter }
    }
  ], GET);

  return {
    data: data?.data,
    error
  };
}

export const connectCourseToContent = async ({ courseSeq, contentSeq }: { courseSeq: number, contentSeq: number }) => {
  return await POST(`/course/adm/link/content`, { courseSeq, contentSeq });
};

export const disConnectContent = async (courseSeq: number) => {
  return await DELETE(`/course/adm/link/content/${courseSeq}`);
};
