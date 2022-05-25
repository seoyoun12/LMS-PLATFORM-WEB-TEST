import { DELETE, GET, POST, PUT } from '@common/httpClient';
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


export async function getCourse({ courseId }: { courseId: number }): Promise<CourseData> {
  try {
    return (await GET<FetchResponse<CourseData>>(`/course/${courseId}`)).data;
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export function useCourse({ courseId }: { courseId: number }): {
  isLoading: boolean;
  isError: any;
  data?: CourseData
} {
  const { data, error } = useSWR<FetchResponse<CourseData>>(courseId ? `/course/${courseId}` : null, GET);
  return {
    data: data?.data,
    isLoading: !data && !error,
    isError: error
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
  const { data, error } = useSWR<FetchPaginationResponse<CourseData[]>>([
    `/course/adm`, {
      params: { page, courseTitle, elementCnt, chapter }
    }
  ], GET);

  return {
    data: data?.data,
    error
  };
}

