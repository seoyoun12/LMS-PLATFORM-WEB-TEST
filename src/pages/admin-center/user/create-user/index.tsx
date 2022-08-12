import { AdminCenterLayout, UserManagement } from '@layouts/AdminCenter';
import { CreateUser } from '@layouts/AdminCenter/UserManagement/CreateUser';

export default function CreateUserPage() {
  return <CreateUser />;
}

CreateUserPage.Layout = AdminCenterLayout;
