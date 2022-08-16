import { AdminCenterLayout } from '@layouts/AdminCenter';
import { LearningMaterialModify } from '@layouts/AdminCenter/LearningMaterialManagement/LearningMaterialModify';

export default function LearningMaterialModifyPage() {
  return <LearningMaterialModify />;
}
LearningMaterialModifyPage.Layout = AdminCenterLayout;
