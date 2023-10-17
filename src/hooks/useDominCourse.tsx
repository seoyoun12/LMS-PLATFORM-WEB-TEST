// 도민 과정 CRUD 기능을 묶어놓은 커스텀훅

import { GET, POST, PUT,DELETE } from '@common/httpClient'
import { useState } from 'react';
import { useSnackbar } from './useSnackbar';
import { ContentResponse } from './useDominContent';


export enum CourseType {
  TYPE_TRANS_WOKER =  'TYPE_TRANS_WOKER',
  TYPE_LOW_FLOOR_BUS = 'TYPE_LOW_FLOOR_BUS',
  TYPE_PROVINCIAL = 'TYPE_PROVINCIAL',
}

export enum MainType {
  TYPE_CHILDREN = 'TYPE_CHILDREN', 
  TYPE_TEENAGER = 'TYPE_TEENAGER',
  TYPE_ELDERLY = 'TYPE_ELDERLY',
  TYPE_SELF_DRIVING = 'TYPE_SELF_DRIVING'
}

export enum SubType {
   TYPE_KINDERGARTEN = 'TYPE_KINDERGARTEN',
   TYPE_ELEMENTARY = 'TYPE_ELEMENTARY',
   TYPE_MIDDLE = 'TYPE_MIDDLE',
   TYPE_HIGH = 'TYPE_HIGH',
   TYPE_SELF_DRIVER = 'TYPE_SELF_DRIVER',
   TYPE_ELDERLY = 'TYPE_ELDERLY',
}

export interface PostRequestBody {
  courseType: CourseType; // 도민, 저상, 운수
  courseName: string; // 과정명
  displayYn: "Y" | "N"; 
  lessonTime: number; 
  provincialEduTargetMain: MainType;
  provincialEduTargetSub: SubType;
  status: number;
}

interface Response {
  courseTitle?: string;
  courseType: CourseType;
  elementCnt?: number; // default 10
  page: number;
}
export interface IContent {
  seq: number,
  code: null | string | number,
  contentType: string,
  contentName: string,
  contentWidth: null,
  contentHeight: null,
  lessonCnt: number,
  questionCnt: number,
  examCnt: number,
  homeworkCnt: number,
  courseSeq: number | null,
  courseName: string | null,
  createdDtime: string,
  modifiedDtime: string,
  status: number
}
export interface Content {
  seq: number;
  courseBusinessType: string | null;
  courseType: CourseType;
  courseCategoryType: string | null;
  courseSubCategoryType: string | null;
  courseName: string;
  lessonTime: number;
  fileName: string | null;
  s3Files: any[]; // TODO: 파일 타입 정의
  provincialUseYn: "Y" | "N";
  displayYn: "Y" | "N";
  contentSeq: number | null;
  contentName: null;
  createdDtime: string;
  modifiedDtime: string;
  provincialEduTargetMain: MainType;
  provincialEduTargetSub: SubType;
  status: number;
}

export interface CourseResponse {
  content: Content[],
  pageable: {
      sort: {
          sorted: boolean,
          unsorted: boolean,
          empty: boolean
      },
      offset: number,
      pageNumber: number,
      pageSize: number,
      paged: boolean,
      unpaged: boolean
  },
  totalElements: number,
  totalPages: number,
  last: boolean,
  number: number,
  sort: {
      sorted: boolean,
      unsorted: boolean,
      empty: boolean
  },
  size: number,
  numberOfElements: number, // 아이템 개수
  first: true,
  empty: boolean
}
interface CreateCourseResponse {
  data: {
    seq: number;
  }
}

export interface LinkCourseWithContent {
  courseSeq: number;
  contentSeq: number;

}


export default function useDominCourse() {
  const [data, setData] = useState<CourseResponse | null>(null);
  const [course, setCourse] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const snackBar = useSnackbar();

  const getDominCourseList = async ({courseType,page,courseTitle,elementCnt}: Response) => {
    setIsLoading(true);
    try {
      const res = await GET('/course/adm',{
        params:{
          courseType,
          courseTitle,
          page,
          elementCnt,
        }
      });
      const data:CourseResponse = res.data;
      setData(data);
      return res;  
    } catch (error) {
      snackBar({
        message: '데이터를 불러오는데 실패했습니다.',
        variant: 'error',
      })
    } finally {
      setIsLoading(false);
    }
  }

  const getDominCourse = async (seq:number) => {
    setIsLoading(true);
    try {
      const res = await GET(`/course/adm/${seq}`);
      const data:Content = res.data;
      setCourse(data);
      return res;
    } catch (error) {
      snackBar({
        message: '데이터를 불러오는데 실패했습니다.',
        variant: 'error',
      })
    }finally{
      setIsLoading(false);
    }
  }

  const postDominCourse = async (data:PostRequestBody) => {
    setIsLoading(true);
    try {
      const res = await POST<CreateCourseResponse>('/course/adm/provincial',data);
      return res.data;
    } catch (error) {
      snackBar({
        message: '과정 생성에 실패하였습니다.',
        variant: 'error',
      })
    }finally{
      setIsLoading(false);
    }
  }

  const putDominCourse = async (data:PostRequestBody,seq:number) => {
    setIsLoading(true);
    try {
      const res = await PUT<Content>(`/course/adm/provincial/${seq}`,data);
      return res;  
    } catch (error) {
      snackBar({
        message: '과정 수정에 실패하였습니다.',
        variant: 'error',
      })
    }finally{
      setIsLoading(false);
    }
  }

  const dislinkCourseWithContent = async (courseSeq:number) => {
    try {

      // 쓰면 안됨
      await DELETE(`/course/adm/link/content/${courseSeq}`);  
      snackBar({
        message: '과정을 해제하였습니다.',
        variant: 'success',
      })
    } catch (error) {
      console.error(error);
      snackBar({
        message: error.data.message,
        variant: 'error',
      })
    }
  }

  const linkCourseWithContent = async ({courseSeq,contentSeq}: LinkCourseWithContent) => {
    try {

      // 쓰면 안됨
      const res:ContentResponse = await POST(`/course/adm/link/content`,{
        courseSeq,
        contentSeq
      });
      
      snackBar({
        message: '과정을 연결하였습니다.',
        variant: 'success',
      })
      return res;  
    } catch (error) {
      console.error(error);
      snackBar({
        message: error.data.message,
        variant: 'error',
      })
    }
  }

  const deleteDominCourse = async (seq:number) => {
    setIsLoading(true);
    try {
      const res = await DELETE(`/course/adm/${seq}`);
      return res;  
    } catch (error) {
      snackBar({
        message: '과정 삭제에 실패하였습니다.',
        variant: 'error',
      })
    }finally{
      setIsLoading(false);
    }
  }

  return { linkCourseWithContent, dislinkCourseWithContent,postDominCourse,putDominCourse,getDominCourseList,getDominCourse,deleteDominCourse,data,isLoading,course }
  
}
