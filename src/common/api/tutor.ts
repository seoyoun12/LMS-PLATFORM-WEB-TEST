import { get, post } from '@common/httpClient';

export type CourseContent = {
  data: CourseResponse;
  message: string
  status: number;
  success: boolean;
}

export type CourseData = {
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

export type CourseResponse = {
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
}

export async function uploadCourseContent({ html, identity }: { html: string, identity: number }) {
  return await post(`/example/html`, {
    html, identity
  });
}

export async function uploadCourse(formData: FormData) {
  return await post(`/course/adm`, formData, {
    headers: {
      'content-type': 'multipart/form-data'
    }
  });
}

export async function getCourseContent({ identity }: { identity: number }): Promise<CourseContent['data']> {
  const res = await get<CourseContent>(`/example/html/${identity}`);
  return res.data;
}
