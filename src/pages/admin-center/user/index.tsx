import { AdminCenterLayout, UserList } from '@layouts/AdminCenter';

export default function UserPage() {
  return (
    <UserList />
  );
}

UserPage.Layout = AdminCenterLayout;
