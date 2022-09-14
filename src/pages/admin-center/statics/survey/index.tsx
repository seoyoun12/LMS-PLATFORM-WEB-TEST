import { AdminCenterLayout } from '@layouts/AdminCenter';
import { StaticsSurveyList } from '@layouts/AdminCenter/Statics/Survey/StaticsSurveyList';

export default function StaticsSurveyPage() {
  return <StaticsSurveyList />;
}

StaticsSurveyPage.Layout = AdminCenterLayout;
