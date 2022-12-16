import { AdminCenterLayout } from '@layouts/AdminCenter';
import { CourseTrafficUpload } from '@layouts/AdminCenter/CourseTrafficManagement/CourseTrafficUpload';

export default function CourseTrafficUploadPage() {
  return <CourseTrafficUpload />;
}

CourseTrafficUploadPage.Layout = AdminCenterLayout;
