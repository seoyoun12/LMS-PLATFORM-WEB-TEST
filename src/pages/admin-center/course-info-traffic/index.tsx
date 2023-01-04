import { AdminCenterLayout } from '@layouts/AdminCenter';
import CourseInfoTrafficManagement from '@layouts/AdminCenter/CourseInfoTrafficManagement/CourseInfoTrafficManagement';

export default function CourseInfoManagementPage() {
  return <CourseInfoTrafficManagement />;
}

CourseInfoManagementPage.Layout = AdminCenterLayout;
