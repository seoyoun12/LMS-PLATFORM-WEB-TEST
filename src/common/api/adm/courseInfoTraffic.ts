import { DELETE, GET, PUT } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { PaginationResult } from 'types/fetch';
import {
  ProvincialEnrollResponseDto,
  ProvincialEnrollUpdateRequestDto,
} from '../Api';
import { MainType, SubType } from '@hooks/useDominCourse';



interface ApplicantDetailCourse  {
  completeNo: string,
  courseName: string,
  courseSeq: number,
  courseType: string,
  courseUserSeq: number,
  displayCompleteYn: string,
  displayLearningStatus: string,
  displayTotalProgress: string,
  name: string,
  phone: number,
  provincialEduTargetMain: MainType,
  provincialEduTargetSub: SubType,
  residence: string,
  studyDate: string,
  userSeq: number,
  username: string,
  organization: string;
}

export enum CompleteType {
  TYPE_INCOMPLETE = 'TYPE_INCOMPLETE',
  TYPE_COMPLETE = 'TYPE_COMPLETE',
}

export interface CourseInfoTrafficParams {
  elementCnt: number,
  page: number
  completeType?: CompleteType | ''
  courseSeq?: string
  year?: string
  residence?: string;
  provincialEduTargetMain?: MainType | ''
  provincialEduTargetSub?: SubType | ''
  expectedToStartDtime?: string;
  expectedToEndDtime?: string
  nameOrUsername?:string
  organization?: string
  
}

// 전체 학습자 수강현황 조회 앤드포인트 변경
export function useCourseInfoTraffic(params: CourseInfoTrafficParams) {
  const { data, error, mutate } = useSWR<SWRResponse<PaginationResult<ApplicantDetailCourse[]>>>(
    [`/course/adm/learning-info/provincial`, {params}],
    GET,

    );
  return { data: data?.data, error, mutate };
}

export function useCourseInfoTrafficDetail(enrollSeq: number) {
  const { data, error, mutate } = useSWR<
    SWRResponse<ProvincialEnrollResponseDto>
  >(`/provincial/enroll/adm/${enrollSeq}`, GET);
  return {
    data: data?.data,
    error,
    mutate,
  };
}

export function getCourseInfoTrafficDetail(enrollSeq: number) {
  return GET<{ data: ProvincialEnrollResponseDto }>(
    `/provincial/enroll/adm/${enrollSeq}`
  );
}


export function updateCourseInfoTrafficDetail({
  enrollSeq,
  enrollInput,
}: {
  enrollSeq: number;
  enrollInput: ProvincialEnrollUpdateRequestDto;
}) {
  return PUT(`/provincial/enroll/adm/${enrollSeq}`, enrollInput);
}
