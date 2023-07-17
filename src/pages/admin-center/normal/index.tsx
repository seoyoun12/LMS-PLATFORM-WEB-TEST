import { AdminCenterLayout } from '@layouts/AdminCenter';
import { NormalTab } from '@layouts/AdminCenter/TabManagement/NormalTab';

export default function NormalAdminPage() {
  return <NormalTab />;
}

NormalAdminPage.Layout = AdminCenterLayout;
