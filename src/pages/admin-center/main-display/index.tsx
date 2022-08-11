import { AdminCenterLayout } from '@layouts/AdminCenter';
import { MainDisplayManagement } from '@layouts/AdminCenter/MainDisplayManagement/MainDisplayManagement';

export default function MainDisplayPage() {
  return <MainDisplayManagement />;
}

MainDisplayPage.Layout = AdminCenterLayout;
