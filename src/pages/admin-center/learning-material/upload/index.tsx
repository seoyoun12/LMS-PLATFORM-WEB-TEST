import { AdminCenterLayout } from '@layouts/AdminCenter';
import { LearningMaterialUpload } from '@layouts/AdminCenter/LearningMaterialManagement/LearningMaterialUpload';

export default function LearningMaterialUploadPage() {
  return <LearningMaterialUpload />;
}
LearningMaterialUploadPage.Layout = AdminCenterLayout;
