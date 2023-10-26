// 도민 과정 CRUD 기능을 묶어놓은 커스텀훅

import { GET, POST, PUT,DELETE } from '@common/httpClient'
import { useCallback, useState } from 'react';
import { useSnackbar } from './useSnackbar';
import useDominContent, { ContentResponse } from './useDominContent';


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

export interface CreateCourseRequestBody {

  courseType: CourseType; // 도민, 저상, 운수
  courseName: string; // 과정명
  displayYn: "Y" | "N"; 
  lessonTime: number; 
  provincialEduTargetMain: MainType;
  provincialEduTargetSub: SubType;
  status: number;
  year: number;
}

export interface CourseResponse {
      content: Content
      courseCategoryType: "TYPE_SUP_COMMON"
      courseName : "운수종사자_화물"
      courseSubCategoryType: "INDIVIDUAL_CARGO"
      courseType: "TYPE_TRANS_WORKER"
      createdDtime: "2023-08-02 1:0:25"
      displayYn: "Y"
      lessonTime: 30
      lessons: {
          seq: number,
          contentSeq: number,
          contentType: "CONTENT_MP4",
          lessons: []
          lessonNm: number
          modifiedDtime : "2023-08-02 13:04:33"
          provincialEduTargetMain: null
          provincialEduTargetSub:  null
          provincialUseYn:  "N"
          s3Files: any[]
          status: 1
        }[]
        modifiedDtime : string
        provincialEduTargetMain : null
        provincialEduTargetSub : null
        provincialUseYn : "Y" | "N"
        s3Files : any[]
        seq : 71
        status : 1
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
  contentType: string;
}

export interface CourseListResponse {
  content: Content[],
  totalElements: number,
  totalPages: number,
  last: boolean,
  number: number,
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

export interface CreateApplicationCourseResponseBody {
  age3?: number,
  age4?: number,
  age5?: number,
  courseSeq?: number,
  eduTargetMain?: MainType,
  eduTargetSub?: SubType,
  elderly?: number,
  expectedToStartDtime?: string,
  expiredDtime?: string,
  grade1?: number,
  grade2?: number,
  grade3?: number,
  grade4?: number,
  grade5?: number,
  grade6?: number,
  organization?: string,
  region?: string,
  selfDriver?: number
}

interface CourseApplication {
      contentName: string,
      contentSeq: number,
      courseName: string,
      createdDtime: string,
      displayYn: string,
      modifiedDtime: string,
      provincialEduTargetMain: MainType,
      provincialEduTargetSub: SubType,
      provincialUseYn: "Y" | "N"
      seq: number;
    }
export interface LinkCourseWithContent {
  courseSeq: number;
  contentSeq: number;

}


export default function useDominCourse() {
  const [data, setData] = useState<CourseListResponse | null>(null);
  const [course, setCourse] = useState<CourseResponse | null>(null);
  const [courseApplication, setCourseApplication] = useState<CourseApplication[] | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const { contentsMudate } = useDominContent();
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
      const data:CourseListResponse = res.data;
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
      const data:CourseResponse = res.data;
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

  const postDominCourse = async (data:CreateCourseRequestBody) => {
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

  const putDominCourse = async (data:CreateCourseRequestBody,seq:number) => {
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
      await DELETE(`/course/adm/link/content/${courseSeq}`);  
      await contentsMudate();
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
      const res:ContentResponse = await POST(`/course/adm/link/content`,{
        courseSeq,
        contentSeq
      });
      await contentsMudate();
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
      await contentsMudate();
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

  const getCourseForUser = async (provincialEduTargetSub: SubType) => {
    setIsLoading(true);
    try {
      const res = await GET('/course/provincial',{
        params: {
          provincialEduTargetSub
        }
      });

      const data:CourseApplication[] = res.data;
      setCourseApplication(data)
      return res;
    } catch (error) {
      snackBar({
        message: '신청가능 목록을 불러오는데 실패했습니다.',
        variant: 'error',
      })
    }finally{
      setIsLoading(false);
    }
  }
  
  const postApplicationCourseForUser = useCallback(async (body:CreateApplicationCourseResponseBody) => {
    setIsLoading(true);
    try {
      await POST('/course-user/enroll/provincial',body);
      snackBar({ 
        message: `신청이 완료되었습니다`,
        variant: 'success',
      })
    } catch (error) {
      snackBar({
        message: '신청에 실패했습니다.',
        variant: 'error',
      })
    }finally{
      setIsLoading(false);
    }
    //eslint-disable-next-line
  },[])



  return {
    linkCourseWithContent, 
    dislinkCourseWithContent, 
    postDominCourse, 
    putDominCourse, 
    getDominCourseList, 
    getDominCourse, 
    deleteDominCourse, 
    getCourseForUser,
    postApplicationCourseForUser,
    data, 
    isLoading, 
    course,
    courseApplication
  }
}
