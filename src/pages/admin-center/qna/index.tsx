import { AdminCenterLayout } from '@layouts/AdminCenter';
import { QnaManagement } from '@layouts/AdminCenter/QnaManagement/QnaManagement';

export default function QnaManagementPage() {
  return <QnaManagement />;
}

QnaManagementPage.Layout = AdminCenterLayout;
