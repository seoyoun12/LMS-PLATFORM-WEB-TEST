import { DELETE, GET, POST, PUT } from "@common/httpClient";
import { useState } from "react"
import { useSnackbar } from "./useSnackbar";
import useSWR, { SWRResponse } from "swr";

// COURSE_MODULE_PROGRESS_RATE


export enum ModuleType {
  COURSE_MODULE_PROGRESS_RATE = 'COURSE_MODULE_PROGRESS_RATE',
  COURSE_MODULE_TEST = 'COURSE_MODULE_TEST',
  COURSE_MODULE_SURVEY = 'COURSE_MODULE_SURVEY'
}

export interface Module {
  courseModuleSeq: number,
  courseSeq: number,
  moduleType: ModuleType,
  moduleName: string,
  limitScore: number | null,
  submitYn: "Y" | "N",
  limitProgress: number,
  surveySeq: number| null,
  examSeq: number | null,
  status: number
}

interface ModuleResponse {
  content: Module[],
  totalPages: number,
  totalElements: number,
  last: boolean,
  number: number,
  size: number,
  numberOfElements: number,
  first: boolean,
  empty: boolean
}

interface PutRequest {
  examSeq?: number,
  limitProgress?: number,
  limitScore?: number,
  moduleName?: string,
  moduleType?:ModuleType,
  status?: number,
  submitYn?: "Y" | "N",
  surveySeq?: number
}

export interface PostModuleRequest{
  examSeq: number,
  limitProgress: number,
  limitScore: number,
  moduleName: string,
  moduleType: ModuleType,
  status: number,
  submitYn: "Y" | "N",
  surveySeq: number
}

interface Props {
  courseSeq: number | null;
}

export default function useDominModule({ courseSeq }: Props) {
  
  
  const [isLoading, setIsLoading] = useState(false);
  const { data, mutate } = useSWR<SWRResponse<Module[]>>(courseSeq ? `/course-module/adm?courseSeq=${courseSeq}` : null, GET);

  const snackBar = useSnackbar();

  const getModuleLinkedCourse = async() => {
    setIsLoading(true)
    try {
      await mutate();
    } catch (error) {
      snackBar({
        message: '모듈 불러오기 실패',
        variant: 'error'
      })
    }finally {
      setIsLoading(false)
    }
  }


  // 사용해야하는지 불투명함. . 
  const getModuleDetail = async () => {
    console.log('getModuleDetail');
  }


  const postModule = async(courseSeq:number,body:PostModuleRequest) => {
    try {
      const res = await POST(`/course-module/adm/${courseSeq}`,body);
      await mutate();
      
      return res;
    } catch (error) {
      snackBar({
        message: error.data.message ?? '모듈 생성 실패',
        variant: 'error'
      })
    }
  }
  const putModule = async(courseSeq:number, body:PutRequest) => {
    try {
      const res = await  PUT(`/course-module/adm/${courseSeq}`,{ courseModuleSaveRequestDto: body })
      await mutate();
      return res;
    } catch (error) {
      snackBar({
        message: '모듈 수정 실패',
        variant: 'error'
      })
    }
  }
  const deleteModule = async(moduleSeq:number) => {
    try {
      const res = await DELETE(`/course-module/adm/${moduleSeq}`)
      await mutate();
      return res;
    } catch (error) {
      snackBar({
        message: '모듈 삭제 실패',
        variant: 'error'
      })
    }
  }

  return { data, getModuleLinkedCourse, postModule, putModule, deleteModule, getModuleDetail, isLoading}
}
