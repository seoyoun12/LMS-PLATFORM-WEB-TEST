import { GET } from '@common/httpClient';
import useSWR, { SWRResponse } from 'swr';
import { StatisticsSurveyResponseDto } from '../Api';

export function useSurveyStatistics(surveySeq: number) {
  const { data, error } = useSWR<SWRResponse<StatisticsSurveyResponseDto>>(
    `/adm/statistics/survey/${surveySeq}`,
    GET,
    { dedupingInterval: 60 * 1000 } //재요청 텀(60초)
  );
  return {
    data: data?.data,
    error,
  };
}

export function detailSurveyStatistics(surveySeq: number) {
  return GET<{ data: StatisticsSurveyResponseDto }>(
    `/adm/statistics/survey/${surveySeq}`
  );
}
