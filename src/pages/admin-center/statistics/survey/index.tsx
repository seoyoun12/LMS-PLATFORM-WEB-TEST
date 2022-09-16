import { AdminCenterLayout } from '@layouts/AdminCenter';
import { StatisticsSurveyList } from '@layouts/AdminCenter/Statistics/Survey/StatisticsSurveyList';

export default function StatisticsSurveyPage() {
  return <StatisticsSurveyList />;
}

StatisticsSurveyPage.Layout = AdminCenterLayout;
