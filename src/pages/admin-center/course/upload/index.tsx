import { AdminCenterLayout } from '@layouts/AdminCenter';
import { CourseUpload } from '@layouts/AdminCenter/CourseManagement/CourseUpload';

export default function CourseUploadPage() {
  return (
    <CourseUpload />
  );
}

CourseUploadPage.Layout = AdminCenterLayout;
