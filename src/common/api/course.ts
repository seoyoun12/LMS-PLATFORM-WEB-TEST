import { get, post, put } from '@common/httpClient';
import useSWR from 'swr';
import { FetchResponse } from '@common/constant';

export interface CourseData {
  content1: string;
  courseName: string;
  courseSubName: string;
  displayYn?: string;
  fullScore?: number;
  lessonTerm?: number;
  lessonTime?: number;
  limitPeople?: number;
  limitPeopleYn?: string;
  limitTotalScore?: number;
  price?: number;
  restudyDay?: number;
  restudyYn?: string;
  saleYn?: string;
}

export interface Course {
  content1: string;
  courseFile: string;
  courseName: string;
  courseSubName: string;
  courseThumbLink: string;
  createdDtime: string;
  displayYn: string;
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
  status: number;

  // 임시용 타입
  curriculum: {
    title: string;
    panel: number;
    contents: {
      title: string
    }[];
  }[];
}

export async function uploadCourse(formData: FormData) {
  return await post(`/course/adm`, formData, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  });
}

export async function modifyCourse(formData: FormData) {
  return await put(`/course/adm`, formData, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  });
}


export async function getCourse({ courseId }: { courseId: number }): Promise<Course> {
  try {
    // return await get<Course>(`${JSON_SERVER}/course/${courseId}`);
    return (await get<FetchResponse<Course>>(`/course/${courseId}`)).data;
  } catch (err: any) {
    return Promise.reject(err);
  }
}

export function useCourse({ courseId }: { courseId: number }): {
  isLoading: boolean;
  isError: any;
  data?: Course
} {
  const { data, error } = useSWR<FetchResponse<Course>>(`/course/${courseId}`, get);
  return {
    data: data?.data,
    isLoading: !data && !error,
    isError: error
  };
}

