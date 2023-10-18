import { DELETE, GET, POST, PUT } from "@common/httpClient";
import { useState } from "react"
import { useSnackbar } from "./useSnackbar";

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

export default function useDominModule() {
  const [data, setData] = useState<ModuleResponse | null>(null);
  const [module, setModule] = useState<Module[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const snackBar = useSnackbar();

  const getModuleLinkedCourse = async(courseSeq:number) => {
    setIsLoading(true)
    try {
      const res = await GET('/course-module/adm', {
        params: {
          courseSeq
        }
      });
      const data = res.data;

      setModule(data);

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
      const res = await POST(`/course-module/adm/${courseSeq}`,body
      )

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
      const res = await  PUT(`/course-module/adm/${courseSeq}`,{
        courseModuleSaveRequestDto: body
        
      })
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

      return res;
    } catch (error) {
      snackBar({
        message: '모듈 삭제 실패',
        variant: 'error'
      })
    }
  }

  return { data, module, getModuleLinkedCourse, postModule, putModule, deleteModule, getModuleDetail, isLoading}
}
