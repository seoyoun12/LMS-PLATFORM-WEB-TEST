import { GET, POST } from '@common/httpClient';

export function getExcelCourseLearning() {
  return POST(`/adm/excel/download/course-learning-user`, {}, { responseType: 'blob' });
}

export function getExcelSurveyDetail(surveySeq: number) {
  return POST(
    `/adm/excel/download/survey-detail/${surveySeq}`,
    {},
    { responseType: 'blob' }
  );
}
