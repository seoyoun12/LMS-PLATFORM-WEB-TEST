// 도민 과정 생성 / 삭제 / 수정 / 조회 기능을 묶어놓은 커스텀훅
import { GET, POST } from '@common/httpClient'
import { useState } from 'react';
import { useSnackbar } from './useSnackbar';


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

interface PostRequest {
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

export interface getCourseListResponse {
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



export default function useDominCourse() {
  const [data, setData] = useState<getCourseListResponse | null>(null);
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
      const data:getCourseListResponse = res.data;
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
  const postDominCourse = async (data:PostRequest) => {
    setIsLoading(true);
    try {
      const res = await POST<PostRequest>('/course/adm/provincial',data);
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



  return { postDominCourse,getDominCourseList,data,isLoading }
  
}
