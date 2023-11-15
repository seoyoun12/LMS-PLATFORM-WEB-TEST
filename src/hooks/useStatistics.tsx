import { GET } from "@common/httpClient"
import useSWR, { SWRResponse } from "swr"

interface Props {
  courseClassSeq?: number;
  courseSeq?: number;
  year?: number

}


export interface Fluctuation{
    completedCnt: number,
    inCompletedCnt: number,
    totalCnt: number,
}

export interface AgeRange {
  birthYear10To19: number,
  birthYear20To29: number,
  birthYear30To39: number,
  birthYear40To49: number,
  birthYear50To59: number,
  birthYear60To69: number,
  birthYear70To79: number,
  birthYear80To89: number,
  birthYear90To99: number,
}

export interface AgeRangeByBusiness extends AgeRange{
  userBusinessSubType: string
}

export interface AgeRangeByYearly extends AgeRange{
  year: number
}

export interface FluctuationByCarRegistrationAddress extends Fluctuation{
  userRegistrationTypeEnum: string
}

export interface RegistrationAddress {
  exceptSejongCompletedCntSum: number,
  exceptSejongInCompletedCntSum: number,
  exceptSejongTotalCntSum: number,
  statisticsTransEduCarRegisteredRegionResponseDtoList: FluctuationByCarRegistrationAddress[],
  sumCompletedCntSum: number,
  sumInCompletedCnt: number,
  sumTotalCntSum: 0
}

export interface TotalUserCnt {
  completedCourseUserCnt: number,
  inCompletedCourseUserCnt: number,
  totalCourseUserCnt: number
}

export interface Period {
  step: number,
  studentCnt: number
}

export interface FluctuationInBusiness extends Fluctuation{
  userBusinessSubType: string
}

export interface FluctuationInBusinessResponse {
  statisticsTransEduCategoryResponseDtoList: FluctuationInBusiness[],
  sumCompletedCntSum: number,
  sumInCompletedCnt: number,
  sumTotalCntSum: number
}

export interface FluctuationByBusiness extends Period{
  courseSeq: number,
  step: number,
  studentCnt: number,
  userBusinessSubType: string
}

export interface StatisticsResponse {
  statisticsTransEduCarRegisteredRegionResultResponseDto: RegistrationAddress,
  statisticsTransEduCategoryAgeResponseDto: AgeRangeByBusiness[],
  statisticsTransEduCategoryIncreaseResponseDto: FluctuationByBusiness[],
  statisticsTransEduCategoryResponseDto: FluctuationInBusinessResponse,
  statisticsTransEduIntegratedResponseDto: TotalUserCnt,
  statisticsTransEduStepResponseDto: Period[],
  statisticsTransEduYearAgeResponseDto: AgeRangeByYearly[],
}

interface Courses {
    businessSubType: string,
    categoryType: string,
    courseName: string,
    courseSeq: number,
    courseType: string,
    displayCourseName: string,
    year: number
  }

  interface PeriodInCourse {
    courseClassSeq: number,
    yearAndStep: string
  }


export default function useStatistics({courseClassSeq, courseSeq, year}: Props) {
  
  const {data ,mutate} = useSWR<SWRResponse<StatisticsResponse>>([
    '/adm/statistics/trans-edu/integrated',
    { params: {courseClassSeq, courseSeq, year} }],
     GET
     )
  
  const {data: course, mutate: courseMutate,isValidating:isCourseValidating} =
  useSWR<SWRResponse<Courses[]>>(year ? [ '/course/adm/learning-info/courses',{ params: {year} }] : null, GET,{
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  const {data: period, mutate: periodMutate,isValidating:isStepValidating} = useSWR<SWRResponse<PeriodInCourse[]>>(courseSeq ? `/course/adm/learning-info/step/${courseSeq}` : null, GET,{
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  // 개설된 과정 전체 조회 /course/adm/learning-info/courses?year={year} => year를 주면 courseSeq를 준다
  // 개설된 과정에 대한 기수 전체 조회 /course/adm/leaning-info/step/{courseSeq} => courseSeq를 주면 courseClassSeq를 준다




  return {data, mutate, course, courseMutate, period, periodMutate, isCourseValidating, isStepValidating}
}
