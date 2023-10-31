import { AdminCenterLayout } from '@layouts/AdminCenter';
import { CourseInfoTrafficModify } from '@layouts/AdminCenter/CourseInfoTrafficManagement/CourseInfoTrafficModify';

export default function CourseInfoModifyPage() {
  return <CourseInfoTrafficModify />;
}

CourseInfoModifyPage.Layout = AdminCenterLayout;
