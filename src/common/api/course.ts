import { get, post } from '@common/httpClient';

export interface CourseResponse {
  data: Course;
  message: string;
  status: number;
  success: boolean;
}

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

export async function getCourse({ courseId }: { courseId: number }): Promise<Course> {
  try {
    // return await get<Course>(`${JSON_SERVER}/course/${courseId}`);
    return (await get<CourseResponse>(`/course/${courseId}`)).data;
  } catch (err) {
    return Promise.reject(err);
  }
}
