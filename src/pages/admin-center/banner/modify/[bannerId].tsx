import { AdminCenterLayout } from '@layouts/AdminCenter';
import { BannerModify } from '@layouts/AdminCenter/BannerManagement/BannerModify';

export default function BannerModifyPage() {
  return <BannerModify />;
}

BannerModifyPage.Layout = AdminCenterLayout;
