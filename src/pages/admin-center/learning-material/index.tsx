import { AdminCenterLayout } from '@layouts/AdminCenter';
import { LearningMaterialManagement } from '@layouts/AdminCenter/LearningMaterialManagement/LearningMaterialManagement';

export default function LearningMaterialManagementPage() {
  return <LearningMaterialManagement />;
}

LearningMaterialManagementPage.Layout = AdminCenterLayout;
