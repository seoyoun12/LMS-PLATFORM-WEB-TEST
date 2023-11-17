import { GET } from "@common/httpClient"
import useSWR, { SWRResponse } from "swr"

export interface Fluctuation{
    completedCnt: number,
    inCompletedCnt: number,
    totalCnt: number,
}

export interface AgeRange {
  age20s: number,
  age30s: number,
  age40s: number,
  age50s: number,
  age60s: number,
  age70s: number,
  age80s: number,
  age90s: number,
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


  interface Props {
    courseClassSeq: number |null;
    courseSeq: number | null;
    year: number | null;
  }

export default function useStatistics(props: Props) {
  
  const {data ,mutate} = useSWR<SWRResponse<StatisticsResponse>>(props?.year ? [
    '/adm/statistics/trans-edu/integrated',
    { params: {courseClassSeq: props?.courseClassSeq, courseSeq: props.courseSeq, year: props.year} }] : null,
     GET
     )
  
  // 해당년도에 해당하는 course list를 가져오는 함수
  const {data: course, mutate: courseMutate,isValidating:isCourseValidating} =
  useSWR<SWRResponse<Courses[]>>(props?.year ? [ '/course/adm/learning-info/courses',{ params: {year:props.year} }] : null, GET,{
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  // 해당 courseSeq에 해당하는 period list를 가져오는 함수
  const {data: period, mutate: periodMutate,isValidating:isStepValidating} = useSWR<SWRResponse<PeriodInCourse[]>>(props?.courseSeq ? `/course/adm/learning-info/step/${props.courseSeq}` : null, GET,{
    revalidateOnMount: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  // 개설된 과정 전체 조회 /course/adm/learning-info/courses?year={year} => year를 주면 courseSeq를 준다
  // 개설된 과정에 대한 기수 전체 조회 /course/adm/leaning-info/step/{courseSeq} => courseSeq를 주면 courseClassSeq를 준다




  return {data, mutate, course, courseMutate, period, periodMutate, isCourseValidating, isStepValidating}
}
