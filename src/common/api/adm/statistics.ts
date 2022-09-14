import { GET } from '@common/httpClient';
import { StatisticsSurveyResponseDto } from '../Api';

export function detailSurveyStatistics(surveySeq: number) {
  return GET<{ data: StatisticsSurveyResponseDto }>(
    `/adm/statistics/survey/${surveySeq}`
  );
}
