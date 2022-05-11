import { TutorCenterLayout } from '@layouts/TutorCenter';
import { CourseUpload } from '@layouts/TutorCenter/CourseUpload';

export default function CourseUploadPage() {
  return (
    <CourseUpload/>
  );
}

CourseUploadPage.Layout = TutorCenterLayout;
