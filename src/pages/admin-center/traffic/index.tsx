import { AdminCenterLayout } from '@layouts/AdminCenter';
import { TrafficTab } from '@layouts/AdminCenter/TabManagement/TrafficTab';

export default function TrafficAdminPage() {
  return <TrafficTab />;
}

TrafficAdminPage.Layout = AdminCenterLayout;
