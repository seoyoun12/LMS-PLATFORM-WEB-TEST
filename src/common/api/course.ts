import { get } from '@common/httpClient';
import { JSON_SERVER } from '@common/constant';

export type Course = {
  createdAt: string;
  updatedAt: string;
  status: number;
  seq: number;
  courseName: string;
  courseSubName: string;
  lessonTerm: number;
  lessonTime: number;
  price: number;
  courseFile: string;
  courseThumblink: string;
  fullScore: number;
  limitTotalScore: number;
  limitPeopleYn: string;
  limitPeople: number;
  restudyYn: string;
  restudyDay: number;
  content1Title: string;
  content1: string;
  saleYn: string;
  displayYn: string;
  curriculum: {
    title: string;
    contents: { title: string }[];
    panel: number;
  }[]
}

export async function getCourse({ courseId }: { courseId: number }): Promise<Course> {
  try {
    return await get<Course>(`${JSON_SERVER}/course/${courseId}`);
    // return await get<Course>(`/api/v1/course/${courseId}`);
  } catch (err) {
    return Promise.reject(err);
  }
}
