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

export interface FluctuationByBusiness extends Fluctuation{
  userBusinessSubType: string
}

export interface FluctuationByPeriod extends Period {
  courseSeq: number,
  userBusinessSubType: string
}


export interface StatisticsResponse {
  statisticsTransEduCarRegisteredRegionResultResponseDto: RegistrationAddress,
  statisticsTransEduCategoryAgeResponseDto: AgeRangeByBusiness[],
  statisticsTransEduCategoryIncreaseResponseDto: FluctuationByPeriod[],
  statisticsTransEduCategoryResponseDto: {
    statisticsTransEduCategoryResponseDtoList: FluctuationByBusiness[],
    sumCompletedCntSum: number,
    sumInCompletedCnt: number,
    sumTotalCntSum: number
  },
  statisticsTransEduIntegratedResponseDto: TotalUserCnt,
  statisticsTransEduStepResponseDto: Period[],
  statisticsTransEduYearAgeResponseDto: AgeRangeByYearly[],
}


export default function useStatistics({courseClassSeq, courseSeq, year}: Props) {
  const {data ,mutate} = useSWR<SWRResponse<StatisticsResponse>>(['/adm/statistics/trans-edu/integrated',{ params: {courseClassSeq, courseSeq, year} }], GET)



  return {data, mutate}
}
