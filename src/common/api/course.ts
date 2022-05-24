import { deleteRequest, get, post, put } from '@common/httpClient';
import useSWR from 'swr';
import { YN } from '@common/constant';
import { FetchPaginationResponse, FetchResponse } from 'types/fetch';


export enum PRODUCT_STATUS {
  APPROVE = 1,
  REJECT = -1,
}

export interface CourseData {
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
  status: PRODUCT_STATUS;

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
  return await post(`/course/adm`, courseInput, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  });
}

export async function modifyCourse({ courseId, courseInput }: { courseId: number, courseInput: FormData }) {
  return await put(`/course/adm/${courseId}`, courseInput, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  });
}


export async function getCourse({ courseId }: { courseId: number }): Promise<CourseData> {
  try {
    return (await get<FetchResponse<CourseData>>(`/course/${courseId}`)).data;
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export function useCourse({ courseId }: { courseId: number }): {
  isLoading: boolean;
  isError: any;
  data?: CourseData
} {
  const { data, error } = useSWR<FetchResponse<CourseData>>(courseId ? `/course/${courseId}` : null, get);
  return {
    data: data?.data,
    isLoading: !data && !error,
    isError: error
  };
}

export function removeCourse({ courseId }: { courseId: number }) {
  return deleteRequest(`/course/adm/${courseId}`);
}

export function useCourseList({ page, courseTitle, elementCnt, sort }: {
  page: number,
  courseTitle?: string,
  elementCnt?: number,
  sort?: string
}) {
  const { data, error } = useSWR<FetchPaginationResponse<CourseData[]>>([
    `/course/adm`, {
      params: { page, courseTitle, elementCnt, sort }
    }
  ], get);

  return {
    data: data?.data,
    error
  };
}

